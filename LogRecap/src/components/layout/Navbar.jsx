import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Atom,
  BookOpen,
  Brush,
  Database,
  FileCode2,
  KeyRound,
  Menu,
  Network,
  Palette,
  Server,
  Sparkles,
  SquareTerminal,
  Wind,
  X,
  GraduationCap,
  UserCircle,
  ShieldCheck,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { topics } from '../../pages/topicRegistry'
import { useAuth } from '../../context/AuthContext'

const iconMap = {
  Atom,
  Brush,
  Database,
  FileCode2,
  KeyRound,
  Network,
  Palette,
  Server,
  Sparkles,
  SquareTerminal,
  Wind,
}

const Navbar = () => {
  const { isAuthenticated, user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkBase = ({ isActive }) =>
    `flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-300 ${
      isActive
        ? 'bg-zinc-100 text-zinc-950 shadow-sm dark:bg-white/10 dark:text-white'
        : 'text-zinc-600 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:via-blue-500 hover:to-emerald-500 hover:text-white dark:text-zinc-400 dark:hover:text-white hover:shadow-md hover:shadow-purple-500/10'
    }`

  const iconBtn = ({ isActive }) =>
    `grid size-10 place-items-center rounded-full border text-xs font-bold transition-all duration-300 shadow-sm ${
      isActive
        ? 'border-transparent bg-gradient-to-tr from-pink-500 to-amber-500 text-white shadow-lg shadow-pink-500/20 dark:from-lime-400 dark:to-emerald-500 dark:text-zinc-950 dark:shadow-emerald-500/20'
        : 'border-zinc-200/60 bg-white/80 text-zinc-600 backdrop-blur hover:border-transparent hover:bg-gradient-to-tr hover:from-pink-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:border-transparent dark:hover:from-lime-400 dark:hover:to-emerald-500 dark:hover:text-zinc-950 dark:hover:shadow-emerald-500/20'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.nav
          layout
          className={`flex items-center gap-1.5 rounded-2xl border px-2 py-1.5 transition-all duration-300 ${
            isScrolled
              ? 'border-zinc-200/70 bg-white/90 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/85'
              : 'border-zinc-200/40 bg-white/70 shadow-lg shadow-zinc-900/5 backdrop-blur-lg dark:border-zinc-800/30 dark:bg-zinc-950/60'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-850"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-zinc-900 text-white shadow dark:bg-white dark:text-zinc-900">
              <img src="/assets/logo.svg" alt="Logo" className="size-[30px] object-contain" />
            </span>
            <span className="hidden text-xs font-black sm:block">LogRecap</span>
          </Link>

          {/* Desktop topics */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
            {topics.map((topic) => {
              const Icon = iconMap[topic.icon] || BookOpen
              return (
                <NavLink key={topic.slug} to={topic.route} className={linkBase}>
                  <Icon size={13} />
                  <span>{topic.shortTitle}</span>
                </NavLink>
              )
            })}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-1">
            <NavLink to="/learning-experience" className={iconBtn} title="Mulai Belajar (Learning Experience)">
              <GraduationCap size={17} />
            </NavLink>

            {isAuthenticated ? (
              <NavLink to="/account" className={iconBtn} title="Account">
                <UserCircle size={17} />
              </NavLink>
            ) : (
              <NavLink to="/login" className={iconBtn} title="Login / Register">
                <UserCircle size={17} />
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink to="/admin" className={iconBtn} title="Panel Admin">
                <ShieldCheck size={17} />
              </NavLink>
            )}

            <ThemeToggle />

            <motion.button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
              whileTap={{ scale: 0.92 }}
              className="grid size-10 place-items-center rounded-full border border-zinc-200/60 bg-white/80 text-zinc-600 backdrop-blur transition-all duration-300 hover:border-transparent hover:bg-gradient-to-tr hover:from-pink-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:border-transparent dark:hover:from-lime-400 dark:hover:to-emerald-500 dark:hover:text-zinc-950 dark:hover:shadow-emerald-500/20 lg:hidden"
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 w-full max-w-7xl px-4 sm:px-6 lg:hidden"
          >
            <div className="grid max-h-[70vh] gap-1 overflow-y-auto rounded-2xl border border-zinc-200/60 bg-white/95 p-2 shadow-xl backdrop-blur-2xl dark:border-zinc-800/50 dark:bg-zinc-950/95">
              <NavLink to="/learning-experience" onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                    isActive ? 'border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                  }`
                }
              >
                <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><GraduationCap size={15} /></span>
                <span>Learning Experience</span>
                <span className="ml-auto text-[10px] font-bold text-purple-500">NEW</span>
              </NavLink>

              {isAuthenticated ? (
                <NavLink to="/account" onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                      isActive ? 'border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                    }`
                  }
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><UserCircle size={15} /></span>
                  <span>Account</span>
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                      isActive ? 'border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                    }`
                  }
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><UserCircle size={15} /></span>
                  <span>Login / Register</span>
                </NavLink>
              )}

              <div className="my-0.5 border-t border-zinc-100 dark:border-zinc-800" />

              {topics.map((topic) => {
                const Icon = iconMap[topic.icon] || BookOpen
                return (
                  <NavLink key={topic.slug} to={topic.route} onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                        isActive ? 'border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'border-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                      }`
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><Icon size={15} /></span>
                      <span>{topic.title}</span>
                    </span>
                    <span className="text-[11px] font-bold opacity-40">{topic.code}</span>
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar