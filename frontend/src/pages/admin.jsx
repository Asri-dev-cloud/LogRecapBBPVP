import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FilePlus2,
  ListChecks,
  TerminalSquare,
  ShieldCheck,
  Users,
  Activity,
  UserX,
  RotateCw,
  Search,
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import QuizManager from '../components/quiz/QuizManager';
import MaterialManager from '../components/material/MaterialManager';
import { topics } from './topicRegistry';

const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname.includes('localhost') ? 'http://localhost:5000/api' : 'http://187.77.126.26:5000/api');

const TABS = [
  { key: 'quiz', label: 'Kelola Kuis', icon: ListChecks },
  { key: 'material', label: 'Kelola Materi & Terminal', icon: FilePlus2 },
  { key: 'users', label: 'Kelola Pengguna', icon: Users },
  { key: 'logs', label: 'Log Aktivitas', icon: Activity },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, token, loading } = useAuth();
  
  const [tab, setTab] = useState('quiz');
  const [topicSlug, setTopicSlug] = useState(topics[0]?.slug || 'html');
  
  // Admin state
  const [usersList, setUsersList] = useState([]);
  const [logsList, setLogsList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLogQuery, setSearchLogQuery] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // User CRUD states
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 'user',
    totalPoints: 0,
    streak: 0
  });

  const handleCreateUserClick = () => {
    setEditingUser(null);
    setUserFormData({
      username: '',
      fullName: '',
      email: '',
      password: '',
      role: 'user',
      totalPoints: 0,
      streak: 0
    });
    setShowUserForm(true);
  };

  const handleEditUserClick = (u) => {
    setEditingUser(u);
    setUserFormData({
      username: u.username || '',
      fullName: u.fullName || '',
      email: u.email || '',
      password: '',
      role: u.role || 'user',
      totalPoints: u.totalPoints || 0,
      streak: u.streak || 0
    });
    setShowUserForm(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    
    const payload = {
      username: userFormData.username.trim(),
      fullName: userFormData.fullName.trim(),
      email: userFormData.email.trim(),
      role: userFormData.role,
      totalPoints: parseInt(userFormData.totalPoints) || 0,
      streak: parseInt(userFormData.streak) || 0
    };

    if (userFormData.password && userFormData.password.trim() !== '') {
      payload.password = userFormData.password;
    }

    if (!payload.username || !payload.fullName || !payload.email) {
      setActionError('Username, Nama Lengkap, dan Email wajib diisi.');
      return;
    }

    if (!editingUser && !userFormData.password) {
      setActionError('Password wajib diisi untuk pengguna baru.');
      return;
    }

    try {
      const url = editingUser ? `${API_BASE}/admin/users/${editingUser.id}` : `${API_BASE}/admin/users`;
      const method = editingUser ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || localStorage.getItem('logrecap_token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActionSuccess(editingUser ? `Berhasil memperbarui data ${payload.username}.` : `Berhasil menambahkan pengguna baru ${payload.username}.`);
        setShowUserForm(false);
        fetchUsers();
        fetchLogs();
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.message || 'Gagal menyimpan data pengguna.');
      }
    } catch (error) {
      console.warn('Backend server offline, falling back to local storage user CRUD.');
      const LOCAL_USERS_KEY = 'logrecap_local_users';
      try {
        const data = localStorage.getItem(LOCAL_USERS_KEY);
        let locals = data ? JSON.parse(data) : [];

        if (editingUser) {
          locals = locals.map(u => u.id === editingUser.id ? { ...u, ...payload, totalPoints: payload.totalPoints, streak: payload.streak } : u);
          logLocalActivity('UPDATE_USER', `Memperbarui data user: "${payload.username}" (Offline Mode)`);
          setActionSuccess(`Berhasil memperbarui data ${payload.username} (Offline).`);
        } else {
          const newId = Date.now();
          const newUser = {
            id: newId,
            ...payload,
            createdAt: new Date().toISOString()
          };
          locals.push(newUser);
          logLocalActivity('CREATE_USER', `Menambahkan user baru: "${payload.username}" (Offline Mode)`);
          setActionSuccess(`Berhasil menambahkan pengguna baru ${payload.username} (Offline).`);
        }
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(locals));
        setShowUserForm(false);
        fetchUsers();
        fetchLogs();
      } catch (err) {
        setActionError('Gagal menyimpan data pengguna.');
      }
    }
  };

  // Passcode authentication state for local testing/fallback
  const [passcodeUnlocked, setPasscodeUnlocked] = useState(user?.role === 'admin');
  const [passcodeVal, setPasscodeVal] = useState('');
  const [passcodeErr, setPasscodeErr] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      setPasscodeUnlocked(true);
    }
  }, [user]);

  // Access check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { message: 'Silakan masuk terlebih dahulu untuk mengakses Dashboard Admin.' } });
    }
  }, [loading, isAuthenticated, navigate]);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcodeVal === '20424014') {
      setPasscodeUnlocked(true);
      setPasscodeErr('');
    } else {
      setPasscodeErr('Passcode admin salah.');
    }
  };

  const logLocalActivity = (action, details) => {
    const LOCAL_LOGS_KEY = 'logrecap_local_logs';
    try {
      const data = localStorage.getItem(LOCAL_LOGS_KEY);
      const logs = data ? JSON.parse(data) : [];
      const newLog = {
        id: Date.now(),
        userId: user?.id || 1,
        username: user?.username || 'admin',
        action,
        details,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify([newLog, ...logs].slice(0, 100)));
    } catch (e) {}
  };

  // Fetch users list
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setActionError('');
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem('logrecap_token')}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.message || 'Gagal mengambil daftar pengguna.');
      }
    } catch (error) {
      console.warn('Backend server offline, falling back to local storage users.');
      const LOCAL_USERS_KEY = 'logrecap_local_users';
      try {
        const data = localStorage.getItem(LOCAL_USERS_KEY);
        const locals = data ? JSON.parse(data) : [];
        const mapped = locals.map(u => ({
          id: u.id,
          username: u.username,
          fullName: u.fullName,
          email: u.email,
          totalPoints: u.totalPoints || 0,
          streak: u.streak || 0,
          role: u.role || 'user',
          createdAt: u.createdAt || u.created_at || new Date().toISOString()
        }));
        setUsersList(mapped);
      } catch (err) {
        setActionError('Terjadi kesalahan jaringan.');
      }
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch activity logs
  const fetchLogs = async () => {
    setLoadingLogs(true);
    setActionError('');
    try {
      const res = await fetch(`${API_BASE}/admin/logs`, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem('logrecap_token')}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLogsList(data.logs || []);
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.message || 'Gagal mengambil log aktivitas.');
      }
    } catch (error) {
      console.warn('Backend server offline, falling back to local storage logs.');
      const LOCAL_LOGS_KEY = 'logrecap_local_logs';
      try {
        const data = localStorage.getItem(LOCAL_LOGS_KEY);
        const locals = data ? JSON.parse(data) : [];
        setLogsList(locals);
      } catch (err) {
        setActionError('Gagal mengambil log aktivitas.');
      }
    } finally {
      setLoadingLogs(false);
    }
  };

  // Toggle user role
  const handleToggleRole = async (targetUser) => {
    const nextRole = targetUser.role === 'admin' ? 'user' : 'admin';
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch(`${API_BASE}/admin/users/${targetUser.id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || localStorage.getItem('logrecap_token')}`,
        },
        body: JSON.stringify({ role: nextRole }),
      });
      if (res.ok) {
        setActionSuccess(`Berhasil mengubah role ${targetUser.username} menjadi ${nextRole}.`);
        fetchUsers();
        fetchLogs();
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.message || 'Gagal mengubah role.');
      }
    } catch (error) {
      const LOCAL_USERS_KEY = 'logrecap_local_users';
      try {
        const data = localStorage.getItem(LOCAL_USERS_KEY);
        let locals = data ? JSON.parse(data) : [];
        locals = locals.map(u => u.id === targetUser.id ? { ...u, role: nextRole } : u);
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(locals));
        
        logLocalActivity('CHANGE_ROLE', `Mengubah role user "${targetUser.username}" menjadi "${nextRole}" (Offline Mode)`);
        setActionSuccess(`Berhasil mengubah role ${targetUser.username} menjadi ${nextRole} (Offline).`);
        fetchUsers();
        fetchLogs();
      } catch (err) {
        setActionError('Gagal mengubah role pengguna.');
      }
    }
  };

  // Delete user account
  const handleDeleteUser = async (targetId, targetUsername) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus akun "${targetUsername}"? Tindakan ini permanen.`)) {
      return;
    }
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch(`${API_BASE}/admin/users/${targetId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem('logrecap_token')}`,
        },
      });
      if (res.ok) {
        setActionSuccess(`Akun "${targetUsername}" berhasil dihapus.`);
        fetchUsers();
        fetchLogs();
      } else {
        const err = await res.json().catch(() => ({}));
        setActionError(err.message || 'Gagal menghapus pengguna.');
      }
    } catch (error) {
      const LOCAL_USERS_KEY = 'logrecap_local_users';
      try {
        const data = localStorage.getItem(LOCAL_USERS_KEY);
        let locals = data ? JSON.parse(data) : [];
        locals = locals.filter(u => u.id !== targetId);
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(locals));
        
        logLocalActivity('DELETE_USER', `Menghapus akun user: "${targetUsername}" (Offline Mode)`);
        setActionSuccess(`Akun "${targetUsername}" berhasil dihapus (Offline).`);
        fetchUsers();
        fetchLogs();
      } catch (err) {
        setActionError('Gagal menghapus pengguna.');
      }
    }
  };

  // Run initial fetches on tab changes
  useEffect(() => {
    if (tab === 'users') {
      fetchUsers();
    } else if (tab === 'logs') {
      fetchLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // Filter users based on query
  const filteredUsers = usersList.filter((u) => {
    const query = searchQuery.toLowerCase();
    return (
      (u.username || '').toLowerCase().includes(query) ||
      (u.fullName || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query) ||
      (u.role || '').toLowerCase().includes(query)
    );
  });

  // Filter logs based on query
  const filteredLogs = logsList.filter((l) => {
    const query = searchLogQuery.toLowerCase();
    return (
      (l.username || '').toLowerCase().includes(query) ||
      (l.action || '').toLowerCase().includes(query) ||
      (l.details || '').toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 pt-28">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 dark:border-white/20 border-t-amber-500" />
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Memeriksa hak akses...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will navigate away via useEffect
  }

  if (!passcodeUnlocked) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-zinc-55 dark:bg-zinc-955 px-4 pt-24 pb-12 text-zinc-900 dark:text-white">
        <div className="absolute top-1/4 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[128px]" />
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 p-8 shadow-2xl dark:shadow-none backdrop-blur-2xl text-center">
          <span className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-zinc-950 shadow-lg">
            <ShieldCheck size={28} />
          </span>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Akses Admin Dibatasi</h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 animate-pulse">
            Akun Anda tidak memiliki role Admin. Masukkan passcode admin untuk membuka dashboard.
          </p>
          <form onSubmit={handlePasscodeSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              value={passcodeVal}
              onChange={(e) => { setPasscodeVal(e.target.value); setPasscodeErr(''); }}
              placeholder="Masukkan passcode admin"
              className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-3.5 px-4 text-center text-sm font-semibold text-zinc-900 dark:text-white outline-none transition-all placeholder:text-zinc-450 dark:placeholder:text-zinc-600 focus:border-amber-500"
            />
            {passcodeErr && (
              <p className="text-xs font-semibold text-red-500">{passcodeErr}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-2xl bg-zinc-900 dark:bg-white py-3.5 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200"
            >
              Buka Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#07080b] text-zinc-900 dark:text-white pt-28 pb-16 relative transition-colors duration-200">
      {/* Cyberpunk Glow Backgrounds */}
      <div className="absolute top-0 right-0 -z-10 size-[450px] rounded-full bg-pink-500/10 blur-[130px] opacity-80" />
      <div className="absolute bottom-0 left-0 -z-10 size-[450px] rounded-full bg-lime-500/10 blur-[130px] opacity-80" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back and Title */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            to="/learning-experience"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-pink-450 hover:text-pink-400 transition-colors border border-pink-500/20 bg-pink-500/5 rounded-xl px-3 py-1.5"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Belajar</span>
          </Link>

          <div className="flex items-center gap-4 mt-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-pink-500/25">
              <ShieldCheck size={24} />
            </span>
            <div className="text-left">
              <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-950 dark:text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                Dashboard Admin
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Panel pengelolaan kuis, materi tambahan, terminal belajar, akun pengguna, dan log sistem.
              </p>
            </div>
          </div>
        </motion.div>

        {user?.role !== 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-400 font-semibold shadow-lg shadow-red-950/40 text-left flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>Berhasil masuk dashboard admin tapi belum punya akses sebagai admin (kemungkinan pembobolan)</span>
          </motion.div>
        )}

        {/* Tab Selector */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-pink-500/20 pb-5">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all border ${
                  active
                    ? 'bg-pink-600 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.35)]'
                    : 'bg-white/80 dark:bg-[#09090b]/80 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-pink-500/10 hover:border-pink-500/40 hover:text-pink-500 shadow-sm'
                }`}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Alerts Popup */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-[#09090b]/80 px-4 py-3 text-xs font-semibold text-emerald-400">
                <CheckCircle size={16} />
                <span>{actionSuccess}</span>
              </div>
            </motion.div>
          )}

          {actionError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-[#09090b]/80 px-4 py-3 text-xs font-semibold text-red-400">
                <AlertTriangle size={16} />
                <span>{actionError}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="rounded-3xl border border-pink-500/15 bg-[#09090b]/80 p-6 backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.06)]">
          {/* TAB: QUIZ */}
          {tab === 'quiz' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <QuizManager onClose={() => {}} onQuizUpdate={() => {}} />
            </motion.div>
          )}

          {/* TAB: MATERIAL & TERMINAL */}
          {tab === 'material' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 border-b border-zinc-200 dark:border-white/5 pb-4">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-left">
                  Pilih Topik Belajar Target:
                </label>
                <select
                  value={topicSlug}
                  onChange={(e) => setTopicSlug(e.target.value)}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-white outline-none focus:border-amber-500 shadow-sm"
                >
                  {topics.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      [{t.code}] {t.title}
                    </option>
                  ))}
                </select>
              </div>
              <MaterialManager topicSlug={topicSlug} onSectionsChange={() => {}} />
            </motion.div>
          )}

          {/* TAB: USER ACCOUNTS */}
          {tab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari berdasarkan nama, email, role..."
                    className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 pl-11 pr-4 text-xs font-medium text-zinc-800 dark:text-white outline-none placeholder:text-zinc-450 dark:placeholder:text-zinc-650 focus:border-amber-500"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={fetchUsers}
                    disabled={loadingUsers}
                    className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    <RotateCw size={14} className={loadingUsers ? 'animate-spin' : ''} />
                    <span>Refresh Daftar</span>
                  </button>
                  <button
                    onClick={handleCreateUserClick}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all hover:shadow-xl"
                  >
                    <Plus size={14} />
                    <span>Tambah Pengguna</span>
                  </button>
                </div>
              </div>

              {loadingUsers ? (
                <div className="py-16 text-center text-zinc-550">
                  <div className="size-6 animate-spin rounded-full border-2 border-zinc-300 dark:border-white/20 border-t-amber-500 mx-auto mb-3" />
                  <p className="text-xs">Mengambil daftar pengguna...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-zinc-250 dark:border-white/10 rounded-2xl text-zinc-500">
                  <Users size={32} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-700" />
                  <p className="text-xs">Tidak ada data pengguna cocok.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                        <th className="px-5 py-3.5">ID</th>
                        <th className="px-5 py-3.5">Username / Nama</th>
                        <th className="px-5 py-3.5">Email</th>
                        <th className="px-5 py-3.5">Poin / Streak</th>
                        <th className="px-5 py-3.5">Role</th>
                        <th className="px-5 py-3.5">Tanggal Terdaftar</th>
                        <th className="px-5 py-3.5 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-150 dark:divide-white/5">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-colors">
                          <td className="px-5 py-4 font-bold text-zinc-500">{u.id}</td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-zinc-800 dark:text-white">{u.username}</p>
                            <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5">{u.fullName}</p>
                          </td>
                          <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400">{u.email}</td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-zinc-700 dark:text-zinc-300">{u.totalPoints || 0} pts</p>
                            <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-0.5">Streak: {u.streak || 0} hari</p>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block rounded-lg px-2.5 py-0.5 text-[10px] font-bold ${
                                u.role === 'admin'
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/5'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                            {new Date(u.createdAt || u.created_at || new Date()).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex justify-end gap-1.5">
                              {/* Prevent self modifications */}
                              {u.id !== user.id ? (
                                <>
                                  <button
                                    onClick={() => handleEditUserClick(u)}
                                    className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-3xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(u.id, u.username)}
                                    className="rounded-lg border border-red-500/20 bg-red-50 dark:bg-red-950/20 px-2.5 py-1.5 text-3xs font-bold text-red-500 dark:text-red-400 hover:border-red-500/30 hover:bg-red-900 hover:text-white"
                                  >
                                    <UserX size={12} />
                                  </button>
                                </>
                              ) : (
                                <span className="text-[10px] italic text-zinc-500 px-3">Akun Anda</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* User CRUD Modal */}
              <AnimatePresence>
                {showUserForm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md"
                  >
                    <motion.div
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.92, opacity: 0 }}
                      className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-6 shadow-2xl max-h-[82vh] overflow-y-auto"
                    >
                      <div className="mb-5 flex items-center justify-between border-b border-zinc-150 dark:border-white/5 pb-4">
                        <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                          {editingUser ? `Edit Pengguna: ${editingUser.username}` : 'Tambah Pengguna Baru'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowUserForm(false)}
                          className="rounded-xl border border-zinc-200 dark:border-white/10 px-3 py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          Tutup
                        </button>
                      </div>

                      <form onSubmit={handleSaveUser} className="space-y-4 text-left pb-8">
                        <div>
                          <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Username</label>
                          <input
                            type="text"
                            required
                            value={userFormData.username}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, username: e.target.value }))}
                            placeholder="Contoh: budi_s"
                            className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Nama Lengkap</label>
                          <input
                            type="text"
                            required
                            value={userFormData.fullName}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Contoh: Budi Santoso"
                            className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Email</label>
                          <input
                            type="email"
                            required
                            value={userFormData.email}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Contoh: budi@gmail.com"
                            className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">
                            Password {editingUser && <span className="text-zinc-400 dark:text-zinc-500">(Kosongkan jika tidak diubah)</span>}
                          </label>
                          <input
                            type="password"
                            required={!editingUser}
                            value={userFormData.password}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder={editingUser ? '••••••••' : 'Masukkan password'}
                            className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Poin</label>
                            <input
                              type="number"
                              value={userFormData.totalPoints}
                              onChange={(e) => setUserFormData(prev => ({ ...prev, totalPoints: e.target.value }))}
                              className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Streak (Hari)</label>
                            <input
                              type="number"
                              value={userFormData.streak}
                              onChange={(e) => setUserFormData(prev => ({ ...prev, streak: e.target.value }))}
                              className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-zinc-500 dark:text-zinc-450">Role Akses</label>
                          <select
                            value={userFormData.role}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 py-2.5 px-4 text-sm font-semibold text-zinc-900 dark:text-white outline-none focus:border-amber-500"
                          >
                            <option value="user">User biasa (Student)</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-2xl bg-zinc-900 dark:bg-white py-3.5 text-sm font-bold text-white dark:text-zinc-950 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 mt-2"
                        >
                          {editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna'}
                        </button>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB: ACTIVITY LOGS */}
          {tab === 'logs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={searchLogQuery}
                    onChange={(e) => setSearchLogQuery(e.target.value)}
                    placeholder="Filter berdasarkan username, tipe aksi, detail..."
                    className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 py-2.5 pl-11 pr-4 text-xs font-medium text-zinc-800 dark:text-white outline-none placeholder:text-zinc-450 dark:placeholder:text-zinc-650 focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={fetchLogs}
                  disabled={loadingLogs}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors disabled:opacity-50 shrink-0"
                >
                  <RotateCw size={14} className={loadingLogs ? 'animate-spin' : ''} />
                  <span>Refresh Log</span>
                </button>
              </div>

              {loadingLogs ? (
                <div className="py-16 text-center text-zinc-500">
                  <div className="size-6 animate-spin rounded-full border-2 border-zinc-300 dark:border-white/20 border-t-amber-500 mx-auto mb-3" />
                  <p className="text-xs">Mengambil log aktivitas...</p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-zinc-250 dark:border-white/10 rounded-2xl text-zinc-500">
                  <Activity size={32} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-700" />
                  <p className="text-xs">Tidak ada log aktivitas tercatat.</p>
                </div>
              ) : (
                <>
                  {/* Desktop View: Table */}
                  <div className="hidden md:block overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/20">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                          <th className="px-5 py-3.5">Waktu</th>
                          <th className="px-5 py-3.5">User</th>
                          <th className="px-5 py-3.5">Aksi</th>
                          <th className="px-5 py-3.5">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-150 dark:divide-white/5">
                        {filteredLogs.map((l) => (
                          <tr key={l.id} className="hover:bg-zinc-50/55 dark:hover:bg-white/[0.01] transition-colors">
                            <td className="px-5 py-3 text-zinc-500 font-mono whitespace-nowrap">
                              {new Date(l.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                              })}{' '}
                              {new Date(l.createdAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              })}
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <span className="font-bold text-zinc-750 dark:text-zinc-300">
                                {l.username || (l.userId ? `User ID ${l.userId}` : 'Sistem')}
                              </span>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <span
                                className={`inline-block rounded-md px-2 py-0.5 text-[9px] font-bold ${
                                  l.action.startsWith('CREATE') || l.action.startsWith('ADD')
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : l.action.startsWith('DELETE')
                                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                    : l.action.startsWith('CHANGE') || l.action.startsWith('UPDATE')
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                }`}
                              >
                                {l.action}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400 max-w-md truncate" title={l.details}>
                              {l.details}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View: Cards list */}
                  <div className="block md:hidden space-y-3">
                    {filteredLogs.map((l) => (
                      <div key={l.id} className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#0c0d12]/50 p-4 space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-3xs font-bold text-zinc-500 dark:text-zinc-450 font-mono">
                            {new Date(l.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {new Date(l.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`inline-block rounded-md px-2 py-0.5 text-[9px] font-bold ${
                            l.action.startsWith('CREATE') || l.action.startsWith('ADD')
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              : l.action.startsWith('DELETE')
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : l.action.startsWith('CHANGE') || l.action.startsWith('UPDATE')
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                          }`}>
                            {l.action}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-black text-zinc-800 dark:text-white">
                            {l.username || (l.userId ? `User ID ${l.userId}` : 'Sistem')}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-450 break-words leading-relaxed border-t border-zinc-150 dark:border-white/5 pt-1.5">
                          {l.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
