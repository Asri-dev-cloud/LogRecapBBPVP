import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.92 }}
      className="grid size-9 place-items-center rounded-xl border border-zinc-200/60 bg-white/80 text-zinc-600 backdrop-blur transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900 dark:border-zinc-700/50 dark:bg-zinc-800/40 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-700/60 dark:hover:text-white"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </motion.button>
  )
}

export default ThemeToggle