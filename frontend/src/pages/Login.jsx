import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Mail, Lock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupName, setPopupName] = useState('');

  // Show redirection message if present
  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Harap masukkan username/email dan password.');
      return;
    }

    setLoading(true);
    try {
      const data = await login(formData.email.trim(), formData.password);
      setPopupName(data.user.fullName || data.user.username);
      setShowPopup(true);
      const targetPath = location.state?.from || '/learning-experience';
      setTimeout(() => {
        setShowPopup(false);
        navigate(targetPath, { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-24 pb-12 text-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 size-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-600/20 blur-[128px]" />

      <div className="flex w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-2xl">
        <div className="grid w-full grid-cols-1 lg:grid-cols-12">
          {/* Left panel: Logo only (hidden on mobile) */}
          <div className="relative hidden flex-col items-center justify-center bg-gradient-to-br from-blue-900/40 via-zinc-900 to-purple-950/40 p-12 lg:col-span-5 lg:flex">
            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] -z-10" />
            <div className="flex flex-col items-center justify-center text-center gap-6">
              <img src="/assets/logo.svg" alt="LogRecap Logo" className="size-36 animate-pulse select-none" />
              <span className="text-3xl font-black tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LogRecap
              </span>
            </div>
            <div className="absolute bottom-6 text-center text-[10px] text-zinc-550 font-medium">
              &copy; {new Date().getFullYear()} LogRecap Learning System.
            </div>
          </div>

          {/* Right panel: Login form */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:col-span-7">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex justify-center lg:hidden">
                <div className="flex flex-col items-center gap-2">
                  <img src="/assets/logo.svg" alt="LogRecap Logo" className="size-20 animate-pulse" />
                  <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    LogRecap
                  </span>
                </div>
              </div>

              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Selamat Datang
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  Silakan masuk untuk melanjutkan proses belajar Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Username / Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="username@email.com atau username"
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950/50 py-3.5 pl-12 pr-4 text-sm font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950/50 py-3.5 pl-12 pr-12 text-sm font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
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
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <span>Masuk ke Akun</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center text-sm text-zinc-500">
                Belum memiliki akun?{' '}
                <Link to="/register" className="font-semibold text-blue-400 hover:underline">
                  Daftar Sekarang
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
                Selamat datang kembali. Mengalihkan ke halaman belajar...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;