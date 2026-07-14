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

  return (
    <aside className="sticky top-24 z-20 rounded-2xl border border-zinc-200 bg-white/90 p-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Peta Materi
        </p>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-black text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          {filteredSections.length} Materi
        </span>
      </div>

      <nav className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
        {/* Tombol Materi Pa Septi */}
        {showMateriPaSepti && (
          <a
            href="#materi-pa-septi"
            onClick={(e) => handleScroll(e, 'materi-pa-septi')}
            className="group flex w-full items-center gap-3 rounded-xl border border-red-500/50 bg-red-50 px-3 py-2 text-left text-sm font-bold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-md dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-red-500 text-white transition-colors group-hover:bg-white group-hover:text-red-600">
              <Webhook size={14} />
            </span>
            <span className="line-clamp-2">Materi Pa Septi</span>
          </a>
        )}

        {/* Daftar Materi Utama */}
        {filteredSections.map((section, index) => (
          <a
            key={section.id || index}
            href={`#${section.id}`}
            onClick={(e) => handleScroll(e, section.id)}
            className="group flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-sm font-bold text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-white hover:text-zinc-950 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:border-lime-300/40 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-950 text-[11px] font-black text-white transition-colors group-hover:bg-pink-500 dark:bg-white dark:text-zinc-950 dark:group-hover:bg-lime-300">
              {index + 1}
            </span>
            <span className="line-clamp-2">{section.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar