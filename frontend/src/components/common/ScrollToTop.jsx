import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 420)

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll ke atas"
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 text-white shadow-xl shadow-pink-500/25 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 active:scale-95 dark:from-lime-400 dark:to-emerald-500 dark:text-zinc-950 dark:shadow-emerald-500/25 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'pointer-events-none translate-y-4 opacity-0 scale-90'
      }`}
    >
      <ArrowUp size={21} />
    </button>
  )
}

export default ScrollToTop
