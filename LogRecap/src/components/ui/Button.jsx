import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Button = ({ children, to, icon: Icon = ArrowRight, variant = 'primary', className = '' }) => {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-zinc-950'
  const variants = {
    primary:
      'relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35',
    secondary:
      'border-2 border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-purple-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-300 dark:hover:border-purple-500/50 dark:hover:bg-zinc-800/50',
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
