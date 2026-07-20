import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, UserCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupName, setPopupName] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username wajib diisi';
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      errors.username = '3-20 karakter (huruf, angka, garis bawah)';
    }

    if (!formData.fullName.trim()) {
      errors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      errors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Minimal 6 karakter';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Password tidak cocok';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await register({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      setPopupName(data.user.fullName || data.user.username);
      setShowPopup(true);
      const targetPath = location.state?.from || '/learning-experience';
      setTimeout(() => {
        setShowPopup(false);
        navigate(targetPath, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-zinc-950/50 py-3.5 pl-12 pr-4 text-sm font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:ring-2 ${
      fieldErrors[field]
        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
        : 'border-white/10 focus:border-emerald-500 focus:ring-emerald-500/20'
    }`;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-24 pb-12 text-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 right-1/4 -z-10 size-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/20 blur-[128px]" />
      <div className="absolute bottom-1/4 left-1/4 -z-10 size-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-teal-600/20 blur-[128px]" />

      <div className="flex w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-2xl">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12">
          {/* Left panel: Logo only (hidden on mobile) */}
          <div className="relative hidden flex-col items-center justify-center bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-teal-950/40 p-12 lg:col-span-5 lg:flex">
            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] -z-10" />
            <div className="flex flex-col items-center justify-center text-center gap-6">
              <img src="/assets/logo.svg" alt="LogRecap Logo" className="size-36 animate-pulse select-none" />
              <span className="text-3xl font-black tracking-widest bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                LogRecap
              </span>
            </div>
            <div className="absolute bottom-6 text-center text-[10px] text-zinc-550 font-medium">
              &copy; {new Date().getFullYear()} LogRecap Learning System.
            </div>
          </div>

          {/* Right panel: Register form */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-16 lg:col-span-7">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex justify-center lg:hidden">
                <div className="flex flex-col items-center gap-2">
                  <img src="/assets/logo.svg" alt="LogRecap Logo" className="size-20 animate-pulse" />
                  <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    LogRecap
                  </span>
                </div>
              </div>

              <div className="mb-6 text-center lg:text-left">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Buat Akun Baru
                </h1>
                <p className="mt-1.5 text-sm text-zinc-400">
                  Daftarkan diri Anda untuk mulai mengumpulkan poin dan sertifikat.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Username
                    </label>
                    <div className="relative">
                      <UserCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="username"
                        className={inputClass('username')}
                      />
                    </div>
                    {fieldErrors.username && (
                      <p className="mt-1 text-2xs font-semibold text-red-400">{fieldErrors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nama Lengkap"
                        className={inputClass('fullName')}
                      />
                    </div>
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-2xs font-semibold text-red-400">{fieldErrors.fullName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="username@email.com"
                      className={inputClass('email')}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 text-2xs font-semibold text-red-400">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={inputClass('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="mt-1 text-2xs font-semibold text-red-400">{fieldErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={inputClass('confirmPassword')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-1 text-2xs font-semibold text-red-400">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/20 bg-red-950/30 px-4 py-2.5 text-xs font-medium text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-emerald-500 hover:to-teal-500 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <span>Daftarkan Akun</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm text-zinc-500">
                Sudah memiliki akun?{' '}
                <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
                  Masuk Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 150 }}
              className="relative mx-4 w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-zinc-950/85 p-12 text-center shadow-2xl backdrop-blur-2xl dark:bg-zinc-950/90"
            >
              {/* Premium Glow effect */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 size-48 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-75" />

              <div className="relative mb-6 text-center select-none">
                <motion.span
                  className="inline-block text-8xl"
                  animate={{ rotate: [0, 14, -8, 14, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2.0,
                    ease: "easeInOut",
                    delay: 0.15
                  }}
                >
                  👋
                </motion.span>
              </div>
              <h2 className="relative text-3xl font-black tracking-tight text-white">
                Halo, {popupName}!
              </h2>
              <p className="relative mt-3 text-sm text-zinc-400 font-semibold leading-relaxed">
                Pendaftaran berhasil! Mengalihkan ke halaman belajar...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;