import React, { useEffect, useMemo, useState } from 'react'
import { Lock, Plus, Save, SquareTerminal, Trash2, X } from 'lucide-react'
import { readCustomMaterial, writeCustomMaterial } from '../../utils/customMaterialStorage'
import { useAuth } from '../../context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
// Passcode gerbang UI (sama seperti sebelumnya). Validasi asli tetap
// di backend (x-admin-passcode header). Ini hanya gerbang tampilan.
const ADMIN_PASSCODE = '20424014'

const createEmptyForm = (mode = 'material') => ({
  title: '',
  description: '',
  pointsText: '',
  language: mode === 'terminal' ? 'bash' : 'javascript',
  codeTitle: mode === 'terminal' ? 'Terminal tambahan' : 'Contoh kode',
  code: '',
})

const buildSection = (topicSlug, mode, form) => {
  const points = form.pointsText
    .split('\n')
    .map((point) => point.trim())
    .filter(Boolean)

  const baseSection = {
    id: `${topicSlug}-${mode}-${Date.now()}`,
    source: 'custom',
    type: mode,
    title: form.title.trim(),
    description: form.description.trim(),
    points,
  }

  if (mode === 'terminal') {
    return {
      ...baseSection,
      code: form.code,
      language: form.language || 'bash',
      codeTitle: form.codeTitle.trim() || 'Terminal tambahan',
    }
  }

  return baseSection
}

const MaterialManager = ({ topicSlug, onSectionsChange }) => {
  const { user } = useAuth()
  const [savedSections, setSavedSections] = useState(() => readCustomMaterial(topicSlug))
  const [isUnlocked, setIsUnlocked] = useState(user?.role === 'admin')
  const [pendingMode, setPendingMode] = useState(null)
  const [activeMode, setActiveMode] = useState(null)

  useEffect(() => {
    if (user?.role === 'admin') {
      setIsUnlocked(true)
    }
  }, [user])
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState('')
  const [form, setForm] = useState(createEmptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const isTerminalMode = activeMode === 'terminal'

  const helperText = useMemo(
    () =>
      isTerminalMode
        ? 'Isi command terminal, pilih bahasa, lalu simpan.'
        : 'Isi judul, deskripsi, dan poin materi. Satu poin ditulis per baris.',
    [isTerminalMode],
  )

  // Sinkronisasi section lokal (dari localStorage) ke parent.
  useEffect(() => {
    onSectionsChange(savedSections)
  }, [onSectionsChange, savedSections])

  // Ambil materi/terminal yang sudah ditambahkan admin dari backend
  // (tersimpan di server, jadi muncul untuk SEMUA user).
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/materials/${topicSlug}`)
        const data = await res.json()
        if (cancelled) return
        const serverSections = data.sections || []
        // Gabungkan dengan materi lokal (jika ada) lalu simpan ke localStorage
        // supaya tetap muncul setelah refresh tanpa perlu request ulang.
        const local = readCustomMaterial(topicSlug)
        const merged = [...serverSections, ...local]
        // Hindari duplikat berdasarkan id
        const seen = new Set()
        const unique = merged.filter((s) => {
          if (seen.has(s.id)) return false
          seen.add(s.id)
          return true
        })
        writeCustomMaterial(topicSlug, unique)
        setSavedSections(unique)
      } catch {
        // Biarkan materi lokal tetap tampil meski server offline
      }
    }
    load()
    return () => { cancelled = true }
  }, [topicSlug])

  const syncSavedSections = (nextSections) => {
    setSavedSections(nextSections)
    writeCustomMaterial(topicSlug, nextSections)
  }

  const openEditor = (mode) => {
    setForm(createEmptyForm(mode))
    setFormError('')

    if (isUnlocked) {
      setActiveMode(mode)
      return
    }

    setPendingMode(mode)
    setPasscode('')
    setPasscodeError('')
  }

  const closeEditor = () => {
    setActiveMode(null)
    setForm(createEmptyForm())
    setFormError('')
  }

  const closePasscode = () => {
    setPendingMode(null)
    setPasscode('')
    setPasscodeError('')
  }

  const handlePasscodeSubmit = (event) => {
    event.preventDefault()

    if (passcode !== ADMIN_PASSCODE) {
      setPasscodeError('Password salah.')
      return
    }

    setIsUnlocked(true)
    setActiveMode(pendingMode || 'material')
    closePasscode()
  }

  const handleSave = async (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      setFormError('Judul wajib diisi.')
      return
    }

    if (isTerminalMode && !form.code.trim()) {
      setFormError('Isi terminal wajib diisi.')
      return
    }

    setSaving(true)
    const section = buildSection(topicSlug, activeMode, form)

    try {
      // Simpan ke backend supaya muncul untuk SEMUA user.
      const res = await fetch(`${API_BASE}/materials/${topicSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': ADMIN_PASSCODE,
          'Authorization': `Bearer ${localStorage.getItem('logrecap_token') || ''}`,
        },
        body: JSON.stringify({
          title: section.title,
          description: section.description,
          type: section.type,
          points: section.points,
          code: section.code,
          language: section.language,
          codeTitle: section.codeTitle,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        // Gunakan daftar section terbaru dari server (sudah termasuk yang baru).
        const serverSections = data.sections || [section]
        syncSavedSections(serverSections)
      } else {
        // Fallback: simpan lokal saja bila server gagal.
        syncSavedSections([...savedSections, section])
      }
    } catch {
      // Fallback lokal bila server offline.
      syncSavedSections([...savedSections, section])
    } finally {
      setSaving(false)
      closeEditor()
    }
  }

  const handleDelete = async (sectionId) => {
    // Coba hapus di backend dulu (jika section berasal dari server).
    try {
      await fetch(`${API_BASE}/materials/${topicSlug}/${sectionId}`, {
        method: 'DELETE',
        headers: { 
          'x-admin-passcode': ADMIN_PASSCODE,
          'Authorization': `Bearer ${localStorage.getItem('logrecap_token') || ''}`,
        },
      })
    } catch {
      // abaikan error jaringan
    }
    // Hapus dari state lokal juga.
    const nextSections = savedSections.filter((section) => section.id !== sectionId)
    syncSavedSections(nextSections)
  }

  return (
    <section className="rounded-2xl border border-dashed border-pink-500/20 bg-[#09090b]/60 p-5 shadow-lg backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-left">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pink-400">
            Tambahan (Admin)
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Tambah materi atau terminal
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-zinc-400">
            Materi & terminal yang ditambahkan akan tersimpan di server dan muncul untuk semua user.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => openEditor('material')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-pink-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-500"
          >
            <Plus size={18} />
            Tambah Materi
          </button>
          <button
            type="button"
            onClick={() => openEditor('terminal')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-pink-500/20 bg-[#0c0d12] px-4 py-3 text-sm font-black text-zinc-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-500/60 hover:text-white"
          >
            <SquareTerminal size={18} />
            Tambah Terminal
          </button>
        </div>
      </div>

      {savedSections.length > 0 && (
        <div className="mt-5 grid gap-2">
          {savedSections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.05]"
            >
              <div>
                <p className="font-black text-zinc-950 dark:text-white">{section.title}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                  {section.type === 'terminal' ? 'Terminal' : 'Materi'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(section.id)}
                className="grid size-9 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                aria-label={`Hapus ${section.title}`}
                title="Hapus tambahan"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeMode && (
        <form onSubmit={handleSave} className="mt-6 grid gap-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-white/10 dark:bg-zinc-950/40">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {isTerminalMode ? 'Form Terminal' : 'Form Materi'}
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">{helperText}</p>
            </div>
            <button
              type="button"
              onClick={closeEditor}
              className="grid size-9 place-items-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Tutup form"
            >
              <X size={18} />
            </button>
          </div>

          <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Judul
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-lime-300"
              placeholder={isTerminalMode ? 'Contoh: Deploy lewat terminal' : 'Contoh: Materi tambahan'}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Deskripsi
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="min-h-24 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium leading-7 text-zinc-950 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-lime-300"
              placeholder="Tulis penjelasan singkat."
            />
          </label>

          {!isTerminalMode && (
            <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Poin Materi
              <textarea
                value={form.pointsText}
                onChange={(event) => setForm((current) => ({ ...current, pointsText: event.target.value }))}
                className="min-h-32 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium leading-7 text-zinc-950 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-lime-300"
                placeholder="Satu poin per baris."
              />
            </label>
          )}

          {isTerminalMode && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Bahasa Terminal
                  <input
                    value={form.language}
                    onChange={(event) => setForm((current) => ({ ...current, language: event.target.value }))}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-lime-300"
                    placeholder="bash"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Judul Terminal
                  <input
                    value={form.codeTitle}
                    onChange={(event) => setForm((current) => ({ ...current, codeTitle: event.target.value }))}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-lime-300"
                    placeholder="Terminal tambahan"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Isi Terminal
                <textarea
                  value={form.code}
                  onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))}
                  className="min-h-44 rounded-xl border border-zinc-200 bg-zinc-950 px-4 py-3 font-mono text-sm leading-7 text-zinc-100 outline-none transition-colors focus:border-pink-400 dark:border-white/10 dark:focus:border-lime-300"
                  placeholder="npm run build"
                />
              </label>
            </>
          )}

          {formError && <p className="text-sm font-bold text-red-500">{formError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-950 disabled:opacity-60 dark:bg-lime-300 dark:text-zinc-950 dark:hover:bg-white sm:w-fit"
          >
            <Save size={18} /> {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      )}

      {pendingMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 px-4 backdrop-blur-sm">
          <form
            onSubmit={handlePasscodeSubmit}
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Lock size={17} className="text-pink-300" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-300">
                Password Admin
              </p>
            </div>
            <div className="grid gap-3 p-5">
              <input
                type="password"
                value={passcode}
                onChange={(event) => {
                  setPasscode(event.target.value)
                  setPasscodeError('')
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-colors focus:border-pink-300"
                placeholder="Masukkan password"
                autoFocus
              />
              {passcodeError && <p className="text-sm font-bold text-red-300">{passcodeError}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={closePasscode}
                className="rounded-lg px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-pink-500 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-pink-400"
              >
                Buka
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default MaterialManager