import { Server } from 'socket.io';
import * as store from './data/store.js';
import db from './config/db.mjs';

const rooms = new Map(); // roomCode -> roomData

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Create Room (Admin only)
    socket.on('create_room', ({ adminUser, quizId }) => {
      // Generate unique 4-letter room code
      let roomCode = '';
      do {
        roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      } while (rooms.has(roomCode));

      const roomData = {
        code: roomCode,
        quizId: parseInt(quizId, 10),
        adminSocketId: socket.id,
        adminName: adminUser.fullName || adminUser.username || 'Admin',
        status: 'waiting', // waiting, active, finished
        players: [], // list of { socketId, id, username, fullName, score, currentQuestion, finished }
        createdAt: new Date()
      };

      rooms.set(roomCode, roomData);
      socket.join(roomCode);

      socket.emit('room_created', roomData);
      console.log(`Room created: ${roomCode} for quiz ID ${quizId} by Admin`);
    });

    // Join Room (Murid/User)
    socket.on('join_room', ({ roomCode, user }) => {
      const code = String(roomCode).trim().toUpperCase();
      const room = rooms.get(code);

      if (!room) {
        return socket.emit('join_error', 'Room tidak ditemukan.');
      }
      if (room.status !== 'waiting') {
        return socket.emit('join_error', 'Kuis di room ini sudah dimulai atau telah selesai.');
      }

      // Check if user is already in the room
      const existingIdx = room.players.findIndex(p => p.username === user.username);
      const playerInfo = {
        socketId: socket.id,
        id: user.id,
        username: user.username,
        fullName: user.fullName || user.username,
        score: 0,
        currentQuestion: 0,
        finished: false
      };

      if (existingIdx !== -1) {
        room.players[existingIdx] = playerInfo;
      } else {
        room.players.push(playerInfo);
      }

      socket.join(code);
      socket.emit('room_joined', room);
      io.to(code).emit('player_list_updated', room.players);
      console.log(`User ${user.username} joined room ${code}`);
    });

    // Start Quiz (Admin only)
    socket.on('start_quiz', async ({ roomCode }) => {
      const code = String(roomCode).trim().toUpperCase();
      const room = rooms.get(code);

      if (!room) return;
      if (room.adminSocketId !== socket.id) {
        return socket.emit('error_message', 'Hanya admin pembuat room yang dapat memulai kuis.');
      }

      try {
        // Fetch quiz details from store
        const quiz = await store.getQuizById(room.quizId);
        if (!quiz) {
          return socket.emit('error_message', 'Materi kuis tidak ditemukan.');
        }

        room.status = 'active';
        room.quizTitle = quiz.title;
        room.totalQuestions = quiz.totalQuestions || quiz.questions.length;

        // Broadcast quiz start to all players in the room
        io.to(code).emit('quiz_started', {
          quizTitle: quiz.title,
          questions: quiz.questions,
          totalQuestions: room.totalQuestions
        });
        console.log(`Quiz started in room ${code}: ${quiz.title}`);
      } catch (err) {
        console.error('Failed to start quiz:', err);
        socket.emit('error_message', 'Gagal memulai kuis.');
      }
    });

    // Submit Progress (Murid)
    socket.on('submit_progress', ({ roomCode, currentQuestion, score, username }) => {
      const code = String(roomCode).trim().toUpperCase();
      const room = rooms.get(code);
      if (!room) return;

      const player = room.players.find(p => p.socketId === socket.id || p.username === username);
      if (player) {
        player.currentQuestion = currentQuestion;
        player.score = score;
        io.to(code).emit('progress_updated', room.players);
      }
    });

    // Player Finished (Murid)
    socket.on('player_finished', async ({ roomCode, username, score, totalQuestions, percentage, passed }) => {
      const code = String(roomCode).trim().toUpperCase();
      const room = rooms.get(code);
      if (!room) return;

      const player = room.players.find(p => p.socketId === socket.id || p.username === username);
      if (player) {
        player.finished = true;
        player.score = score;
        player.percentage = percentage;
        player.passed = passed;

        // Log this activity in backend
        try {
          await store.logActivity(
            player.id,
            player.username,
            'SUBMIT_QUIZ',
            `Menyelesaikan Live Quiz "${room.quizTitle}" (Skor: ${score}/${totalQuestions}, Lulus: ${passed})`
          );
          
          if (passed) {
            await store.addCertificate({
              userId: player.id,
              quizId: room.quizId,
              quizTitle: room.quizTitle,
              score: score,
              totalQuestions: totalQuestions,
              percentage: percentage
            });
          }
          
          // Add points to user database
          const pointsEarned = score * 10;
          await store.upsertLeaderboardEntry({
            id: player.id,
            username: player.username,
            fullName: player.fullName,
            pointsEarned,
            newStreak: 1 // default streak increment for live quizzes
          });
        } catch (e) {
          console.error('Failed to save live quiz results to database:', e);
        }

        io.to(code).emit('progress_updated', room.players);

        // Check if all players in the room are finished
        const allFinished = room.players.every(p => p.finished);
        if (allFinished) {
          room.status = 'finished';
          io.to(code).emit('quiz_finished', room.players);
          console.log(`All players finished in room ${code}`);
        }
      }
    });

    // Leave Room
    socket.on('leave_room', ({ roomCode }) => {
      const code = String(roomCode).trim().toUpperCase();
      socket.leave(code);
      handleLeave(socket, code);
    });

    socket.on('disconnect', () => {
      // Find which room the user was in and remove them
      for (const [code, room] of rooms.entries()) {
        if (room.adminSocketId === socket.id) {
          // If admin disconnects, notify players and delete room
          io.to(code).emit('admin_disconnected', 'Host Admin telah terputus.');
          rooms.delete(code);
          console.log(`Admin disconnected. Room ${code} deleted.`);
        } else {
          const idx = room.players.findIndex(p => p.socketId === socket.id);
          if (idx !== -1) {
            room.players.splice(idx, 1);
            io.to(code).emit('player_list_updated', room.players);
            console.log(`Player left room ${code}. Remaining players: ${room.players.length}`);
          }
        }
      }
    });
  });
};

const handleLeave = (socket, code) => {
  const room = rooms.get(code);
  if (!room) return;

  if (room.adminSocketId === socket.id) {
    io.to(code).emit('admin_disconnected', 'Host Admin telah meninggalkan room.');
    rooms.delete(code);
    console.log(`Admin left. Room ${code} deleted.`);
  } else {
    const idx = room.players.findIndex(p => p.socketId === socket.id);
    if (idx !== -1) {
      room.players.splice(idx, 1);
      io.to(code).emit('player_list_updated', room.players);
    }
  }
};
