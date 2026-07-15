import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  FileCode2,
  Palette,
  SquareTerminal,
  Atom,
  Server,
  Wind,
  Database,
  Network,
  Zap,
  Lock,
  ShieldCheck,
  Upload,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Passcode gerbang UI (sama seperti sebelumnya). Validasi asli tetap
// di backend (x-admin-passcode header). Ini hanya gerbang tampilan.
const ADMIN_PASSCODE = '20424014';

const iconOptions = [
  { value: 'FileCode2', label: 'HTML', Icon: FileCode2 },
  { value: 'Palette', label: 'CSS', Icon: Palette },
  { value: 'SquareTerminal', label: 'JavaScript', Icon: SquareTerminal },
  { value: 'Atom', label: 'React', Icon: Atom },
  { value: 'Server', label: 'Node.js', Icon: Server },
  { value: 'Wind', label: 'Tailwind', Icon: Wind },
  { value: 'Database', label: 'Database', Icon: Database },
  { value: 'Network', label: 'DOM', Icon: Network },
];

const emptyForm = () => ({
  title: '',
  description: '',
  difficulty: 'Easy',
  totalQuestions: 5,
  icon: 'Zap',
  category: 'general',
});

const QuizManager = ({ onClose, onQuizUpdate }) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [authenticated, setAuthenticated] = useState(user?.role === 'admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      setAuthenticated(true);
    }
  }, [user]);
  const [formData, setFormData] = useState(emptyForm());
  const [questions, setQuestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(`${API_BASE}/quiz`);
      const data = await res.json();
      const serverQuizzes = data.quizzes || [];

      const STORAGE_KEY = 'logrecap_custom_quizzes';
      let localQuizzes = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        localQuizzes = stored ? JSON.parse(stored) : [];
      } catch {}

      const localIds = new Set(localQuizzes.map((q) => q.id));
      const filteredServer = serverQuizzes.filter((q) => !localIds.has(q.id));
      setQuizzes([...filteredServer, ...localQuizzes]);
    } catch {
      const STORAGE_KEY = 'logrecap_custom_quizzes';
      let localQuizzes = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        localQuizzes = stored ? JSON.parse(stored) : [];
      } catch {}
      setQuizzes(localQuizzes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSCODE) {
      setAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Invalid admin password');
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateOption = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.map((opt, j) => (j === oIndex ? value : opt)) }
          : q
      )
    );
  };

  const parseCSV = (text) => {
    const result = [];
    let row = [''];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push('');
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        result.push(row.map(val => val.trim()));
        row = [''];
      } else {
        row[row.length - 1] += char;
      }
    }
    if (row.length > 1 || row[0] !== '') {
      result.push(row.map(val => val.trim()));
    }
    return result;
  };

  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text !== 'string') return;
      const parsedRows = parseCSV(text);
      if (parsedRows.length < 2) return;
      const imported = [];
      const colMap = {};
      const parts = parsedRows[0].map((h) => h.toLowerCase());
      parts.forEach((p, i) => {
        if (p.includes('question') || p.includes('pertanyaan') || p.includes('soal')) colMap.question = i;
        else if (p === 'a' || p === 'option1' || p === 'opt1') colMap.opt1 = i;
        else if (p === 'b' || p === 'option2' || p === 'opt2') colMap.opt2 = i;
        else if (p === 'c' || p === 'option3' || p === 'opt3') colMap.opt3 = i;
        else if (p === 'd' || p === 'option4' || p === 'opt4') colMap.opt4 = i;
        else if (p.includes('correct') || p.includes('answer') || p.includes('jawaban') || p.includes('benar')) colMap.correct = i;
      });

      for (let i = 1; i < parsedRows.length; i++) {
        const cols = parsedRows[i];
        if (cols.length <= 1 && cols[0] === '') continue; // Skip empty rows
        if (colMap.question === undefined || !cols[colMap.question]) continue;
        const q = { question: cols[colMap.question] || '', options: ['', '', '', ''], correct: 0 };
        if (colMap.opt1 !== undefined) q.options[0] = cols[colMap.opt1] || '';
        if (colMap.opt2 !== undefined) q.options[1] = cols[colMap.opt2] || '';
        if (colMap.opt3 !== undefined) q.options[2] = cols[colMap.opt3] || '';
        if (colMap.opt4 !== undefined) q.options[3] = cols[colMap.opt4] || '';
        if (colMap.correct !== undefined) {
          const ans = (cols[colMap.correct] || '').toUpperCase();
          if (ans === 'A' || ans === '0') q.correct = 0;
          else if (ans === 'B' || ans === '1') q.correct = 1;
          else if (ans === 'C' || ans === '2') q.correct = 2;
          else if (ans === 'D' || ans === '3') q.correct = 3;
        }
        imported.push(q);
      }

      if (imported.length > 0) {
        setQuestions((prev) => [...prev, ...imported]);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "soal,a,b,c,d,jawaban\n"
      + "\"Siapakah pencipta JavaScript?\",\"Brendan Eich\",\"John Resig\",\"Guido van Rossum\",\"Bjarne Stroustrup\",\"A\"\n"
      + "\"Apa singkatan dari HTML?\",\"Hyper Text Markup Language\",\"High Tech Markup Language\",\"Hyper Text Machine Language\",\"Hyper Text Multi Language\",\"A\"\n"
      + "\"Manakah CSS selector untuk id?\",\"#\",\"*\",\".\",\":\",\"A\"\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "templat_soal_quiz.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Judul wajib diisi.');
      return;
    }
    if (questions.length === 0) {
      setError('Minimal satu soal.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      ...formData,
      totalQuestions: questions.length,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options,
        correct: q.correct,
      })),
    };

    try {
      const url = editingQuiz ? `${API_BASE}/quiz/${editingQuiz.id}` : `${API_BASE}/quiz`;
      const method = editingQuiz ? 'PUT' : 'POST';
      let success = false;

      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'x-admin-passcode': ADMIN_PASSCODE,
            'Authorization': `Bearer ${localStorage.getItem('logrecap_token') || ''}`,
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          success = true;
        } else {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Gagal menyimpan quiz.');
        }
      } catch (netErr) {
        console.warn('Backend server offline, falling back to localStorage:', netErr);
        const STORAGE_KEY = 'logrecap_custom_quizzes';
        let localQuizzes = [];
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          localQuizzes = stored ? JSON.parse(stored) : [];
        } catch {}

        if (editingQuiz) {
          const idx = localQuizzes.findIndex((q) => q.id === editingQuiz.id);
          if (idx !== -1) {
            localQuizzes[idx] = { ...payload, id: editingQuiz.id };
          }
        } else {
          const newId = Date.now();
          localQuizzes.push({ ...payload, id: newId });
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localQuizzes));
        success = true;
      }

      if (success) {
        setShowForm(false);
        setEditingQuiz(null);
        setQuestions([]);
        setFormData(emptyForm());
        await fetchQuizzes();
        if (onQuizUpdate) onQuizUpdate();
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setEditingQuiz(null);
    setFormData(emptyForm());
    setQuestions([]);
    setError('');
  };

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      totalQuestions: quiz.totalQuestions,
      icon: quiz.icon || 'Zap',
      category: quiz.category || 'general',
    });
    setQuestions(
      (quiz.questions || []).map((q) => ({
        question: q.question || '',
        options: Array.isArray(q.options) && q.options.length === 4 ? [...q.options] : ['', '', '', ''],
        correct: typeof q.correct === 'number' ? q.correct : 0,
      }))
    );
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      try {
        await fetch(`${API_BASE}/quiz/${id}`, {
          method: 'DELETE',
          headers: { 
            'x-admin-passcode': ADMIN_PASSCODE,
            'Authorization': `Bearer ${localStorage.getItem('logrecap_token') || ''}`,
          },
        });
      } catch {}

      const STORAGE_KEY = 'logrecap_custom_quizzes';
      let localQuizzes = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        localQuizzes = stored ? JSON.parse(stored) : [];
      } catch {}
      const filtered = localQuizzes.filter((q) => q.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

      await fetchQuizzes();
      if (onQuizUpdate) onQuizUpdate();
    } catch {
      // ignore
    }
  };

  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Hard: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  };

  if (!authenticated) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-zinc-900/80">
        <div className="flex flex-col items-center gap-4 py-16 px-6 text-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg"><Lock size={28} /></div>
          <div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">Akses Admin</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Masukkan passcode admin untuk mengelola quiz</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="flex w-full max-w-xs flex-col gap-3">
            <input type="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }} placeholder="Passcode admin"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-center outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white" />
            {passwordError && <p className="text-xs font-medium text-red-500">{passwordError}</p>}
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 text-sm font-bold text-zinc-900 shadow-lg transition-all hover:shadow-xl">
              <span className="flex items-center justify-center gap-2"><ShieldCheck size={16} /> Buka</span>
            </button>
          </form>
          <button onClick={onClose} className="text-xs font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Batal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 dark:border-white/10 dark:bg-zinc-900/80">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-amber-500" /><h3 className="text-base font-black text-zinc-900 dark:text-white">Kelola Quiz (Admin)</h3></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl">
            <Plus size={14} /> Buat Quiz
          </button>
          <button type="button" onClick={downloadTemplate}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-150 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-zinc-800">
            Unduh Templat
          </button>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <Upload size={14} /> Impor CSV
            <input type="file" accept=".csv,.tsv,.txt" className="hidden" onChange={(e) => { resetForm(); setShowForm(true); handleCsvImport(e); }} />
          </label>
          <button type="button" onClick={onClose} className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-zinc-800">Tutup</button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-zinc-200 dark:border-white/10">
            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-amber-500/10 p-3.5 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 leading-relaxed font-semibold">
                💡 <b>Petunjuk Impor CSV:</b> Pastikan header kolom adalah <code className="bg-amber-500/15 px-1 rounded">soal, a, b, c, d, jawaban</code>. Baris berikutnya berisi pertanyaan Anda. Kolom <code className="bg-amber-500/15 px-1 rounded">jawaban</code> diisi huruf <code className="bg-amber-500/15 px-1 rounded">A, B, C, atau D</code> sesuai opsi yang benar.
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Judul</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Judul quiz"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Ikon Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setFormData((prev) => ({ ...prev, icon: opt.value, category: opt.label.toLowerCase() }))}
                        className={`grid size-9 place-items-center rounded-xl border text-xs transition-all ${formData.icon === opt.value ? 'border-blue-400 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-950/30 dark:text-blue-400' : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:border-white/10 dark:text-zinc-400'}`} title={opt.label}>
                        <opt.Icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi quiz" rows={2}
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-zinc-600 dark:text-zinc-400">Kesulitan</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleInputChange}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white">
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Soal ({questions.length})</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={downloadTemplate} className="flex items-center gap-1 rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                      Unduh Templat
                    </button>
                    <label className="flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                      <Upload size={12} /> Impor CSV
                      <input type="file" accept=".csv,.tsv,.txt" className="hidden" onChange={handleCsvImport} />
                    </label>
                    <button type="button" onClick={addQuestion} className="flex items-center gap-1 rounded-lg bg-zinc-100 px-3 py-1.5 text-[11px] font-bold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                      <Plus size={12} /> Tambah
                    </button>
                  </div>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {questions.map((q, qi) => (
                    <div key={qi} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-zinc-800/30">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[11px] font-bold text-zinc-400">S{qi + 1}</span>
                        <input type="text" value={q.question} onChange={(e) => updateQuestion(qi, 'question', e.target.value)} placeholder="Tulis soal"
                          className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium outline-none focus:border-blue-400 dark:border-white/10 dark:bg-zinc-800/50 dark:text-white" />
                        <button type="button" onClick={() => removeQuestion(qi)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, oi) => (
                          <button key={oi} type="button" onClick={() => updateQuestion(qi, 'correct', oi)}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all ${q.correct === oi ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-300' : 'border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-800/50'}`}>
                            <span className="font-bold text-zinc-400">{String.fromCharCode(65 + oi)}</span>
                            <input type="text" value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)} placeholder={`Opsi ${String.fromCharCode(65 + oi)}`}
                              className="flex-1 bg-transparent outline-none" onClick={(e) => e.stopPropagation()} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {error && <p className="text-sm font-bold text-red-500">{error}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={handleSave} disabled={saving}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60">
                  <Save size={14} /> {saving ? 'Menyimpan...' : editingQuiz ? 'Perbarui Quiz' : 'Buat Quiz'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); resetForm(); }}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-5 py-2.5 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-zinc-800">
                  <X size={14} /> Batal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {loading ? (
          <div className="flex items-center justify-center py-10"><div className="size-6 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-500" /></div>
        ) : quizzes.length === 0 ? (
          <div className="py-10 text-center text-sm text-zinc-400">Belum ada quiz. Klik "Buat Quiz" untuk membuat.</div>
        ) : (
          quizzes.map((quiz) => {
            const isExpanded = expandedId === quiz.id;
            const dColor = difficultyColors[quiz.difficulty] || difficultyColors.Easy;
            const IconComp = iconOptions.find((o) => o.value === quiz.icon)?.Icon || Zap;
            return (
              <div key={quiz.id} className="group">
                <div className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow"><IconComp size={16} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{quiz.title}</p>
                    <p className="truncate text-[11px] text-zinc-500">{quiz.description}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${dColor}`}>{quiz.difficulty}</span>
                  <span className="shrink-0 text-[11px] font-bold text-zinc-400">{quiz.totalQuestions} S</span>
                  <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" onClick={() => handleEdit(quiz)} className="grid size-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"><Pencil size={14} /></button>
                    <button type="button" onClick={() => handleDelete(quiz.id)} className="grid size-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"><Trash2 size={14} /></button>
                    <button type="button" onClick={() => setExpandedId(isExpanded ? null : quiz.id)} className="grid size-8 place-items-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
                        <p className="text-xs text-zinc-500 mb-2">{quiz.questions ? `${quiz.questions.length} soal tersimpan` : 'Soal tersimpan di server'}</p>
                        {quiz.questions && quiz.questions.slice(0, 3).map((q, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:bg-zinc-800/30 dark:text-zinc-400 mb-1">
                            <span className="font-bold text-zinc-400">S{i + 1}</span>
                            <span className="truncate">{q.question || 'Teks soal...'}</span>
                          </div>
                        ))}
                        {quiz.questions && quiz.questions.length > 3 && <p className="text-[11px] text-zinc-400 mt-1">+{quiz.questions.length - 3} lainnya</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default QuizManager;