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
      whileTap={{ scale: 0.92 }}
      className="grid size-10 place-items-center rounded-full border border-zinc-200/60 bg-white/80 text-zinc-600 backdrop-blur transition-all duration-300 hover:border-transparent hover:bg-gradient-to-tr hover:from-pink-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:border-transparent dark:hover:from-lime-400 dark:hover:to-emerald-500 dark:hover:text-zinc-950 dark:hover:shadow-emerald-500/20"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </motion.button>
  )
}

export default ThemeToggle