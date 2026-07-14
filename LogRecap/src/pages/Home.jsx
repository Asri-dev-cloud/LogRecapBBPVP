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
  uiux: 'from-rose-500 via-fuchsia-500 to-amber-300',
  html: 'from-orange-500 via-rose-500 to-fuchsia-500',
  'css-vanilla': 'from-sky-500 via-cyan-400 to-lime-300',
  nodejs: 'from-emerald-500 via-lime-400 to-teal-400',
  'modern-js': 'from-amber-300 via-orange-400 to-rose-500',
  dom: 'from-violet-500 via-fuchsia-500 to-pink-500',
  tailwind: 'from-cyan-400 via-sky-500 to-indigo-500',
  react: 'from-sky-400 via-cyan-400 to-blue-600',
  'hostinger-vps': 'from-lime-400 via-emerald-400 to-cyan-500',
  putty: 'from-zinc-700 via-emerald-500 to-lime-300',
  'mysql-workbench': 'from-blue-500 via-cyan-400 to-amber-300',
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
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-white via-emerald-50/70 to-sky-50 px-5 py-10 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:from-zinc-950 dark:via-emerald-950/20 dark:to-sky-950/20 sm:px-8 lg:px-12">
          <div className="absolute inset-0 soft-grid opacity-35" />
          <div className="absolute -right-28 top-12 size-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-lime-300/20 blur-3xl" />

          <div className="relative">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.08] dark:text-zinc-200"
              >
                <BookOpenCheck size={15} />
                Portfolio Materi Web Development
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55 }}
                className="text-5xl font-black leading-tight tracking-normal text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl"
              >
                LogbookBBPVP2
                <span className="block gradient-text">belajar web dev.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.55 }}
                className="mt-6 max-w-2xl text-base font-semibold leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg"
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
                className="mt-9 grid max-w-xl grid-cols-3 gap-3"
              >
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <p className="text-2xl font-black text-zinc-950 dark:text-white">{item.value}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#f7fee7,#ecfeff_46%,#fff7ed)] dark:bg-[linear-gradient(120deg,#050505,#082f49_46%,#1c1917)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,24,27,0.055)_1px,transparent_1px)] bg-[length:24px_24px] opacity-70 dark:opacity-20" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-lime-300">
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
                    className="relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/88 p-4 shadow-xl shadow-zinc-900/8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-2xl hover:shadow-zinc-900/14 dark:border-white/10 dark:bg-white/[0.065] dark:hover:border-white/20"
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
                      <span className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-zinc-500 dark:border-white/10 dark:bg-white/8 dark:text-zinc-400">
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
                          className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-zinc-600 dark:border-white/10 dark:bg-white/8 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-white/10">
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
