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
      try {
        if (!adminUser) {
          return socket.emit('error_message', 'Data admin tidak valid.');
        }

        let roomCode = '';
        let attempts = 0;
        do {
          roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
          attempts++;
        } while (rooms.has(roomCode) && attempts < 100);

        const roomData = {
          code: roomCode,
          quizId: parseInt(quizId, 10) || 1,
          adminSocketId: socket.id,
          adminName: adminUser?.fullName || adminUser?.username || 'Admin',
          status: 'waiting', // waiting, active, finished
          players: [],
          createdAt: new Date()
        };

        rooms.set(roomCode, roomData);
        socket.join(roomCode);

        socket.emit('room_created', roomData);
        console.log(`Room created: ${roomCode} for quiz ID ${quizId} by Admin`);
      } catch (err) {
        console.error('Error creating room:', err);
        socket.emit('error_message', 'Gagal membuat room.');
      }
    });

    // Join Room (Murid/User)
    socket.on('join_room', ({ roomCode, user }) => {
      try {
        if (!user || !user.username) {
          return socket.emit('join_error', 'Pengguna harus login terlebih dahulu.');
        }

        const code = String(roomCode || '').trim().toUpperCase();
        if (!code) {
          return socket.emit('join_error', 'Kode room tidak valid.');
        }

        const room = rooms.get(code);
        if (!room) {
          return socket.emit('join_error', 'Room tidak ditemukan.');
        }
        if (room.status !== 'waiting') {
          return socket.emit('join_error', 'Kuis di room ini sudah dimulai atau telah selesai.');
        }

        const existingIdx = room.players.findIndex(p => p.username === user.username);
        const playerInfo = {
          socketId: socket.id,
          id: user.id || (existingIdx !== -1 ? room.players[existingIdx].id : 0),
          username: user.username,
          fullName: user.fullName || user.username || 'Murid',
          score: existingIdx !== -1 ? room.players[existingIdx].score : 0,
          currentQuestion: existingIdx !== -1 ? room.players[existingIdx].currentQuestion : 0,
          finished: existingIdx !== -1 ? room.players[existingIdx].finished : false,
          percentage: existingIdx !== -1 ? room.players[existingIdx].percentage : 0,
          passed: existingIdx !== -1 ? room.players[existingIdx].passed : false,
          connected: true
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
      } catch (err) {
        console.error('Error joining room:', err);
        socket.emit('join_error', 'Terjadi kesalahan saat bergabung.');
      }
    });

    // Start Quiz (Admin only)
    socket.on('start_quiz', async ({ roomCode }) => {
      try {
        const code = String(roomCode || '').trim().toUpperCase();
        const room = rooms.get(code);

        if (!room) return;
        if (room.adminSocketId !== socket.id) {
          return socket.emit('error_message', 'Hanya admin pembuat room yang dapat memulai kuis.');
        }

        const quiz = await store.getQuizById(room.quizId);
        if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
          return socket.emit('error_message', 'Materi kuis atau soal tidak ditemukan.');
        }

        room.status = 'active';
        room.quizTitle = quiz.title || 'Live Quiz';
        room.totalQuestions = quiz.totalQuestions || quiz.questions.length;

        io.to(code).emit('quiz_started', {
          quizTitle: room.quizTitle,
          questions: quiz.questions,
          totalQuestions: room.totalQuestions
        });
        console.log(`Quiz started in room ${code}: ${room.quizTitle}`);
      } catch (err) {
        console.error('Failed to start quiz:', err);
        socket.emit('error_message', 'Gagal memulai kuis.');
      }
    });

    // Submit Progress (Murid)
    socket.on('submit_progress', ({ roomCode, currentQuestion, score, username }) => {
      try {
        const code = String(roomCode || '').trim().toUpperCase();
        const room = rooms.get(code);
        if (!room) return;

        const player = room.players.find(p => p.socketId === socket.id || p.username === username);
        if (player) {
          player.currentQuestion = Number(currentQuestion) || 0;
          player.score = Number(score) || 0;
          io.to(code).emit('progress_updated', room.players);
        }
      } catch (err) {
        console.error('Error submitting progress:', err);
      }
    });

    // Player Finished (Murid)
    socket.on('player_finished', async ({ roomCode, username, score, totalQuestions, percentage, passed }) => {
      try {
        const code = String(roomCode || '').trim().toUpperCase();
        const room = rooms.get(code);
        if (!room) return;

        const player = room.players.find(p => p.socketId === socket.id || p.username === username);
        if (player) {
          player.finished = true;
          player.score = Number(score) || 0;
          player.percentage = Number(percentage) || 0;
          player.passed = Boolean(passed);

          try {
            await store.logActivity(
              player.id,
              player.username,
              'SUBMIT_QUIZ',
              `Menyelesaikan Live Quiz "${room.quizTitle}" (Skor: ${player.score}/${totalQuestions || 1}, Lulus: ${player.passed})`
            );

            if (player.passed && player.id) {
              await store.addCertificate({
                userId: player.id,
                quizId: room.quizId,
                quizTitle: room.quizTitle,
                score: player.score,
                totalQuestions: totalQuestions || 1,
                percentage: player.percentage
              });
            }

            if (player.id) {
              const pointsEarned = player.score * 10;
              await store.upsertLeaderboardEntry({
                id: player.id,
                username: player.username,
                fullName: player.fullName,
                pointsEarned,
                newStreak: 1
              });
            }
          } catch (e) {
            console.error('Failed to save live quiz results to database:', e);
          }

          io.to(code).emit('progress_updated', room.players);

          const allFinished = room.players.length > 0 && room.players.every(p => p.finished || !p.connected);
          if (allFinished) {
            room.status = 'finished';
            io.to(code).emit('quiz_finished', room.players);
            console.log(`All players finished in room ${code}`);
          }
        }
      } catch (err) {
        console.error('Error handling player_finished:', err);
      }
    });

    // Leave Room
    socket.on('leave_room', ({ roomCode }) => {
      try {
        const code = String(roomCode || '').trim().toUpperCase();
        socket.leave(code);
        handleLeave(io, socket, code);
      } catch (err) {
        console.error('Error leaving room:', err);
      }
    });

    socket.on('disconnect', () => {
      try {
        for (const [code, room] of rooms.entries()) {
          if (room.adminSocketId === socket.id) {
            io.to(code).emit('admin_disconnected', 'Host Admin telah terputus.');
            rooms.delete(code);
            console.log(`Admin disconnected. Room ${code} deleted.`);
          } else {
            const player = room.players.find(p => p.socketId === socket.id);
            if (player) {
              player.connected = false;
              io.to(code).emit('player_list_updated', room.players);
              io.to(code).emit('progress_updated', room.players);
              console.log(`Player ${player.username} disconnected from room ${code}. Total retained players: ${room.players.length}`);
            }
          }
        }
      } catch (err) {
        console.error('Error on disconnect:', err);
      }
    });
  });
};

const handleLeave = (io, socket, code) => {
  const room = rooms.get(code);
  if (!room) return;

  if (room.adminSocketId === socket.id) {
    io.to(code).emit('admin_disconnected', 'Host Admin telah meninggalkan room.');
    rooms.delete(code);
    console.log(`Admin left. Room ${code} deleted.`);
  } else {
    const player = room.players.find(p => p.socketId === socket.id);
    if (player) {
      player.connected = false;
      io.to(code).emit('player_list_updated', room.players);
      io.to(code).emit('progress_updated', room.players);
    }
  }
};
