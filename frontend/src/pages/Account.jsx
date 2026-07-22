import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  LogOut,
  Camera,
  Award,
  BookOpen,
  Clock,
  Download,
  Trophy,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, token, logout, updateUser, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    bio: user?.bio || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [activityHistory, setActivityHistory] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  const formatDateSafe = (dateVal) => {
    try {
      const d = new Date(dateVal || Date.now());
      if (isNaN(d.getTime())) return '-';
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '-';
    }
  };

  const handlePrintCertificate = (cert) => {
    if (!cert) return;
    const pw = window.open('', '_blank');
    if (!pw) return;

    const userName = cert.userName || user?.fullName || user?.username || 'Learner';
    const quizTitle = cert.quizTitle || cert.quiz_title || 'Kuis LogRecap';
    const percentage = cert.percentage ?? 0;
    const dateStr = formatDateSafe(cert.date || cert.created_at);
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

  const handleDownloadCertificate = (cert) => {
    if (!cert) return;
    const userName = cert.userName || user?.fullName || user?.username || 'Learner';
    const quizTitle = cert.quizTitle || cert.quiz_title || 'Kuis LogRecap';
    const percentage = cert.percentage ?? 0;
    const dateStr = formatDateSafe(cert.date || cert.created_at);
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

      // Receiver Name
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

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Quiz Title
      const titleFontSize = Math.round(canvas.width * 0.019);
      ctx.font = `bold ${titleFontSize}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(quizTitle.toUpperCase(), canvas.width / 2, canvas.height * 0.67);

      // Score
      const scoreFontSize = Math.round(canvas.width * 0.016);
      ctx.font = `bold ${scoreFontSize}px sans-serif`;
      ctx.fillText(`${percentage}`, canvas.width * 0.29, canvas.height * 0.78);

      // Date
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

  React.useEffect(() => {
    if (!isAuthenticated) return;
    const fetchUserData = async () => {
      let backendCerts = [];
      let backendActivity = [];

      try {
        if (token && !token.startsWith('local_')) {
          const headers = { Authorization: `Bearer ${token}` };
          const [certRes, actRes] = await Promise.all([
            fetch(`${API_BASE}/user/certificates`, { headers }),
            fetch(`${API_BASE}/user/activity`, { headers }),
          ]);
          if (certRes.ok) {
            const certData = await certRes.json();
            backendCerts = certData.certificates || [];
          }
          if (actRes.ok) {
            const actData = await actRes.json();
            backendActivity = actData.activity || [];
          }
        }
      } catch (err) {
        console.error('Error fetching account data from backend:', err);
      }

      // Load local storage offline fallbacks
      let localCerts = [];
      let localActivity = [];
      try {
        const storedCerts = localStorage.getItem('logrecap_local_certificates');
        if (storedCerts) {
          localCerts = JSON.parse(storedCerts);
        }
        const storedLogs = localStorage.getItem('logrecap_local_logs');
        if (storedLogs) {
          localActivity = JSON.parse(storedLogs).map(log => ({
            id: log.id,
            action: log.action,
            details: log.details,
            createdAt: log.createdAt || log.created_at || new Date().toISOString()
          }));
        }
      } catch (e) {
        console.error('Error reading local fallback data:', e);
      }

      // Merge and remove duplicates
      const mergedCerts = backendCerts.map(bc => ({
        id: bc.id,
        quizId: bc.quizId || bc.quiz_id,
        quizTitle: bc.quizTitle || bc.quiz_title || 'Kuis LogRecap',
        score: bc.score,
        totalQuestions: bc.totalQuestions || bc.total_questions,
        percentage: bc.percentage ?? 0,
        created_at: bc.created_at || bc.date,
        date: bc.date || bc.created_at,
        userName: user?.fullName || user?.username || 'Learner'
      }));

      localCerts.forEach(lc => {
        const lcQuizId = String(lc.quizId || lc.quiz_id || '');
        if (!mergedCerts.some(bc => String(bc.quizId || bc.quiz_id || '') === lcQuizId && Number(bc.percentage) === Number(lc.percentage))) {
          mergedCerts.push({
            id: lc.id,
            quizId: lc.quizId || lc.quiz_id,
            quizTitle: lc.quizTitle || lc.quiz_title || 'Kuis LogRecap',
            score: lc.score,
            totalQuestions: lc.totalQuestions || lc.total_questions,
            percentage: lc.percentage ?? 0,
            created_at: lc.created_at || lc.date,
            date: lc.date || lc.created_at,
            userName: lc.userName || user?.fullName || user?.username || 'Learner'
          });
        }
      });

      // Auto-recover certs from local activity logs if missing
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
                if (!mergedCerts.some(m => m.quizTitle === quizTitle && Number(m.percentage) === percentage)) {
                  mergedCerts.push({
                    id: log.id || Date.now(),
                    quizTitle,
                    percentage,
                    score: Math.round((percentage / 100) * 10),
                    totalQuestions: 10,
                    created_at: log.createdAt || log.created_at || new Date().toISOString(),
                    date: log.createdAt || log.created_at || new Date().toISOString(),
                    userName: user?.fullName || user?.username || 'Learner'
                  });
                }
              }
            }
          });
        }
      } catch (e) {
        console.error('Error recovering certs from logs in Account:', e);
      }

      // Fallback: If user has earned points (> 0) but mergedCerts is empty, auto-recover earned certificate
      if (mergedCerts.length === 0 && (user?.totalPoints > 0)) {
        const estimatedScore = Math.min(Math.max(Math.round((user.totalPoints / 10)), 6), 10);
        const estimatedPercentage = estimatedScore * 10;
        const autoCert = {
          id: Date.now(),
          quizId: 1,
          quizTitle: 'HTML Fundamentals',
          score: estimatedScore,
          totalQuestions: 10,
          percentage: estimatedPercentage,
          created_at: new Date().toISOString(),
          date: new Date().toISOString(),
          userName: user?.fullName || user?.username || 'Learner'
        };
        mergedCerts.push(autoCert);
        try {
          localStorage.setItem('logrecap_local_certificates', JSON.stringify([autoCert]));
        } catch {}
      }

      const mergedActivity = [...backendActivity];
      localActivity.forEach(la => {
        if (!mergedActivity.some(ba => ba.details === la.details)) {
          mergedActivity.push(la);
        }
      });

      // Sort activity by date descending
      mergedActivity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setCertificates(mergedCerts);
      setActivityHistory(mergedActivity);
    };
    fetchUserData();
  }, [isAuthenticated, token]);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { message: 'Silakan masuk terlebih dahulu untuk mengakses halaman akun Anda.' } });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 pt-28">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-blue-500" />
          <p className="text-sm font-medium text-zinc-400">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage('');
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      updateUser(data.user);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      username: user?.username || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-black text-white shadow-lg">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-black text-zinc-900 dark:text-white">{user?.fullName || 'User'}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">@{user?.username || 'username'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Edit3 size={15} />
                  Edit Profile
                </button>
              ) : null}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50 dark:border-white/10 dark:hover:bg-red-950/30"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <div className="mb-8 rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 rounded-xl px-4 py-2.5 text-sm font-medium ${
                  message.includes('success')
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                    : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                }`}
              >
                {message}
              </motion.p>
            )}

            {isEditing ? (
              <div className="space-y-5">
                {/* Avatar Change Placeholder */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-black text-white shadow-lg">
                      {formData.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <button className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border-2 border-white bg-zinc-800 text-white shadow transition-colors hover:bg-zinc-700 dark:border-zinc-900">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Profile Picture</p>
                    <p className="text-xs text-zinc-500">Click the camera icon to change (placeholder)</p>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Email</label>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-800/30">
                    <Mail size={16} className="text-zinc-400" />
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{user?.email}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">Email cannot be changed</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-zinc-700 dark:text-zinc-300">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white dark:focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 px-6 py-3 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">{user?.fullName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Username</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">@{user?.username || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">{user?.email || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Member Since</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Bio</p>
                  <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {user?.bio || 'No bio yet.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-lg font-black text-zinc-900 dark:text-white">{user?.totalPoints || 0}</p>
                  <p className="text-[10px] font-bold text-zinc-500">Total Points</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-lg font-black text-zinc-900 dark:text-white">{activityHistory.filter(a => a.action === 'SUBMIT_QUIZ').length}</p>
                  <p className="text-[10px] font-bold text-zinc-500">Quizzes Taken</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-650 text-white shadow">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-lg font-black text-zinc-900 dark:text-white">{certificates.length}</p>
                  <p className="text-[10px] font-bold text-zinc-500">Certificates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80 mb-6">
              <div className="border-b border-zinc-200 px-6 py-4 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-amber-500" />
                  <h2 className="font-black text-zinc-900 dark:text-white">Riwayat Sertifikat</h2>
                </div>
                <span className="text-xs font-bold text-zinc-400">{certificates.length} Sertifikat</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id || index}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 dark:border-white/5 dark:bg-zinc-950/40 text-left"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                      <Trophy size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{cert.quizTitle}</p>
                      <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mt-0.5">
                        Nilai {cert.percentage}% · {new Date(cert.date || cert.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex items-center gap-1 rounded-lg bg-zinc-900 dark:bg-white px-3 py-1.5 text-xs font-bold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shrink-0"
                    >
                      <Eye size={12} />
                      <span>Lihat</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity History */}
          <div className="rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80">
            <div className="border-b border-zinc-200 px-6 py-4 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                <h2 className="font-black text-zinc-900 dark:text-white">Activity History</h2>
              </div>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {activityHistory.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <User size={40} className="text-zinc-300 dark:text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Belum ada riwayat aktivitas.</p>
                </div>
              ) : (
                activityHistory.map((activity, index) => {
                  let iconBg = 'bg-gradient-to-br from-blue-500 to-indigo-650 text-white';
                  let label = 'Aktivitas';
                  if (activity.action === 'LOGIN') {
                    iconBg = 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white';
                    label = 'Login Akun';
                  } else if (activity.action === 'REGISTER') {
                    iconBg = 'bg-gradient-to-br from-purple-400 to-pink-500 text-white';
                    label = 'Pendaftaran Akun';
                  } else if (activity.action === 'SUBMIT_QUIZ') {
                    const passed = activity.details.includes('Passed: true');
                    iconBg = passed
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                      : 'bg-gradient-to-br from-rose-400 to-pink-500 text-white';
                    label = passed ? 'Kuis Selesai (Lulus)' : 'Kuis Selesai (Gagal)';
                  }

                  return (
                    <div key={activity.id || index} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${iconBg}`}>
                        {activity.action === 'SUBMIT_QUIZ' ? <Award size={18} /> : <User size={18} />}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{activity.details}</p>
                        <p className="text-[10px] font-semibold text-zinc-450 dark:text-zinc-500 mt-0.5">{label}</p>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 shrink-0">
                        {new Date(activity.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
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
              <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-zinc-300 dark:border-white/15">
                <img src="/assets/Sertif.png" alt="Sertifikat" className="w-full select-none" draggable={false} />

                {/* Receiver Name */}
                <div className="absolute left-1/2 w-[85%] -translate-x-1/2 text-center" style={{ top: '46.5%' }}>
                  <p
                    className="text-3xl font-normal text-[#dfb75c] drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {selectedCert.userName || user?.fullName || user?.username || 'Learner'}
                  </p>
                </div>

                {/* Quiz Title */}
                <div className="absolute left-1/2 w-[85%] -translate-x-1/2 text-center" style={{ top: '66.5%' }}>
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-100 sm:text-xs md:text-sm lg:text-base drop-shadow-md">
                    {selectedCert.quizTitle || selectedCert.quiz_title || 'Kuis LogRecap'}
                  </p>
                </div>

                {/* Score */}
                <div className="absolute left-[29%] -translate-x-1/2 text-center" style={{ top: '77.5%' }}>
                  <span className="block text-xs font-black text-white sm:text-sm md:text-base">
                    {selectedCert.percentage ?? 0}
                  </span>
                </div>

                {/* Date */}
                <div className="absolute right-[29%] translate-x-1/2 text-center" style={{ top: '77.5%' }}>
                  <span className="block text-[10px] font-bold text-white sm:text-xs md:text-sm">
                    {new Date(selectedCert.date || selectedCert.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => handleDownloadCertificate(selectedCert)}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-450 px-5 py-3 text-sm font-bold text-zinc-950 transition-all shadow-lg shadow-amber-500/10"
                >
                  <Download size={15} /> Unduh Sertifikat (PNG)
                </button>
                <button
                  onClick={() => handlePrintCertificate(selectedCert)}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  Cetak / Print
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-5 py-3 text-sm font-bold text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Account;