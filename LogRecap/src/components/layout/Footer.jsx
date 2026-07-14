import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Rocket, NotebookPen, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white/60 py-8 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-zinc-400">
        <div>
          <p className="font-bold text-zinc-900 dark:text-white">LogbookBBPVP2</p>
          <p>Portofolio materi belajar web development dari UI/UX sampai deployment.</p>
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/catatan"
              title="Klik Catatan"
              className="group inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <NotebookPen size={16} />
              Catatan
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </Link>
            <span className="inline-flex cursor-default items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
              <Rocket size={16} />
              Vite + React
            </span>
            <span className="inline-flex cursor-default items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
              <BookOpen size={16} />
              Ready
            </span>
          </div>
          <span className="pl-1 text-[11px] font-medium text-pink-500 dark:text-pink-400">
            Klik Catatan untuk buka halaman
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer