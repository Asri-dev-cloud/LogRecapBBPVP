import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FilePlus2, ListChecks, TerminalSquare, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuizManager from '../components/quiz/QuizManager'
import MaterialManager from '../components/material/MaterialManager'
import { topics } from './topicRegistry'

const TABS = [
  { key: 'quiz', label: 'Buat Quiz', icon: ListChecks },
  { key: 'material', label: 'Tambah Materi', icon: FilePlus2 },
  { key: 'terminal', label: 'Tambah Terminal', icon: TerminalSquare },
]

const AdminPanel = () => {
  const [tab, setTab] = useState('quiz')
  const [topicSlug, setTopicSlug] = useState(topics[0]?.slug || 'html')

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link
            to="/learning-experience"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Kembali ke Learning
          </Link>

          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Panel Admin</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Kelola quiz, materi, dan terminal — semua perubahan tersimpan di server dan muncul untuk seluruh user.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mb-5 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                  active
                    ? 'bg-zinc-900 text-white shadow dark:bg-white dark:text-zinc-900'
                    : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
        </div>

        {(tab === 'material' || tab === 'terminal') && (
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Topik tujuan
            </label>
            <select
              value={topicSlug}
              onChange={(e) => setTopicSlug(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-pink-400 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white"
            >
              {topics.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {tab === 'quiz' && <QuizManager onClose={() => {}} onQuizUpdate={() => {}} />}

        {(tab === 'material' || tab === 'terminal') && (
          <MaterialManager topicSlug={topicSlug} onSectionsChange={() => {}} />
        )}
      </div>
    </div>
  )
}

export default AdminPanel