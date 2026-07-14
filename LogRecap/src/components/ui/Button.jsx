import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Button = ({ children, to, icon: Icon = ArrowRight, variant = 'primary', className = '' }) => {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 dark:focus:ring-offset-zinc-950'
  const variants = {
    primary:
      'relative overflow-hidden bg-gradient-to-r from-pink-500 via-lime-400 to-cyan-500 text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40',
    secondary:
      'border-2 border-zinc-300 bg-white text-zinc-900 shadow-lg shadow-zinc-900/5 hover:border-pink-400 hover:bg-zinc-50 dark:border-white/20 dark:bg-white/8 dark:text-white dark:hover:border-lime-300/50 dark:hover:bg-white/12',
  }

  const content = (
    <>
      <span>{children}</span>
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
        <Icon size={18} />
      </span>
    </>
  )

  if (to) {
    return (
      <div className="group transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
        <Link to={to} className={`${baseClass} ${variants[variant]} ${className}`}>
          {content}
        </Link>
      </div>
    )
  }

  return (
    <button
      type="button"
      className={`${baseClass} ${variants[variant]} ${className} group hover:scale-[1.03] active:scale-[0.98]`}
    >
      {content}
    </button>
  )
}

export default Button
