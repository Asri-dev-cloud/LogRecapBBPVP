import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Atom,
  BookOpenCheck,
  Brush,
  Database,
  FileCode2,
  KeyRound,
  Network,
  Palette,
  Rocket,
  Server,
  Sparkles,
  SquareTerminal,
  Wind,
} from 'lucide-react'
import PageTransition from '../components/common/PageTransition'
import Button from '../components/ui/Button'
import { topics } from './topicRegistry'

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

const paletteBySlug = {
  uiux: 'from-pink-500 via-purple-500 to-rose-500',
  html: 'from-orange-500 via-red-500 to-yellow-500',
  'css-vanilla': 'from-pink-500 via-rose-500 to-purple-500',
  nodejs: 'from-emerald-500 via-teal-500 to-green-500',
  'modern-js': 'from-yellow-500 via-orange-500 to-amber-500',
  dom: 'from-purple-500 via-indigo-500 to-blue-500',
  tailwind: 'from-cyan-500 via-sky-500 to-blue-500',
  react: 'from-sky-500 via-blue-500 to-indigo-500',
  'hostinger-vps': 'from-green-500 via-emerald-500 to-teal-500',
  putty: 'from-slate-500 via-zinc-500 to-neutral-500',
  'mysql-workbench': 'from-blue-500 via-indigo-500 to-cyan-500',
  'backend-express': 'from-purple-500 via-indigo-500 to-cyan-550',
}

const cardMetaBySlug = {
  uiux: {
    label: 'Design sprint',
    stats: '5 topik',
    description: 'Riset user, problem statement, ideasi, prototype, dan testing.',
    tags: ['Empathize', 'Define', 'Prototype'],
  },
  html: {
    label: 'Markup dasar',
    stats: '7 topik',
    description: 'Struktur dokumen, form, iframe, input, dan semantic HTML.',
    tags: ['Structure', 'Form', 'Semantic'],
  },
  'css-vanilla': {
    label: 'Visual system',
    stats: '4 topik',
    description: 'Selector, box model, cascade, specificity, dan cara debug style.',
    tags: ['Selector', 'Cascade', 'Box Model'],
  },
  nodejs: {
    label: 'Runtime',
    stats: '5 topik',
    description: 'Node.js, npm, CLI, dan pondasi JavaScript untuk backend.',
    tags: ['Node.js', 'npm', 'CLI'],
  },
  'modern-js': {
    label: 'ES6+ flow',
    stats: '6 topik',
    description: 'Variable modern, module, async/await, promise, dan array method.',
    tags: ['Module', 'Async', 'Array'],
  },
  dom: {
    label: 'Browser API',
    stats: '6 topik',
    description: 'DOM tree, query selector, manipulasi element, form, dan event.',
    tags: ['Element', 'Event', 'Form'],
  },
  tailwind: {
    label: 'Utility-first',
    stats: '5 topik',
    description: 'Utility class, responsive design, dark mode, dan workflow komponen.',
    tags: ['Utility', 'Grid', 'Dark Mode'],
  },
  react: {
    label: 'Component lab',
    stats: '7 topik',
    description: 'Vite setup, JSX, props, state, effect, dan render list.',
    tags: ['JSX', 'State', 'Effect'],
  },
  'hostinger-vps': {
    label: 'Deploy path',
    stats: '6 topik',
    description: 'Order VPS, SSH, Nginx, domain, SSL, dan deploy aplikasi.',
    tags: ['VPS', 'Nginx', 'SSL'],
  },
  putty: {
    label: 'SSH tools',
    stats: '4 topik',
    description: 'Akses VPS dari Windows, command dasar, upload, dan deploy.',
    tags: ['SSH', 'Linux', 'Upload'],
  },
  'mysql-workbench': {
    label: 'Data studio',
    stats: '6 topik',
    description: 'Koneksi database, tipe data, function, operator, join, dan studi kasus.',
    tags: ['SQL', 'Join', 'Schema'],
  },
  'backend-express': {
    label: 'API Server',
    stats: '5 topik',
    description: 'Membuat server Express, DB pool DB.mjs, REST client, dan integrasi WebStorm.',
    tags: ['Express', 'MySQL', 'REST Client'],
  },
}

const schemeClassesBySlug = {
  uiux: 'hover:border-pink-500/50 hover:shadow-pink-500/10 dark:hover:border-pink-500/40 dark:hover:shadow-pink-500/15 text-pink-500',
  html: 'hover:border-orange-500/50 hover:shadow-orange-500/10 dark:hover:border-orange-500/40 dark:hover:shadow-orange-500/15 text-orange-500',
  'css-vanilla': 'hover:border-pink-500/50 hover:shadow-pink-500/10 dark:hover:border-pink-500/40 dark:hover:shadow-pink-500/15 text-pink-500',
  nodejs: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-500/15 text-emerald-500',
  'modern-js': 'hover:border-yellow-500/50 hover:shadow-yellow-500/10 dark:hover:border-yellow-500/40 dark:hover:shadow-yellow-500/15 text-yellow-500',
  dom: 'hover:border-purple-500/50 hover:shadow-purple-500/10 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/15 text-purple-500',
  tailwind: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10 dark:hover:border-cyan-500/40 dark:hover:shadow-cyan-500/15 text-cyan-500',
  react: 'hover:border-sky-500/50 hover:shadow-sky-500/10 dark:hover:border-sky-500/40 dark:hover:shadow-sky-500/15 text-sky-500',
  'hostinger-vps': 'hover:border-emerald-500/50 hover:shadow-emerald-500/10 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-500/15 text-emerald-500',
  putty: 'hover:border-slate-500/50 hover:shadow-slate-500/10 dark:hover:border-slate-500/40 dark:hover:shadow-slate-500/15 text-slate-400',
  'mysql-workbench': 'hover:border-blue-500/50 hover:shadow-blue-500/10 dark:hover:border-blue-500/40 dark:hover:shadow-blue-500/15 text-blue-500',
  'backend-express': 'hover:border-purple-500/50 hover:shadow-purple-500/10 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/15 text-purple-500'
}

