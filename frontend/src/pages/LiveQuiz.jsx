import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import {
  Users,
  Play,
  Copy,
  Check,
  Award,
  Download,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  User,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname.includes('localhost') ? 'http://localhost:5000/api' : '/api');
const SOCKET_URL = (import.meta.env.VITE_API_URL || (window.location.hostname.includes('localhost') ? 'http://localhost:5000/api' : '/api')).replace('/api', '');

const LiveQuiz = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useAuth();
  const socketRef = useRef(null);

  // States
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [roomData, setRoomData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('setup'); // setup, lobby, playing, finished
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Murid Gameplay States
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.isAdmin || false;

  // 1. Fetch available quizzes on mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`${API_BASE}/quiz`);
        if (res.ok) {
          const data = await res.json();
          setQuizzes(data.quizzes || []);
          if (data.quizzes?.length > 0) {
            setSelectedQuizId(data.quizzes[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load quizzes:', err);
      }
    };
    fetchQuizzes();
  }, []);

  // 2. Manage Socket.io connection
  useEffect(() => {
    if (!isAuthenticated) return;

    socketRef.current = io(SOCKET_URL);

    // Socket Events
    socketRef.current.on('room_created', (data) => {
      setRoomCode(data.code);
      setRoomData(data);
      setPlayers([]);
      setGameState('lobby');
      setErrorMsg('');
    });

    socketRef.current.on('room_joined', (data) => {
      setRoomCode(data.code);
      setRoomData(data);
      setPlayers(data.players || []);
      setGameState('lobby');
      setErrorMsg('');
    });

    socketRef.current.on('player_list_updated', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socketRef.current.on('join_error', (msg) => {
      setErrorMsg(msg);
    });

    socketRef.current.on('error_message', (msg) => {
      setErrorMsg(msg);
    });

    socketRef.current.on('quiz_started', ({ quizTitle, questions: quizQs }) => {
      setQuestions(quizQs);
      setCurrentIdx(0);
      setScore(0);
      setSelectedAnswer(null);
      setAnsweredCount(0);
      setQuizDone(false);
      setGameState('playing');
    });

    socketRef.current.on('progress_updated', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socketRef.current.on('quiz_finished', (finalPlayers) => {
      setPlayers(finalPlayers);
      setGameState('finished');
    });

    socketRef.current.on('admin_disconnected', (msg) => {
      setErrorMsg(msg || 'Host Admin terputus.');
      setTimeout(() => {
        resetToSetup();
      }, 3000);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [isAuthenticated]);

  const resetToSetup = () => {
    setRoomCode('');
    setRoomData(null);
    setPlayers([]);
    setGameState('setup');
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizDone(false);
    setErrorMsg('');
  };

  // Actions
  const handleCreateRoom = () => {
    if (!selectedQuizId) return;
    socketRef.current.emit('create_room', {
      adminUser: user,
      quizId: selectedQuizId
    });
  };

  const handleJoinRoom = () => {
    if (!joinCode.trim()) return;
    socketRef.current.emit('join_room', {
      roomCode: joinCode,
      user: user
    });
  };

  const handleStartQuiz = () => {
    if (!roomCode) return;
    socketRef.current.emit('start_quiz', { roomCode });
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Murid Gameplay Handling
  const handleAnswerOption = (optionIdx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);

    const isCorrect = optionIdx === questions[currentIdx].correct;
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    // Submit progress immediately
    socketRef.current.emit('submit_progress', {
      roomCode,
      currentQuestion: currentIdx + 1,
      score: newScore,
      username: user.username
    });
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Quiz finished for this player
      setQuizDone(true);
      const percentage = Math.round((score / questions.length) * 100);
      const passed = percentage >= 60;

      socketRef.current.emit('player_finished', {
        roomCode,
        username: user.username,
        score,
        totalQuestions: questions.length,
        percentage,
        passed
      });
    }
  };

  // Excel (CSV) Recap Exporter
  const handleExportCSV = () => {
    if (players.length === 0) return;

    // Build headers
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Peringkat,Nama Lengkap,Username,Jawaban Benar,Total Soal,Skor (Poin),Lulus\n';

    // Sort players by score descending
    const sorted = [...players].sort((a, b) => b.score - a.score);

    sorted.forEach((p, idx) => {
      const percentage = Math.round((p.score / (roomData?.totalQuestions || questions.length || 10)) * 100);
      const passed = percentage >= 60 ? 'LULUS' : 'GAGAL';
      const points = p.score * 10;
      csvContent += `${idx + 1},"${p.fullName}","${p.username}",${p.score},${roomData?.totalQuestions || questions.length || 10},${points},${passed}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_LiveQuiz_${roomCode}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center relative overflow-hidden">

      {/* Soft background mesh for light theme (and premium glow for dark theme) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Soft pink glow */}
        <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-pink-400/5 dark:bg-pink-500/10 blur-[100px] opacity-70" />
        {/* Soft blue glow */}
        <div className="absolute top-[35%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] opacity-75" />
        {/* Soft yellow glow */}
        <div className="absolute bottom-[10%] left-[25%] w-[300px] h-[300px] rounded-full bg-yellow-300/5 dark:bg-yellow-500/10 blur-[90px] opacity-60" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 z-10">

        {/* Error Alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center gap-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 text-sm font-semibold text-rose-500 dark:text-rose-400"
            >
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State: SETUP */}
        {gameState === 'setup' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Card: Join Room (For students) */}
            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-xl dark:border-white/5 dark:bg-zinc-950/40 text-center flex flex-col justify-between">
              <div>
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20">
                  <Users size={28} />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Gabung Kelas Live</h2>
                <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-2">
                  Masukkan kode room yang diberikan oleh Admin / Instruktur Anda untuk mengikuti kuis bersama teman sekelas.
                </p>
                <div className="mt-8">
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: ABCD"
                    className="w-full text-center tracking-widest text-2xl font-black rounded-2xl border border-zinc-250 bg-white px-4 py-4 text-zinc-900 outline-none transition-all focus:border-pink-400 focus:ring-4 focus:ring-pink-500/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:focus:border-pink-500"
                  />
                </div>
              </div>
              <button
                onClick={handleJoinRoom}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 py-4 text-sm font-bold text-white shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all active:scale-[0.98]"
              >
                <span>Masuk Room</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Card: Create Room (For admin only) */}
            <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-xl dark:border-white/5 dark:bg-zinc-950/40 text-center flex flex-col justify-between">
              <div>
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20">
                  <Play size={28} />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Buat Sesi Baru</h2>
                <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-2">
                  {isAdmin
                    ? 'Pilih topik kuis yang ingin diujikan secara langsung ke seluruh murid di kelas.'
                    : 'Hanya instruktur / administrator yang dapat membuat sesi baru dan mengunduh rekapan nilai.'}
                </p>

                {isAdmin && (
                  <div className="mt-8 text-left">
                    <label className="mb-2 block text-xs font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Topik Kuis</label>
                    <select
                      value={selectedQuizId}
                      onChange={(e) => setSelectedQuizId(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-250 bg-white px-4 py-3.5 text-sm font-semibold text-zinc-800 outline-none transition-all focus:border-emerald-500 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                    >
                      {quizzes.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.title} ({q.difficulty})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {isAdmin ? (
                <button
                  onClick={handleCreateRoom}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-sm font-bold text-zinc-950 shadow-lg hover:from-emerald-450 hover:to-teal-550 transition-all active:scale-[0.98]"
                >
                  <span>Buat Room Kuis</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <div className="mt-8 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-2xl p-4 text-xs font-bold text-zinc-400 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/10">
                  AKUN REGULER TIDAK BISA MEMBUAT SESI
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* State: LOBBY */}
        {gameState === 'lobby' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-2xl dark:border-white/5 dark:bg-zinc-950/40"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/5">
              <div className="text-left">
                <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">KODE KELAS</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <h1 className="text-4xl font-black tracking-widest text-zinc-900 dark:text-white">{roomCode}</h1>
                  <button
                    onClick={copyRoomCode}
                    className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-zinc-900 text-zinc-500 transition-all"
                  >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  Lobby Menunggu
                </span>
                <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mt-2">
                  Kuis: <span className="text-zinc-900 dark:text-white">{roomData?.quizTitle || 'Memuat...'}</span>
                </p>
              </div>
            </div>

            {/* Players Area */}
            <div className="my-8">
              <div className="flex items-center gap-2 mb-4">
                <Users size={18} className="text-zinc-500" />
                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                  Peserta Terhubung ({players.length})
                </h3>
              </div>

              {players.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-2xl text-center">
                  <Users className="mx-auto text-zinc-350 dark:text-zinc-700 mb-2" size={32} />
                  <p className="text-xs font-bold text-zinc-450 dark:text-zinc-500">Menunggu murid bergabung dengan kode di atas...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {players.map((p, idx) => (
                    <motion.div
                      key={p.socketId || idx}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/30 text-center hover:border-pink-500/30 transition-colors"
                    >
                      <div className="mx-auto mb-2.5 grid size-10 place-items-center rounded-xl overflow-hidden shadow border border-zinc-100 dark:border-white/5 bg-zinc-100">
                        <img src="/assets/admin.png" alt="Avatar" className="size-10 object-cover" />
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{p.fullName}</p>
                      <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 truncate">@{p.username}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Panel */}
            <div className="flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-zinc-200 dark:border-white/5">
              <button
                onClick={resetToSetup}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-5 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <ArrowLeft size={16} /> Kembali
              </button>

              {isAdmin ? (
                <button
                  onClick={handleStartQuiz}
                  disabled={players.length === 0}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 text-sm font-bold text-zinc-950 shadow-lg hover:from-emerald-450 hover:to-teal-550 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Play size={15} /> Mulai Sesi Kuis
                </button>
              ) : (
                <span className="text-xs font-bold text-zinc-450 dark:text-zinc-500 animate-pulse">
                  Menunggu Admin memulai kuis...
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* State: PLAYING */}
        {gameState === 'playing' && (
          <div>
            {/* ADMIN MONITORING VIEW */}
            {isAdmin ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-2xl dark:border-white/5 dark:bg-zinc-950/40"
              >
                <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-4">
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SEDANG BERJALAN</p>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-1">Live Monitor Dashboard</h2>
                  </div>
                  <span className="text-xs font-bold text-zinc-400">Room: {roomCode}</span>
                </div>

                <div className="space-y-4">
                  {players.map((p, idx) => {
                    const totalQs = roomData?.totalQuestions || questions.length || 10;
                    const percent = Math.min(Math.round((p.currentQuestion / totalQs) * 100), 100);
                    return (
                      <div
                        key={p.socketId || idx}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-zinc-900/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-[200px] text-left">
                          <div className="relative grid size-9 place-items-center rounded-xl overflow-hidden shadow border border-zinc-100 dark:border-white/5 bg-zinc-150">
                            <img src="/assets/admin.png" alt="Avatar" className="size-9 object-cover" />
                            {p.finished && (
                              <div className="absolute -bottom-1 -right-1 grid size-4.5 place-items-center rounded-full bg-emerald-500 text-white border border-white dark:border-zinc-950 shadow-sm">
                                <CheckCircle2 size={10} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white">{p.fullName}</p>
                            <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">@{p.username}</p>
                          </div>
                        </div>

                        {/* Progress slider */}
                        <div className="flex-1">
                          <div className="flex justify-between text-2xs font-bold text-zinc-400 dark:text-zinc-500 mb-1">
                            <span>Progres: {p.currentQuestion} / {totalQs} Soal</span>
                            <span>{percent}% selesai</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-900">
                            <motion.div
                              animate={{ width: `${percent}%` }}
                              className={`h-full rounded-full ${p.finished ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}
                            />
                          </div>
                        </div>

                        {/* Points Indicator */}
                        <div className="text-right flex items-center justify-between md:justify-end gap-6 min-w-[120px]">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${p.finished ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                            {p.finished ? 'SELESAI' : 'MENGERJAKAN'}
                          </span>
                          <div>
                            <p className="text-lg font-black text-zinc-900 dark:text-white">{p.score * 10}</p>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase">POIN</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* STUDENT GAMEPLAY VIEW */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Scoreboard Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur dark:border-white/5 dark:bg-zinc-950/40">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={16} className="text-pink-500" />
                      <h3 className="text-xs font-black uppercase text-zinc-950 dark:text-white">Posisi Live</h3>
                    </div>
                    <div className="space-y-2">
                      {[...players]
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 5)
                        .map((p, idx) => (
                          <div
                            key={p.socketId || idx}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left border ${p.username === user.username
                              ? 'bg-pink-500/10 border-pink-500/20 text-pink-500'
                              : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-transparent'
                              }`}
                          >
                            <span className="text-2xs font-black">{idx + 1}</span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold text-zinc-900 dark:text-white">{p.fullName}</p>
                              <p className="text-[9px] font-semibold text-zinc-400">{p.score * 10} pts</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right: Active Question Panel */}
                <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    {!quizDone ? (
                      <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-2xl dark:border-white/5 dark:bg-zinc-950/40"
                      >
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/5 mb-6">
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase">
                            PERTANYAAN {currentIdx + 1} DARI {questions.length}
                          </span>
                          <span className="text-xs font-bold text-pink-500">Skor: {score * 10} Pts</span>
                        </div>

                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white text-left leading-relaxed">
                          {questions[currentIdx].question}
                        </h2>

                        <div className="mt-8 space-y-3">
                          {questions[currentIdx].options.map((option, idx) => {
                            let style = 'border-zinc-200 dark:border-white/10 hover:border-pink-500/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30';
                            if (selectedAnswer !== null) {
                              const isCorrect = idx === questions[currentIdx].correct;
                              const isSelected = idx === selectedAnswer;

                              if (isCorrect) {
                                style = 'border-emerald-500 bg-emerald-500/10 text-emerald-500';
                              } else if (isSelected) {
                                style = 'border-rose-500 bg-rose-500/10 text-rose-500';
                              } else {
                                style = 'opacity-40 border-zinc-100 dark:border-white/5';
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleAnswerOption(idx)}
                                disabled={selectedAnswer !== null}
                                className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${style}`}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-2xs font-bold text-zinc-450 dark:text-zinc-400">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span className="flex-1 leading-normal text-zinc-800 dark:text-zinc-200">{option}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {selectedAnswer !== null && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNextQuestion}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 dark:bg-white py-3.5 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200"
                          >
                            <span>{currentIdx < questions.length - 1 ? 'Selanjutnya' : 'Selesaikan Kuis'}</span>
                            <ArrowRight size={16} />
                          </motion.button>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-2xl dark:border-white/5 dark:bg-zinc-950/40 text-center"
                      >
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Anda Selesai!</h2>
                        <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-2">
                          Skor akhir Anda adalah <span className="font-bold text-emerald-500">{score * 10} Poin</span>.
                        </p>
                        <p className="text-xs text-zinc-400 mt-6 animate-pulse">
                          Menunggu seluruh peserta kuis menyelesaikan jawaban...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}

        {/* State: FINISHED */}
        {gameState === 'finished' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur shadow-2xl dark:border-white/5 dark:bg-zinc-950/40 text-center"
          >
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-amber-950 shadow-lg shadow-amber-500/20">
              <Award size={36} />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Sesi Kuis Selesai!</h1>
            <p className="text-sm text-zinc-500 mt-1">Berikut adalah papan peringkat final untuk sesi kuis di room {roomCode}.</p>

            {/* Podium/List Leaderboard */}
            <div className="my-8 max-w-xl mx-auto space-y-3">
              {[...players]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => {
                  const isUser = p.username === user?.username;
                  const isTop = idx < 3;
                  let bgClass = 'bg-zinc-50/50 dark:bg-zinc-900/30 border-transparent';
                  if (isUser) {
                    bgClass = 'bg-pink-500/10 border-pink-500/20 text-pink-500';
                  } else if (idx === 0) {
                    bgClass = 'bg-amber-500/5 border-amber-500/10';
                  }

                  return (
                    <div
                      key={p.socketId || idx}
                      className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${bgClass} text-left shadow-sm`}
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-black ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-950 shadow'
                          : idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-950 shadow'
                            : idx === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-orange-950 shadow'
                              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800'
                          }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="grid size-9 shrink-0 place-items-center rounded-xl overflow-hidden shadow border border-zinc-100 dark:border-white/5 bg-zinc-150">
                        <img src="/assets/admin.png" alt="Avatar" className="size-9 object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{p.fullName}</p>
                        <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">@{p.username}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-zinc-900 dark:text-white">{p.score * 10}</p>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase">POIN</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Admin Buttons / User Button */}
            <div className="flex flex-wrap gap-4 items-center justify-center pt-6 border-t border-zinc-200 dark:border-white/5">
              <button
                onClick={resetToSetup}
                className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-6 py-3 text-sm font-bold text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                Kembali ke Menu Utama
              </button>

              {isAdmin && (
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg hover:from-emerald-450 hover:to-teal-550 transition-all active:scale-[0.98]"
                >
                  <Download size={15} /> Unduh Rekap Excel (CSV)
                </button>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default LiveQuiz;
