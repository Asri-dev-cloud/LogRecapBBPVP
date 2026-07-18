import React from 'react'
import { Webhook } from 'lucide-react'

const Sidebar = ({ sections = [], topicSlug }) => {
  const showMateriPaSepti = topicSlug === 'mysql-workbench'
  
  // Filter supaya 'materi-pa-septi' tidak masuk ke daftar bernomor
  const filteredSections = sections.filter(
    (section) => section.id !== 'materi-pa-septi'
  )

  // Fungsi helper untuk scroll mulus
  const handleScroll = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // 🔥 penting
      })
    }
  }

  const colorSchemes = [
    { border: 'hover:border-pink-400/60 dark:hover:border-pink-500/40', bg: 'group-hover:bg-pink-500 group-hover:text-white', text: 'dark:group-hover:text-pink-300' },
    { border: 'hover:border-orange-400/60 dark:hover:border-orange-500/40', bg: 'group-hover:bg-orange-500 group-hover:text-white', text: 'dark:group-hover:text-orange-300' },
    { border: 'hover:border-blue-400/60 dark:hover:border-blue-500/40', bg: 'group-hover:bg-blue-500 group-hover:text-white', text: 'dark:group-hover:text-blue-300' },
    { border: 'hover:border-emerald-400/60 dark:hover:border-emerald-500/40', bg: 'group-hover:bg-emerald-500 group-hover:text-white', text: 'dark:group-hover:text-emerald-300' },
    { border: 'hover:border-purple-400/60 dark:hover:border-purple-500/40', bg: 'group-hover:bg-purple-500 group-hover:text-white', text: 'dark:group-hover:text-purple-300' },
    { border: 'hover:border-yellow-400/60 dark:hover:border-yellow-500/40', bg: 'group-hover:bg-yellow-500 group-hover:text-white', text: 'dark:group-hover:text-yellow-300' }
  ]

  return (
    <aside className="sticky top-24 z-20 rounded-3xl border border-zinc-200/50 bg-white/70 p-4 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-white/[0.04] dark:bg-[#090b0f]/75">
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
          Peta Materi
        </p>
        <span className="rounded-full bg-zinc-150/60 px-3 py-1 text-[11px] font-black text-zinc-600 dark:bg-white/5 dark:text-zinc-300">
          {filteredSections.length} Materi
        </span>
      </div>

      <nav className="grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
        {/* Tombol Materi Pa Septi */}
        {showMateriPaSepti && (
          <a
            href="#materi-pa-septi"
            onClick={(e) => handleScroll(e, 'materi-pa-septi')}
            className="group flex w-full items-center gap-3 rounded-xl border border-red-500/40 bg-red-50/50 px-3 py-2.5 text-left text-sm font-bold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-red-500 text-white transition-colors group-hover:bg-white group-hover:text-red-600">
              <Webhook size={14} />
            </span>
            <span className="line-clamp-2">Materi Pa Septi</span>
          </a>
        )}

        {/* Daftar Materi Utama */}
        {filteredSections.map((section, index) => {
          const scheme = colorSchemes[index % colorSchemes.length]
          return (
            <a
              key={section.id || index}
              href={`#${section.id}`}
              onClick={(e) => handleScroll(e, section.id)}
              className={`group flex w-full items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 px-3 py-2.5 text-left text-sm font-bold text-zinc-600 transition-all duration-300 hover:-translate-y-0.5 ${scheme.border} hover:bg-white hover:text-zinc-950 hover:shadow-lg dark:border-white/[0.02] dark:bg-zinc-950/20 dark:text-zinc-400 dark:hover:bg-zinc-950/50 dark:hover:text-white`}
            >
              <span className={`grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-950 text-[11px] font-black text-white transition-colors ${scheme.bg} dark:bg-zinc-900 dark:text-zinc-300`}>
                {index + 1}
              </span>
              <span className="line-clamp-2">{section.title}</span>
            </a>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar