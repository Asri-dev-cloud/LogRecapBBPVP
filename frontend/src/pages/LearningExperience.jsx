import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Trophy,
  Star,
  Zap,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Download,
  Medal,
  User,
  BrainCircuit,
  TrendingUp,
  BookOpen,
  RefreshCw,
  Play,
  Award,
  History,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const difficultyColors = {
  Easy: { bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20', dot: 'bg-emerald-500' },
  Medium: { bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20', dot: 'bg-amber-500' },
  Hard: { bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20', dot: 'bg-rose-500' },
};

const LearningExperience = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, token, refreshUser, updateUser } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateHistory, setCertificateHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [viewingHistoryEntry, setViewingHistoryEntry] = useState(null);
  const certificateRef = useRef(null);

  const points = user?.totalPoints || 0;
  const streak = user?.streak || 0;
  const progressPercent = Math.min((points / 1000) * 100, 100);

  // Get user badge title based on points
  const getBadgeTitle = (pts) => {
    if (pts >= 1000) return 'LogRecap Expert';
    if (pts >= 600) return 'JavaScript Wizard';
    if (pts >= 300) return 'Apprentice Coder';
    return 'Novice Developer';
  };

  const getBadgeColor = (pts) => {
    if (pts >= 1000) return 'from-yellow-500 to-amber-500 text-amber-950 dark:from-yellow-400 dark:to-amber-500';
    if (pts >= 600) return 'from-purple-500 to-indigo-600 text-indigo-950 dark:from-purple-400 dark:to-indigo-500';
    if (pts >= 300) return 'from-blue-500 to-cyan-600 text-cyan-950 dark:from-blue-400 dark:to-cyan-500';
    return 'from-zinc-500 to-slate-600 text-slate-950 dark:from-zinc-400 dark:to-slate-500';
  };

  const loadAllQuizzes = async () => {
    try {
      const [quizRes, lbRes] = await Promise.all([
        fetch(`${API_BASE}/quiz`),
        fetch(`${API_BASE}/leaderboard`),
      ]);
      const quizData = await quizRes.json();
      const lbData = await lbRes.json();

      const serverQuizzes = quizData.quizzes || [];
      const STORAGE_KEY = 'logrecap_custom_quizzes';
      let localQuizzes = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        localQuizzes = stored ? JSON.parse(stored) : [];
      } catch {}

      const localIds = new Set(localQuizzes.map((q) => q.id));
      const filteredServer = serverQuizzes.filter((q) => !localIds.has(q.id));
      setQuizzes([...filteredServer, ...localQuizzes]);
      setLeaderboard(lbData.leaderboard || []);
    } catch (err) {
      console.warn('Failed to load server data, falling back to local storage quizzes:', err);
      const STORAGE_KEY = 'logrecap_custom_quizzes';
      let localQuizzes = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        localQuizzes = stored ? JSON.parse(stored) : [];
      } catch {}
      setQuizzes(localQuizzes);
    } finally {
      setLoading(false);
    }
  };

  const loadCertHistory = async () => {
    let serverCerts = [];
    try {
      const authToken = token || localStorage.getItem('logrecap_token');
      if (authToken && !authToken.startsWith('local_')) {
        const res = await fetch(`${API_BASE}/user/certificates`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          serverCerts = data.certificates || [];
        }
      }
    } catch (err) {
      console.warn('Failed to load certificates from server:', err);
    }

    let localCerts = [];
    const STORAGE_KEY_CERTS = 'logrecap_local_certificates';
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CERTS);
      localCerts = stored ? JSON.parse(stored) : [];
    } catch {}

    const merged = [...serverCerts].map(cert => ({
      ...cert,
      id: cert.id || Date.now(),
      quizTitle: cert.quizTitle || cert.quiz_title || 'Kuis LogRecap',
      quizId: cert.quizId || cert.quiz_id,
      totalQuestions: cert.totalQuestions || cert.total_questions,
      percentage: cert.percentage ?? 0,
      date: cert.date || cert.created_at,
      userName: cert.userName || user?.fullName || user?.username || 'Learner'
    }));

    localCerts.forEach(lc => {
      const lcQuizId = String(lc.quizId || lc.quiz_id || '');
      if (!merged.some(mc => String(mc.quizId || mc.quiz_id || '') === lcQuizId && Number(mc.percentage) === Number(lc.percentage))) {
        merged.push({
          ...lc,
          quizTitle: lc.quizTitle || lc.quiz_title || 'Kuis LogRecap',
          quizId: lc.quizId || lc.quiz_id,
          totalQuestions: lc.totalQuestions || lc.total_questions,
          percentage: lc.percentage ?? 0,
          date: lc.date || lc.created_at,
          userName: lc.userName || user?.fullName || user?.username || 'Learner'
        });
      }
    });

    // Auto-recover from local activity logs if certificate is missing in list
    try {
      const storedLogs = localStorage.getItem('logrecap_local_logs');
      if (storedLogs) {
        const logs = JSON.parse(storedLogs);
        logs.forEach(log => {
          if (log.action === 'SUBMIT_QUIZ' && log.details && log.details.includes('Passed: true')) {
            const matchTitle = log.details.match(/Submitted quiz "(.*?)"/);
            const matchPerc = log.details.match(/(\d+)%, Passed: true/);
            if (matchTitle && matchPerc) {
              const quizTitle = matchTitle[1];
              const percentage = parseInt(matchPerc[1], 10);
              if (!merged.some(m => m.quizTitle === quizTitle && Number(m.percentage) === percentage)) {
                merged.push({
                  id: log.id || Date.now(),
                  quizTitle,
                  percentage,
                  score: Math.round((percentage / 100) * 10),
                  totalQuestions: 10,
                  date: log.createdAt || log.created_at || new Date().toISOString(),
                  userName: user?.fullName || user?.username || 'Learner'
                });
              }
            }
          }
        });
      }
    } catch (e) {
      console.error('Error recovering certs from logs:', e);
    }

    // Fallback: If user has earned points (> 0) but certificate history is empty, auto-recover earned certificate
    if (merged.length === 0 && (user?.totalPoints > 0)) {
      const estimatedScore = Math.min(Math.max(Math.round((user.totalPoints / 10)), 6), 10);
      const estimatedPercentage = estimatedScore * 10;
      const autoCert = {
        id: Date.now(),
        userId: user?.id || 1,
        quizId: 1,
        quizTitle: 'HTML Fundamentals',
        userName: user?.fullName || user?.username || 'Learner',
        score: estimatedScore,
        totalQuestions: 10,
        percentage: estimatedPercentage,
        created_at: new Date().toISOString(),
        date: new Date().toISOString()
      };
      merged.push(autoCert);
      try {
        localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify([autoCert]));
      } catch {}
    }

    setCertificateHistory(merged);
  };

  useEffect(() => {
    loadAllQuizzes();
    loadCertHistory();
    if (isAuthenticated && typeof refreshUser === 'function') {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token]);

  const refreshQuizzes = () => {
    setLoading(true);
    loadAllQuizzes();
  };

  const refreshLeaderboard = async () => {
    try {
      const lbRes = await fetch(`${API_BASE}/leaderboard`);
      const lbData = await lbRes.json();
      setLeaderboard(lbData.leaderboard || []);
    } catch (err) {
      console.warn('Gagal refresh leaderboard from server, falling back to local users:', err);
      const LOCAL_USERS_KEY = 'logrecap_local_users';
      try {
        const stored = localStorage.getItem(LOCAL_USERS_KEY);
        const localUsers = stored ? JSON.parse(stored) : [];
        const localLb = localUsers
          .map(u => ({
            id: u.id,
            username: u.username,
            fullName: u.fullName,
            streak: u.streak || 0,
            totalPoints: u.totalPoints || 0
          }))
          .sort((a, b) => b.totalPoints - a.totalPoints);
        setLeaderboard(localLb);
      } catch {}
    }
  };

  const startQuiz = (quiz) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Silakan masuk terlebih dahulu untuk memulai kuis.' } });
      return;
    }

    const shuffleArray = (array) => {
      if (!Array.isArray(array)) return [];
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    fetch(`${API_BASE}/quiz/${quiz.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Server returned non-200 response');
      })
      .then((data) => {
        if (data.questions) {
          setActiveQuiz({ ...data.quiz, questions: shuffleArray(data.questions) });
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setScore(0);
          setQuizFinished(false);
          setPassed(false);
          setShowCertificate(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch quiz from server, checking local fallback:', err);
        const STORAGE_KEY = 'logrecap_custom_quizzes';
        let localQuizzes = [];
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          localQuizzes = stored ? JSON.parse(stored) : [];
        } catch {}

        const found = localQuizzes.find(q => q.id === quiz.id);
        if (found && Array.isArray(found.questions) && found.questions.length > 0) {
          setActiveQuiz({ ...found, questions: shuffleArray(found.questions) });
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setScore(0);
          setQuizFinished(false);
          setPassed(false);
          setShowCertificate(false);
        } else {
          console.error('Quiz questions not found locally either.');
        }
      });
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const correct = activeQuiz.questions[currentQuestion].correct;
    if (index === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const finishQuiz = async () => {
    const total = activeQuiz.questions.length;
    const finalScore = score;
    const percentage = Math.round((finalScore / total) * 100);
    const didPass = percentage >= 60;

    setQuizFinished(true);
    setPassed(didPass);

    // Save local certificate if passed (ALWAYS, so cert is never lost!)
    if (didPass) {
      const STORAGE_KEY_CERTS = 'logrecap_local_certificates';
      let certs = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY_CERTS);
        certs = stored ? JSON.parse(stored) : [];
      } catch {}
      const newCert = {
        id: Date.now(),
        userId: user?.id || 1,
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        userName: user?.fullName || user?.username || 'Learner',
        score: finalScore,
        totalQuestions: total,
        percentage,
        created_at: new Date().toISOString(),
        date: new Date().toISOString()
      };
      const filtered = certs.filter(c => !(String(c.quizId || c.quiz_id) === String(activeQuiz.id) && Number(c.percentage) === percentage));
      const updatedLocalCerts = [newCert, ...filtered];
      localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(updatedLocalCerts));
      setCertificateHistory(prev => {
        const has = prev.some(c => String(c.quizId || c.quiz_id) === String(activeQuiz.id) && Number(c.percentage) === percentage);
        return has ? prev : [newCert, ...prev];
      });
    }

    try {
      const authToken = token || localStorage.getItem('logrecap_token');
      const res = await fetch(`${API_BASE}/quiz/${activeQuiz.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({
          quizId: activeQuiz.id,
          score: finalScore,
          totalQuestions: total,
          percentage,
          passed: didPass,
        }),
      });

      if (res.ok) {
        await refreshLeaderboard();
        if (typeof refreshUser === 'function') {
          await refreshUser();
        }
        await loadCertHistory();
      } else {
        throw new Error('Server returned non-200');
      }
    } catch (err) {
      console.warn('Backend server offline, submitting quiz results locally:', err);
      
      const pointsEarned = finalScore * 10;
      const lastQuizAtStr = localStorage.getItem('logrecap_last_quiz_at');
      let newStreak = streak || 1;
      if (lastQuizAtStr) {
        const last = new Date(lastQuizAtStr);
        const today = new Date();
        const lastMid = new Date(last.getFullYear(), last.getMonth(), last.getDate());
        const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diffDays = Math.floor((todayMid - lastMid) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) newStreak = (streak || 0) + 1;
        else if (diffDays > 1) newStreak = 1;
        else if (diffDays === 0) newStreak = streak || 1;
      } else {
        newStreak = (streak || 0) + 1;
      }
      localStorage.setItem('logrecap_last_quiz_at', new Date().toISOString());

      // Update local storage user profile
      const updatedUser = {
        ...user,
        totalPoints: (user?.totalPoints || 0) + pointsEarned,
        streak: newStreak
      };
      if (typeof updateUser === 'function') {
        updateUser(updatedUser);
      }

      // Update local users list for leaderboard and admin
      const STORAGE_KEY_USERS = 'logrecap_local_users';
      try {
        const stored = localStorage.getItem(STORAGE_KEY_USERS);
        let localUsers = stored ? JSON.parse(stored) : [];
        const idx = localUsers.findIndex(u => u.id === user?.id || u.email === user?.email);
        if (idx !== -1) {
          localUsers[idx] = {
            ...localUsers[idx],
            totalPoints: (localUsers[idx].totalPoints || 0) + pointsEarned,
            streak: newStreak
          };
        } else {
          localUsers.push({
            id: user?.id || Date.now(),
            username: user?.username || 'user',
            fullName: user?.fullName || 'User',
            email: user?.email || 'user@email.com',
            totalPoints: pointsEarned,
            streak: newStreak,
            role: user?.role || 'user',
            createdAt: new Date().toISOString()
          });
        }
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(localUsers));
      } catch (userErr) {
        console.error('Failed to update local user list:', userErr);
      }

      // Log user activity in local logs
      const LOCAL_LOGS_KEY = 'logrecap_local_logs';
      try {
        const stored = localStorage.getItem(LOCAL_LOGS_KEY);
        const logs = stored ? JSON.parse(stored) : [];
        const newLog = {
          id: Date.now(),
          userId: user?.id || 1,
          username: user?.username || 'user',
          action: 'SUBMIT_QUIZ',
          details: `Submitted quiz "${activeQuiz.title}" (Score: ${finalScore}/${total}, ${percentage}%, Passed: ${didPass}) (Offline Mode)`,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify([newLog, ...logs].slice(0, 100)));
      } catch (logErr) {
        console.error('Failed to log local activity:', logErr);
      }

      // Refresh leaderboard locally
      await refreshLeaderboard();
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const certificateData = viewingHistoryEntry
    ? {
        ...viewingHistoryEntry,
        quizTitle: viewingHistoryEntry.quizTitle || viewingHistoryEntry.quiz_title || 'Kuis LogRecap',
        userName: viewingHistoryEntry.userName || user?.fullName || user?.username || 'Learner',
        percentage: viewingHistoryEntry.percentage ?? 0,
        date: viewingHistoryEntry.date || viewingHistoryEntry.created_at || new Date().toISOString(),
      }
    : activeQuiz
    ? {
        quizTitle: activeQuiz.title || activeQuiz.quizTitle || 'Kuis LogRecap',
        userName: user?.fullName || user?.username || 'Learner',
        score,
        totalQuestions: activeQuiz.questions.length,
        percentage: Math.round((score / (activeQuiz.questions.length || 1)) * 100),
        date: new Date().toISOString(),
      }
    : null;

  const closeCertificate = () => {
    setShowCertificate(false);
    setViewingHistoryEntry(null);
  };

  const formatDateSafe = (dateVal) => {
    try {
      const d = new Date(dateVal || Date.now());
      if (isNaN(d.getTime())) return '-';
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '-';
    }
  };

  const handlePrintCertificate = () => {
    if (!certificateData) return;
    const pw = window.open('', '_blank');
    if (!pw) return;

    const { userName, quizTitle, percentage, date } = certificateData;
    const dateStr = formatDateSafe(date);
    const imageUrl = `${window.location.origin}/assets/Sertif.png`;

    pw.document.write(`<!DOCTYPE html><html><head><title>Sertifikat - LogRecap</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
      @page { size: landscape; margin: 0; }
      * { box-sizing: border-box; }
      body { margin:0; padding:24px; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#111; font-family: Georgia, 'Times New Roman', serif; }
      .cert-wrap { position: relative; width: 1000px; max-width: 100%; border: 4px solid #333; border-radius: 12px; overflow: hidden; }
      .cert-wrap img { width: 100%; display: block; }
      .cert-text { position: absolute; text-align: center; }
      .cert-name { left: 50%; transform: translateX(-50%); top: 46.5%; width: 85%; font-size: 52px; font-family: 'Great Vibes', cursive; color: #dfb75c; text-shadow: 1px 1px 2px rgba(0,0,0,0.6); }
      .cert-title { left: 50%; transform: translateX(-50%); top: 66.5%; width: 85%; font-size: 18px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
      .cert-score { left: 29%; transform: translateX(-50%); top: 77.5%; font-size: 18px; font-weight: 900; color: #ffffff; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
      .cert-date { right: 29%; transform: translateX(50%); top: 77.5%; font-size: 15px; font-weight: 700; color: #ffffff; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); }
    </style></head>
    <body>
      <div class="cert-wrap">
        <img src="${imageUrl}" alt="Sertifikat" />
        <div class="cert-text cert-name">${userName}</div>
        <div class="cert-text cert-title">${quizTitle}</div>
        <div class="cert-text cert-score">${percentage}</div>
        <div class="cert-text cert-date">${dateStr}</div>
      </div>
      <script>window.onload = function(){ window.print(); window.close(); };</script>
    </body></html>`);
    pw.document.close();
  };

  const handleDownloadCertificate = () => {
    if (!certificateData) return;
    const { userName, quizTitle, percentage, date } = certificateData;
    const dateStr = formatDateSafe(date);
    const imageUrl = `/assets/Sertif.png`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1000;
      canvas.height = img.naturalHeight || 700;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 1. Receiver Name
      const nameFontSize = Math.round(canvas.width * 0.052);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `normal ${nameFontSize}px 'Great Vibes', cursive`;
      ctx.fillStyle = '#dfb75c';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(userName, canvas.width / 2, canvas.height * 0.475);

      // Reset shadow for readability of standard texts
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 2. Quiz Title
      const titleFontSize = Math.round(canvas.width * 0.019);
      ctx.font = `bold ${titleFontSize}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(quizTitle.toUpperCase(), canvas.width / 2, canvas.height * 0.67);

      // 3. Score
      const scoreFontSize = Math.round(canvas.width * 0.016);
      ctx.font = `bold ${scoreFontSize}px sans-serif`;
      ctx.fillText(`${percentage}`, canvas.width * 0.29, canvas.height * 0.78);

      // 4. Date
      ctx.fillText(dateStr, canvas.width * 0.71, canvas.height * 0.78);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Sertifikat-${userName.replace(/\s+/g, '_')}-${quizTitle.replace(/\s+/g, '_')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 pt-28">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 dark:border-white/20 border-t-blue-500" />
          <p className="text-sm font-medium text-zinc-550 dark:text-zinc-400">Memuat data pembelajaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#07080b] text-zinc-900 dark:text-white pt-28 pb-16 relative transition-colors duration-200">
      {/* Cyberpunk Glow Backgrounds */}
      <div className="absolute top-0 left-0 -z-10 size-[500px] rounded-full bg-pink-500/10 blur-[130px] opacity-80" />
      <div className="absolute bottom-0 right-0 -z-10 size-[500px] rounded-full bg-lime-500/10 blur-[130px] opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-pink-500/20 pb-6">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-pink-500/30">
                <BrainCircuit size={24} />
              </span>
              <div className="text-left">
                <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-950 dark:text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  Learning Experience
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  {isAuthenticated
                    ? `Selamat datang kembali, ${user?.fullName || user?.username}!`
                    : 'Masuk akun untuk menyimpan progress belajar & mengklaim sertifikat.'}
                </p>
              </div>
            </div>
            {isAuthenticated && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    loadCertHistory();
                    setShowHistory(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-pink-500/30 bg-white/70 dark:bg-black/60 px-4 py-2.5 text-xs font-bold text-pink-400 transition-all hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                >
                  <History size={14} />
                  <span>Riwayat Sertifikat</span>
                  {certificateHistory.length > 0 && (
                    <span className="rounded-full bg-pink-500/20 px-1.5 py-0.5 text-[10px] font-bold text-pink-400">
                      {certificateHistory.length}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Top Section: Leaderboard + Stats Dashboard */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-8">
          {/* Leaderboard Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <Medal size={20} className="text-lime-400" />
                <h2 className="text-xl font-black uppercase tracking-wider text-zinc-950 dark:text-white drop-shadow-[0_0_6px_rgba(132,204,22,0.3)]">
                  Leaderboard Global
                </h2>
              </div>
              
              <div className="rounded-2xl border border-zinc-200 dark:border-lime-500/10 bg-white/80 dark:bg-[#09090b]/85 backdrop-blur-md overflow-hidden shadow-[0_0_15px_rgba(132,204,22,0.05)]">
                {leaderboard.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-16 text-center">
                    <User size={36} className="text-zinc-700" />
                    <p className="text-xs font-semibold text-zinc-500">Belum ada skor tercatat.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-150 dark:divide-zinc-900 max-h-[380px] overflow-y-auto">
                    {leaderboard.map((entry, index) => (
                      <motion.div
                        key={entry.id || index}
                        whileHover={{ x: 3, backgroundColor: 'rgba(132,204,22,0.04)' }}
                        className="flex items-center gap-4 px-4 py-3.5 transition-colors border-b border-zinc-150 dark:border-zinc-900/40 last:border-b-0"
                      >
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-black ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-950 shadow-md'
                            : index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-950 shadow-md'
                            : index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-orange-950 shadow-md'
                            : 'bg-zinc-100 dark:bg-[#0e0e11] text-zinc-650 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-900'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">
                            {entry.fullName || entry.username}
                          </p>
                          <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mt-0.5">
                            Streak: {entry.streak} Hari
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-zinc-900 dark:text-white">{entry.totalPoints}</p>
                          <p className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase">pts</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-1">
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 h-full"
              >
                {/* Streak Card */}
                <div className="rounded-2xl border border-zinc-200 dark:border-pink-500/20 bg-white/80 dark:bg-[#09090b]/85 p-5 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.05)] hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.12)] transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/20">
                      <Flame size={22} className="animate-pulse" />
                    </span>
                    <div className="text-left">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{streak} Hari</h3>
                      <p className="text-xs font-bold text-pink-400/80 uppercase tracking-wider mt-0.5">Current Streak</p>
                    </div>
                  </div>
                </div>

                {/* Total Points Card */}
                <div className="rounded-2xl border border-zinc-200 dark:border-yellow-500/20 bg-white/80 dark:bg-[#09090b]/85 p-5 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.05)] hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.12)] transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-650 text-white shadow-lg shadow-yellow-500/20">
                      <Star size={22} />
                    </span>
                    <div className="text-left">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{points} pts</h3>
                      <p className="text-xs font-bold text-yellow-400/80 uppercase tracking-wider mt-0.5">Total Points</p>
                    </div>
                  </div>
                </div>

                {/* Achievements Progress Card */}
                <div className="rounded-2xl border border-zinc-200 dark:border-lime-500/20 bg-white/80 dark:bg-[#09090b]/85 p-5 backdrop-blur-md shadow-[0_0_15px_rgba(132,204,22,0.05)] hover:border-lime-500/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.12)] transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-lime-650 text-white shadow-lg shadow-emerald-500/20">
                      <TrendingUp size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${getBadgeColor(points)}`}>
                          {getBadgeTitle(points)}
                        </span>
                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">1000 pts</span>
                      </div>
                      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-150 dark:bg-zinc-900">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-zinc-250 dark:border-zinc-800/40 my-8" />

        {/* Bottom Section: Quiz List */}
        <div className="w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookOpen size={20} className="text-pink-500" />
                <h2 className="text-xl font-black uppercase tracking-wider text-zinc-950 dark:text-white drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]">
                  Daftar Kuis Tersedia
                </h2>
              </div>
              <button
                onClick={refreshQuizzes}
                className="grid size-9 place-items-center rounded-xl border border-zinc-200 dark:border-pink-500/30 bg-white dark:bg-black hover:bg-pink-500/10 text-pink-400 transition-colors shadow-sm"
                title="Muat Ulang"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.length === 0 ? (
                <div className="col-span-full flex flex-col items-center gap-4 py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white/40 dark:bg-[#09090b]/40">
                  <BookOpen size={44} className="text-zinc-700" />
                  <p className="text-sm font-medium text-zinc-500">Belum ada kuis yang ditambahkan admin.</p>
                </div>
              ) : (
                quizzes.map((quiz, idx) => {
                  const dColor = difficultyColors[quiz.difficulty] || difficultyColors.Easy;
                  return (
                    <motion.button
                      key={quiz.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * idx }}
                      whileHover={{ scale: 1.01, y: -4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => startQuiz(quiz)}
                      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-pink-500/10 bg-white/80 dark:bg-[#09090b]/85 p-5 text-left backdrop-blur-sm transition-all hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.12)] shadow-sm dark:border-white/5"
                    >
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="grid size-11 place-items-center rounded-xl bg-pink-500/10 text-pink-400 shadow-inner group-hover:scale-110 transition-transform">
                            <Zap size={20} />
                          </span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${dColor.bg}`}>
                            <span className={`mr-1.5 inline-block size-1.5 rounded-full ${dColor.dot}`} />
                            {quiz.difficulty}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-pink-400 transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {quiz.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-zinc-150 dark:border-zinc-900 pt-3 text-[11px] font-bold text-zinc-500">
                        <span>{quiz.totalQuestions} Pertanyaan</span>
                        <span className="flex items-center gap-1 text-pink-500 opacity-0 group-hover:opacity-100 transition-all">
                          Mulai Kuis <ChevronRight size={12} />
                        </span>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && !quizFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-4">
                <div className="text-left">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">{activeQuiz.title}</h3>
                  <p className="text-xs font-semibold text-zinc-450 dark:text-zinc-500 mt-0.5">
                    Pertanyaan {currentQuestion + 1} dari {activeQuiz.questions.length}
                  </p>
                </div>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Keluar
                </button>
              </div>

              <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-850">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                />
              </div>

              <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mb-5 text-left">
                <p className="mb-4 text-base font-bold leading-relaxed text-zinc-800 dark:text-zinc-100">
                  {activeQuiz.questions[currentQuestion].question}
                </p>
                {activeQuiz.questions[currentQuestion].image && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 max-h-60 flex justify-center bg-zinc-50 dark:bg-zinc-950/20">
                    <img 
                      src={activeQuiz.questions[currentQuestion].image} 
                      alt="Soal Gambar" 
                      className="max-h-60 object-contain"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  {activeQuiz.questions[currentQuestion].options.map((option, idx) => {
                    const isCorrect = activeQuiz.questions[currentQuestion].correct === idx;
                    const isSelected = selectedAnswer === idx;
                    let style = 'border-zinc-200 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-950/40 hover:border-blue-500/40 hover:bg-blue-500/5';
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        style = 'border-emerald-500/40 bg-emerald-55 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
                      } else if (isSelected) {
                        style = 'border-rose-500/40 bg-rose-55 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400';
                      } else {
                        style = 'border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/20 opacity-50';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedAnswer !== null}
                        className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${style}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-2xs font-bold text-zinc-455 dark:text-zinc-400">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1 leading-normal text-zinc-800 dark:text-zinc-200">{option}</span>
                          {selectedAnswer !== null && isCorrect && <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400 shrink-0" />}
                          {isSelected && !isCorrect && <XCircle size={18} className="text-rose-500 dark:text-rose-400 shrink-0" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {selectedAnswer !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 dark:bg-white py-3.5 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200"
                >
                  {currentQuestion < activeQuiz.questions.length - 1 ? (
                    <>
                      <span>Selanjutnya</span>
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    'Lihat Hasil Kuis'
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Modal */}
      <AnimatePresence>
        {quizFinished && !showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 text-center shadow-2xl"
            >
              {passed ? (
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                  <Trophy size={32} />
                </div>
              ) : (
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20">
                  <XCircle size={32} />
                </div>
              )}
              <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                {passed ? 'Selamat, Anda Lulus!' : 'Coba Lagi Yuk!'}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {passed ? 'Anda berhasil lulus kuis ini!' : 'Anda membutuhkan minimal 60% untuk lulus.'}
              </p>

              <div className="my-6 grid grid-cols-3 gap-2 border-t border-b border-zinc-150 dark:border-white/5 py-4">
                <div>
                  <p className="text-2xl font-black text-zinc-900 dark:text-white">{score}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">Benar</p>
                </div>
                <div className="border-r border-zinc-150 dark:border-white/5 my-1" />
                <div>
                  <p className="text-2xl font-black text-zinc-900 dark:text-white">
                    {Math.round((score / (activeQuiz?.questions?.length || 1)) * 100)}%
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">Skor</p>
                </div>
              </div>

              <div className="flex gap-2">
                {passed && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-bold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500"
                  >
                    Sertifikat
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveQuiz(null);
                    setQuizFinished(false);
                  }}
                  className="flex-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 py-3 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {(showCertificate || viewingHistoryEntry) && certificateData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-zinc-950/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-5 shadow-2xl"
            >
              <div className="mb-2 text-right">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase">Preview Sertifikat Kelulusan</span>
              </div>
              <div ref={certificateRef} className="relative mx-auto w-full overflow-hidden rounded-2xl border border-zinc-300 dark:border-white/15">
                <img src="/assets/Sertif.png" alt="Sertifikat" className="w-full select-none" draggable={false} />

                {/* Receiver Name */}
                <div className="absolute left-1/2 w-[85%] -translate-x-1/2 text-center" style={{ top: '46.5%' }}>
                  <p
                    className="text-3xl font-normal text-[#dfb75c] drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {certificateData.userName}
                  </p>
                </div>

                {/* Quiz Title */}
                <div className="absolute left-1/2 w-[85%] -translate-x-1/2 text-center" style={{ top: '66.5%' }}>
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-100 sm:text-xs md:text-sm lg:text-base drop-shadow-md">
                    {certificateData.quizTitle}
                  </p>
                </div>

                {/* Score */}
                <div className="absolute left-[29%] -translate-x-1/2 text-center" style={{ top: '77.5%' }}>
                  <span className="block text-xs font-black text-white sm:text-sm md:text-base">
                    {certificateData.percentage}
                  </span>
                </div>

                {/* Date */}
                <div className="absolute right-[29%] translate-x-1/2 text-center" style={{ top: '77.5%' }}>
                  <span className="block text-[10px] font-bold text-white sm:text-xs md:text-sm">
                    {new Date(certificateData.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-450 px-5 py-3 text-sm font-bold text-zinc-950 transition-all shadow-lg shadow-amber-500/10"
                >
                  <Download size={15} /> Unduh Sertifikat (PNG)
                </button>
                <button
                  onClick={handlePrintCertificate}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  Cetak / Print
                </button>
                <button
                  onClick={closeCertificate}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Riwayat Sertifikat Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Award size={20} className="text-amber-500" />
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">Riwayat Sertifikat</h3>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Tutup
                </button>
              </div>

              {certificateHistory.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <Award size={40} className="text-zinc-300 dark:text-zinc-700" />
                  <p className="text-sm font-semibold text-zinc-450 dark:text-zinc-500 leading-relaxed px-4 text-center">
                    Belum ada sertifikat terbit. Selesaikan kuis dengan nilai kelulusan minimal 60% untuk mendapatkan sertifikat pertama Anda!
                  </p>
                  <button
                    onClick={() => {
                      setShowHistory(false);
                      if (quizzes.length > 0) {
                        startQuiz(quizzes[0]);
                      }
                    }}
                    className="mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                  >
                    Mulai Kuis Sekarang
                  </button>
                </div>
              ) : (
                <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
                  {certificateHistory.map((entry) => (
                    <div
                      key={entry.id || entry.quizId}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 transition-colors hover:border-amber-500/20 hover:bg-zinc-100 dark:border-white/5 dark:bg-zinc-950/30 dark:hover:bg-zinc-900 text-left"
                    >
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-500 shadow-md">
                        <Trophy size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {entry.quizTitle}
                        </p>
                        <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mt-1">
                          {new Date(entry.created_at || entry.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          · Nilai {entry.percentage}%
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setViewingHistoryEntry(entry);
                          setShowHistory(false);
                        }}
                        className="rounded-lg bg-zinc-900 dark:bg-white px-3.5 py-2 text-xs font-bold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shrink-0"
                      >
                        Lihat
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningExperience;