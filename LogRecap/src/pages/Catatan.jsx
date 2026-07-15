import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Trash2,
  X,
  FileText,
  Image as ImageIcon,
  Table as TableIcon,
  Terminal as TerminalIcon,
  Lock,
  Upload,
  Rows3,
  Columns3,
} from 'lucide-react'

const STORAGE_KEY = 'logbookbbpvp2_catatan_v1'
const ADD_PASSWORD = '20424014'
const DELETE_PASSWORD = '20424014'

const TYPE_META = {
  text: {
    label: 'Teks',
    icon: FileText,
    badge: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  },
  photo: {
    label: 'Foto',
    icon: ImageIcon,
    badge: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300',
  },
  table: {
    label: 'Tabel',
    icon: TableIcon,
    badge: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
  },
  terminal: {
    label: 'Terminal',
    icon: TerminalIcon,
    badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
  },
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Gagal memuat catatan dari penyimpanan lokal', err)
    return []
  }
}

function persistNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (err) {
    console.error('Gagal menyimpan catatan ke penyimpanan lokal', err)
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/* ---------------------------------- */
/* Password gate modal                */
/* ---------------------------------- */

function PasswordGate({ title, description, onConfirm, onCancel }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === ADD_PASSWORD || value === DELETE_PASSWORD) {
      onConfirm()
    } else {
      setError('Password salah. Coba lagi.')
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Lock size={18} />
          </span>
          <div>
            <p className="font-bold text-zinc-900 dark:text-white">{title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Masukkan password"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
          />
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* Add note modal                     */
/* ---------------------------------- */

function emptyTable() {
  return { headers: ['Kolom 1', 'Kolom 2'], rows: [['', '']] }
}

function AddNoteModal({ onClose, onSave }) {
  const [type, setType] = useState('text')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [caption, setCaption] = useState('')
  const [terminal, setTerminal] = useState('')
  const [table, setTable] = useState(emptyTable())
  const [fileError, setFileError] = useState('')

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      setFileError('Ukuran foto maksimal 3MB agar tidak memenuhi penyimpanan browser.')
      return
    }
    setFileError('')
    const dataUrl = await fileToDataUrl(file)
    setPhoto(dataUrl)
  }

  const updateCell = (rowIdx, colIdx, value) => {
    setTable((prev) => {
      const rows = prev.rows.map((row, ri) =>
        ri === rowIdx ? row.map((cell, ci) => (ci === colIdx ? value : cell)) : row
      )
      return { ...prev, rows }
    })
  }

  const updateHeader = (colIdx, value) => {
    setTable((prev) => {
      const headers = prev.headers.map((h, i) => (i === colIdx ? value : h))
      return { ...prev, headers }
    })
  }

  const addRow = () => {
    setTable((prev) => ({ ...prev, rows: [...prev.rows, prev.headers.map(() => '')] }))
  }

  const addColumn = () => {
    setTable((prev) => ({
      headers: [...prev.headers, `Kolom ${prev.headers.length + 1}`],
      rows: prev.rows.map((row) => [...row, '']),
    }))
  }

  const removeRow = (rowIdx) => {
    setTable((prev) => ({ ...prev, rows: prev.rows.filter((_, i) => i !== rowIdx) }))
  }

  const removeColumn = (colIdx) => {
    setTable((prev) => ({
      headers: prev.headers.filter((_, i) => i !== colIdx),
      rows: prev.rows.map((row) => row.filter((_, i) => i !== colIdx)),
    }))
  }

  const canSave = useMemo(() => {
    if (!title.trim()) return false
    if (type === 'text') return text.trim().length > 0
    if (type === 'photo') return Boolean(photo)
    if (type === 'terminal') return terminal.trim().length > 0
    if (type === 'table') return table.headers.length > 0 && table.rows.length > 0
    return false
  }, [type, title, text, photo, terminal, table])

  const handleSave = () => {
    if (!canSave) return
    const base = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: title.trim(),
      createdAt: new Date().toISOString(),
    }
    let content
    if (type === 'text') content = { text: text.trim() }
    if (type === 'photo') content = { src: photo, caption: caption.trim() }
    if (type === 'terminal') content = { lines: terminal }
    if (type === 'table') content = table

    onSave({ ...base, content })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-zinc-950/50 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-white/10">
          <p className="font-bold text-zinc-900 dark:text-white">Tambah Catatan</p>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          {/* Type selector */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(TYPE_META).map(([key, meta]) => {
              const Icon = meta.icon
              const active = type === key
              return (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300'
                  }`}
                >
                  <Icon size={16} />
                  {meta.label}
                </button>
              )
            })}
          </div>

          {/* Title */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Judul
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul catatan"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Type-specific fields */}
          {type === 'text' && (
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Isi catatan
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Tulis bahasan atau materi di sini..."
                className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
              />
            </div>
          )}

          {type === 'photo' && (
            <div className="space-y-3">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Unggah foto
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-sm text-zinc-500 transition hover:border-zinc-400 dark:border-white/15 dark:bg-white/5 dark:text-zinc-400">
                <Upload size={20} />
                <span>Klik untuk memilih gambar (maks 3MB)</span>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
              {fileError && <p className="text-xs font-medium text-red-500">{fileError}</p>}
              {photo && (
                <img
                  src={photo}
                  alt="Pratinjau"
                  className="max-h-56 w-full rounded-xl border border-zinc-200 object-contain dark:border-white/10"
                />
              )}
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Keterangan foto (opsional)"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
              />
            </div>
          )}

          {type === 'terminal' && (
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Isi terminal
              </label>
              <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
                Awali baris dengan <code className="rounded bg-zinc-100 px-1 dark:bg-white/10">$</code> untuk perintah,
                baris lain dianggap output.
              </p>
              <textarea
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                rows={6}
                placeholder={'$ npm install\nadded 240 packages'}
                className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none transition focus:border-zinc-400"
              />
            </div>
          )}

          {type === 'table' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Isi tabel
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={addColumn}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                  >
                    <Columns3 size={14} /> Kolom
                  </button>
                  <button
                    onClick={addRow}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                  >
                    <Rows3 size={14} /> Baris
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-white/5">
                      {table.headers.map((h, ci) => (
                        <th key={ci} className="border-b border-zinc-200 p-1 dark:border-white/10">
                          <div className="flex items-center gap-1">
                            <input
                              value={h}
                              onChange={(e) => updateHeader(ci, e.target.value)}
                              className="w-full min-w-[90px] rounded-md bg-transparent px-2 py-1 text-xs font-bold text-zinc-700 outline-none focus:bg-white dark:text-zinc-200 dark:focus:bg-zinc-950"
                            />
                            {table.headers.length > 1 && (
                              <button
                                onClick={() => removeColumn(ci)}
                                className="shrink-0 rounded p-1 text-zinc-400 hover:text-red-500"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-zinc-100 last:border-0 dark:border-white/5">
                        {row.map((cell, ci) => (
                          <td key={ci} className="p-1">
                            <input
                              value={cell}
                              onChange={(e) => updateCell(ri, ci, e.target.value)}
                              className="w-full min-w-[90px] rounded-md bg-transparent px-2 py-1 text-sm text-zinc-700 outline-none focus:bg-white dark:text-zinc-300 dark:focus:bg-zinc-950"
                            />
                          </td>
                        ))}
                        <td className="w-8 p-1 text-center">
                          {table.rows.length > 1 && (
                            <button
                              onClick={() => removeRow(ri)}
                              className="rounded p-1 text-zinc-400 hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-zinc-200 px-6 py-4 dark:border-white/10">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Simpan Catatan
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* Note content renderer              */
/* ---------------------------------- */

function NoteContent({ note }) {
  if (note.type === 'text') {
    return <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{note.content.text}</p>
  }

  if (note.type === 'photo') {
    return (
      <div className="space-y-2">
        <img
          src={note.content.src}
          alt={note.title}
          className="w-full rounded-xl border border-zinc-200 object-cover dark:border-white/10"
        />
        {note.content.caption && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{note.content.caption}</p>
        )}
      </div>
    )
  }

  if (note.type === 'terminal') {
    const lines = note.content.lines.split('\n')
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">
          {lines.map((line, i) => {
            const isCommand = line.trim().startsWith('$')
            return (
              <div key={i} className={isCommand ? 'text-green-400' : 'text-zinc-400'}>
                {line || '\u00A0'}
              </div>
            )
          })}
        </pre>
      </div>
    )
  }

  if (note.type === 'table') {
    return (
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-white/5">
              {note.content.headers.map((h, i) => (
                <th
                  key={i}
                  className="border-b border-zinc-200 p-2 text-left text-xs font-bold text-zinc-700 dark:border-white/10 dark:text-zinc-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {note.content.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-zinc-100 last:border-0 dark:border-white/5">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-2 text-zinc-600 dark:text-zinc-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}

/* ---------------------------------- */
/* Main page                          */
/* ---------------------------------- */

const Catatan = () => {
  const [notes, setNotes] = useState(() => loadNotes())
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    persistNotes(notes)
  }, [notes])

  const handleAddClick = () => {
    setShowAddModal(true)
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      setNotes((prev) => prev.filter((n) => n.id !== id))
    }
  }

  const handleSaveNote = (note) => {
    setNotes((prev) => [note, ...prev])
    setShowAddModal(false)
  }

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [notes]
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 dark:bg-[#07080b]">
      {/* Background Decorative Glows */}
      <div className="absolute right-0 top-0 -z-10 size-[350px] rounded-full bg-pink-500/10 blur-[120px] dark:bg-pink-500/[0.07]" />
      <div className="absolute left-0 bottom-0 -z-10 size-[350px] rounded-full bg-lime-500/10 blur-[120px] dark:bg-lime-500/[0.07]" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        {/* Header Back Link */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/50 px-3.5 py-1.5 text-xs font-bold text-zinc-500 transition hover:bg-zinc-150 hover:text-zinc-800 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <ArrowLeft size={13} />
          Kembali ke Beranda
        </Link>

        {/* Dashboard Title & Action Button */}
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-zinc-250/70 bg-white/80 p-6 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/10 dark:bg-[#0a0c10]/90">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white sm:flex dark:bg-white dark:text-zinc-900">
              <FileText size={20} />
            </span>
            <div className="text-left">
              <h1 className="text-2xl font-black text-zinc-950 sm:text-3xl dark:text-white">Catatan</h1>
              <p className="mt-1 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                Log bahasan, foto, tabel, dan cuplikan terminal selama belajar web development.
              </p>
              {notes.length > 0 && (
                <div className="mt-2 inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-3xs font-black uppercase tracking-wider text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
                  {notes.length} Catatan Tersimpan
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-500/20 transition-all hover:shadow-xl hover:shadow-pink-500/30 active:scale-[0.98]"
          >
            <Plus size={16} />
            Tambah Catatan
          </button>
        </div>

        {/* Notes grid */}
        {sortedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-250 bg-white/50 px-6 py-24 text-center dark:border-white/10 dark:bg-[#0a0c10]/40">
            <NotebookEmptyIcon />
            <p className="mt-4 text-base font-black text-zinc-800 dark:text-zinc-200">Belum ada catatan</p>
            <p className="mt-1.5 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
              Klik &ldquo;Tambah Catatan&rdquo; untuk mulai mencatat bahasan kuis, foto, tabel, atau cuplikan terminal.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sortedNotes.map((note) => {
              const meta = TYPE_META[note.type]
              const Icon = meta?.icon ?? FileText
              return (
                <div
                  key={note.id}
                  className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.08)] dark:border-white/10 dark:bg-[#090b0f]/80 dark:hover:border-pink-500/40"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-zinc-150 pb-3 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${meta?.badge ?? 'bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200'}`}
                      >
                        <Icon size={16} />
                      </span>
                      <div className="text-left">
                        <p className="font-black leading-snug text-zinc-900 dark:text-white">{note.title}</p>
                        <p className="text-[10px] font-semibold text-zinc-400 mt-0.5">{formatDate(note.createdAt)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(note.id)}
                      className="shrink-0 rounded-xl border border-zinc-200/50 p-1.5 text-zinc-400 transition hover:border-red-500/20 hover:bg-red-50 hover:text-red-500 dark:border-white/5 dark:hover:bg-red-500/10"
                      title="Hapus catatan"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <NoteContent note={note} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddNoteModal onClose={() => setShowAddModal(false)} onSave={handleSaveNote} />
      )}
    </div>
  )
}

function NotebookEmptyIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/10">
      <FileText size={24} />
    </span>
  )
}

export default Catatan