import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
      const mergedCerts = [...backendCerts];
      localCerts.forEach(lc => {
        if (!mergedCerts.some(bc => bc.quizId === lc.quizId && bc.percentage === lc.percentage)) {
          mergedCerts.push({
            id: lc.id,
            quizId: lc.quizId,
            quizTitle: lc.quizTitle,
            score: lc.score,
            totalQuestions: lc.totalQuestions,
            percentage: lc.percentage,
            created_at: lc.created_at || lc.date,
            date: lc.date || lc.created_at
          });
        }
      });

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
    </div>
  );
};

export default Account;