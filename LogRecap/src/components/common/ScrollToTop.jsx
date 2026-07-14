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
      className={`fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full border border-zinc-200 bg-zinc-950 text-white shadow-2xl shadow-zinc-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-500 dark:border-white/10 dark:bg-white dark:text-zinc-950 dark:hover:bg-lime-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp size={21} />
    </button>
  )
}

export default ScrollToTop
