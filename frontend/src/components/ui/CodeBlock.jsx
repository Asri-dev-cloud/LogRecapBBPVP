import React, { useState, useRef, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Copy, Check, Pencil, Lock, Save, X, RotateCcw } from 'lucide-react'

// Kode akses untuk mode edit
const EDIT_PASSCODE = '20424014'

// Prefix key localStorage supaya tiap CodeBlock (dibedakan lewat
// prop `id`, atau kombinasi title+language kalau `id` tidak diisi)
// punya slot penyimpanan sendiri.
const STORAGE_PREFIX = 'codeblock:'

const getStorageKey = (id, title, language) =>
  `${STORAGE_PREFIX}${id || title}:${language}`

const readStoredCode = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const saved = window.localStorage.getItem(key)
    return saved !== null ? saved : fallback
  } catch (err) {
    console.error('Gagal membaca localStorage:', err)
    return fallback
  }
}

const writeStoredCode = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch (err) {
    console.error('Gagal menyimpan ke localStorage:', err)
  }
}

// Tema warna kustom untuk syntax highlighter.
// Warna dibuat manual supaya terminal tetap cocok dengan desain LogRecap.
const customTheme = {
  'code[class*="language-"]': {
    color: '#e4e4e7',
    background: 'transparent',
    fontFamily: '"Fira Code", "Courier New", monospace',
  },
  'pre[class*="language-"]': {
    color: '#e4e4e7',
    background: 'transparent',
  },
  comment: { color: '#71717a', fontStyle: 'italic' },
  prolog: { color: '#71717a', fontStyle: 'italic' },
  doctype: { color: '#71717a', fontStyle: 'italic' },
  cdata: { color: '#71717a', fontStyle: 'italic' },

  punctuation: { color: '#a1a1aa' },

  // Ungu: angka, konstanta, boolean.
  property: { color: '#c084fc' },
  tag: { color: '#f472b6' },
  boolean: { color: '#c084fc' },
  number: { color: '#c084fc' },
  constant: { color: '#c084fc' },
  symbol: { color: '#c084fc' },
  deleted: { color: '#f87171' },

  // Hijau: string.
  selector: { color: '#4ade80' },
  'attr-name': { color: '#4ade80' },
  string: { color: '#4ade80' },
  char: { color: '#4ade80' },
  builtin: { color: '#4ade80' },
  inserted: { color: '#4ade80' },

  // Pink: operator, entity, variabel.
  operator: { color: '#f472b6' },
  entity: { color: '#f472b6', cursor: 'help' },
  url: { color: '#f472b6' },
  variable: { color: '#f472b6' },

  // Biru: keyword dan at-rule.
  atrule: { color: '#60a5fa' },
  'attr-value': { color: '#60a5fa' },
  keyword: { color: '#60a5fa' },

  // Kuning/oranye: function dan class-name.
  function: { color: '#fbbf24' },
  'class-name': { color: '#fbbf24' },

  regex: { color: '#fb923c' },
  important: { color: '#fb923c', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
}

const CodeBlock = ({ code = '', language = 'javascript', title = 'Contoh kode', id, onSave }) => {
  const storageKey = getStorageKey(id, title, language)

  const [copied, setCopied] = useState(false)
  const [currentCode, setCurrentCode] = useState(() => readStoredCode(storageKey, code))
  const [draftCode, setDraftCode] = useState(() => readStoredCode(storageKey, code))
  const [isEditing, setIsEditing] = useState(false)
  const [showPasscodeModal, setShowPasscodeModal] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [prevPropCode, setPrevPropCode] = useState(code)
  const [prevStorageKey, setPrevStorageKey] = useState(storageKey)
  const textareaRef = useRef(null)
  const passcodeInputRef = useRef(null)

  // Sinkronkan prop `code` atau storage key ke state internal, lalu tetap
  // pakai versi tersimpan di localStorage kalau ada. Dilakukan saat render
  // supaya tidak memicu cascading render. Ini pola yang
  // direkomendasikan React untuk "adjusting state based on a prop change".
  if (code !== prevPropCode || storageKey !== prevStorageKey) {
    setPrevPropCode(code)
    setPrevStorageKey(storageKey)
    const next = readStoredCode(storageKey, code)
    setCurrentCode(next)
    setDraftCode(next)
  }

  useEffect(() => {
    if (showPasscodeModal && passcodeInputRef.current) {
      passcodeInputRef.current.focus()
    }
  }, [showPasscodeModal])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  if (!code && !currentCode) {
    return null
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openPasscodeModal = () => {
    setPasscodeInput('')
    setPasscodeError(false)
    setShowPasscodeModal(true)
  }

  const closePasscodeModal = () => {
    setShowPasscodeModal(false)
    setPasscodeInput('')
    setPasscodeError(false)
  }

  const handlePasscodeSubmit = (e) => {
    e.preventDefault()
    if (passcodeInput === EDIT_PASSCODE) {
      setDraftCode(currentCode)
      setShowPasscodeModal(false)
      setPasscodeInput('')
      setPasscodeError(false)
      setIsEditing(true)
    } else {
      setPasscodeError(true)
    }
  }

  const handleSave = () => {
    setCurrentCode(draftCode)
    setIsEditing(false)
    writeStoredCode(storageKey, draftCode)
    if (onSave) onSave(draftCode)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  const handleResetToOriginal = () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey)
      } catch (err) {
        console.error('Gagal menghapus localStorage:', err)
      }
    }
    setCurrentCode(code)
    setDraftCode(code)
  }

  const handleCancelEdit = () => {
    setDraftCode(currentCode)
    setIsEditing(false)
  }

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/50 px-6 py-4 bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">{title}</span>
          {justSaved && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Tersimpan
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900/80 px-2.5 py-1 rounded-sm">
            {language}
          </span>

          {!isEditing ? (
            <>
              {currentCode !== code && (
                <button
                  type="button"
                  onClick={handleResetToOriginal}
                  className="rounded p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800/60 hover:text-amber-400"
                  title="Kembalikan ke kode asli"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={openPasscodeModal}
                className="rounded p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800/60 hover:text-blue-400"
                title="Edit kode (perlu kode akses)"
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800/60 hover:text-zinc-100"
                title="Copy code"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400 transition-colors duration-200 hover:bg-emerald-500/20"
                title="Simpan perubahan"
              >
                <Save size={14} />
                Simpan
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded p-1.5 text-zinc-400 transition-colors duration-200 hover:bg-zinc-800/60 hover:text-red-400"
                title="Batal"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Code Container */}
      <div className="overflow-x-auto bg-zinc-950">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={draftCode}
            onChange={(e) => setDraftCode(e.target.value)}
            spellCheck={false}
            className="w-full min-h-[200px] resize-y bg-transparent px-6 py-6 text-sm leading-relaxed text-zinc-100 outline-none"
            style={{
              fontFamily: '"Fira Code", "Courier New", monospace',
              letterSpacing: '0.5px',
              lineHeight: '1.75',
            }}
          />
        ) : (
          <SyntaxHighlighter
            language={language}
            style={customTheme}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.75',
              fontFamily: '"Fira Code", "Courier New", monospace',
            }}
            codeTagProps={{
              style: {
                fontFamily: '"Fira Code", "Courier New", monospace',
                letterSpacing: '0.5px',
              },
            }}
            wrapLongLines={true}
            showLineNumbers={false}
          >
            {currentCode.trim()}
          </SyntaxHighlighter>
        )}
      </div>

      {/* Modal kode akses */}
      {showPasscodeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={closePasscodeModal}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handlePasscodeSubmit}
            className="w-full max-w-sm overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl"
          >
              <div className="flex items-center gap-3 border-b border-zinc-800/50 px-6 py-4">
                <Lock size={16} className="text-pink-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                  Masukkan Kode Akses
                </span>
              </div>
              <div className="px-6 py-5">
                <input
                  ref={passcodeInputRef}
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value)
                    setPasscodeError(false)
                  }}
                  placeholder="Kode akses"
                  className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors ${
                    passcodeError
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-zinc-800 focus:border-blue-500'
                  }`}
                />
                {passcodeError && (
                  <p className="mt-2 text-xs text-red-400">Kode akses salah. Coba lagi.</p>
                )}
              </div>
              <div className="flex justify-end gap-2 border-t border-zinc-800/50 px-6 py-4">
                <button
                  type="button"
                  onClick={closePasscodeModal}
                  className="rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  Buka
                </button>
              </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