const stats = [
  { value: topics.length, label: 'Materi' },
  { value: '80+', label: 'Subtopik' },
  { value: '2026', label: 'Recap' },
]

const Home = () => {
  return (
    <PageTransition className="pb-16">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/70 px-5 py-12 shadow-xl shadow-zinc-900/5 dark:border-zinc-800/60 dark:bg-zinc-900/25 sm:px-8 lg:px-12">
          <div className="absolute inset-0 soft-grid opacity-35" />
          <div className="absolute -left-20 -top-20 size-80 rounded-full bg-pink-500/10 blur-3xl opacity-60" />
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-blue-500/10 blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-1/3 size-96 rounded-full bg-purple-500/8 blur-3xl opacity-50" />

          <div className="relative">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.18em] text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-850 dark:bg-zinc-900/30 dark:text-zinc-300"
              >
                <BookOpenCheck size={14} />
                Portfolio Materi Web Development
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55 }}
                className="text-[2.2rem] xs:text-5xl font-black leading-none tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl"
              >
                LogbookBBPVP2
                <span className="block gradient-text mt-2">belajar web dev.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.55 }}
                className="mt-6 max-w-2xl text-sm font-semibold leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg"
              >
                Catatan belajar dari UI/UX, HTML, CSS, JavaScript, React, database, sampai
                deployment VPS. Semua materi dibuat ringkas, runtut, dan siap dibuka per topik.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.55 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button to="/html">Mulai Belajar</Button>
                <Button to="/react" variant="secondary" icon={Rocket}>
                  Lihat React
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.5 }}
                className="mt-9 grid max-w-xl grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left"
              >
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200 bg-white/80 px-2.5 sm:px-4 py-2.5 sm:py-3.5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <p className="text-xl sm:text-3xl font-black text-zinc-950 dark:text-white">{item.value}</p>
                    <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.14em] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-12 overflow-hidden py-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-50/50 via-white to-zinc-50 dark:from-zinc-950 dark:via-[#0c0d12]/50 dark:to-zinc-950" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,24,27,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:24px_24px] opacity-70" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 dark:text-pink-400">
                Daftar Materi
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
                Jelajahi Destinasi
              </h2>
            </div>
            <p className="max-w-xl text-sm font-semibold leading-7 text-zinc-600 dark:text-zinc-400 sm:text-right">
              Pilih jalur belajar yang ingin dibuka, dari pondasi tampilan sampai server dan
              database.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topics.map((topic, index) => {
              const Icon = iconMap[topic.icon] || BookOpenCheck
              const palette = paletteBySlug[topic.slug] || 'from-zinc-500 via-zinc-400 to-zinc-300'
              const meta = cardMetaBySlug[topic.slug]

              return (
                <motion.div
                  key={topic.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.045, duration: 0.45 }}
                  whileHover={{ y: -7, transition: { duration: 0.22 } }}
                  className="group h-full"
                >
                  <Link
                    to={topic.route}
                    className={`relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 p-4 shadow-lg shadow-zinc-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${schemeClassesBySlug[topic.slug]} hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/30`}
                  >
                    <div className={`absolute -right-20 -top-20 size-44 rounded-full bg-gradient-to-br ${palette} opacity-18 blur-2xl transition-opacity duration-300 group-hover:opacity-32`} />

                    <div
                      className={`relative h-36 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br ${palette} shadow-lg shadow-zinc-900/10`}
                    >
                      {topic.image && (
                        <img
                          src={topic.image}
                          alt={topic.imageAlt || topic.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${palette} opacity-[0.78] mix-blend-multiply`} />
                      <div className="absolute inset-0 bg-zinc-950/20" />
                      <div className="relative flex h-full flex-col justify-between p-5 text-white">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-85">
                            Logbook
                          </p>
                          <span className="rounded-full bg-white/22 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em]">
                            {meta.stats}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-4xl font-black uppercase leading-none drop-shadow">
                            {topic.shortTitle}
                          </h3>
                          <p className="mt-1 text-xs font-bold italic opacity-90">
                            from zero to code hero
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-5 flex items-start justify-between gap-4">
                      <span
                        className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${palette} text-zinc-950 shadow-lg shadow-zinc-900/10`}
                      >
                        <Icon size={24} />
                      </span>
                      <span className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
                        {topic.code}
                      </span>
                    </div>

                    <div className="relative mt-5 flex-1">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
                        {meta.label}
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                        {topic.title}
                      </h3>
                      <p className="mt-4 text-sm font-semibold leading-7 text-zinc-600 dark:text-zinc-400">
                        {meta.description}
                      </p>
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                      <span className="text-sm font-black text-zinc-950 dark:text-white">
                        Mulai eksplorasi
                      </span>
                      <span
                        className={`grid size-9 place-items-center rounded-full bg-gradient-to-br ${palette} text-zinc-950 transition-transform duration-300 group-hover:translate-x-1`}
                      >
                        <Rocket size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Home
