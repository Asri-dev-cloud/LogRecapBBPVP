# LogbookBBPVP2

Website logbook/portofolio materi belajar web development dari UI/UX, HTML, CSS, JavaScript, Tailwind, React, sampai deployment VPS, Putty, dan MySQL Workbench.

## Tech Stack

- React + Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- lucide-react
- react-syntax-highlighter

## Cara Menjalankan

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Struktur Konten

Konten materi utama sekarang ada langsung di file halaman masing-masing, misalnya:

```text
src/pages/HTML.jsx
src/pages/CSSVanilla.jsx
src/pages/DOM.jsx
```

Halaman materi merender object `topic` dan `material` lokal lewat `MaterialPage`. Daftar metadata untuk navbar dan Home ada di `src/pages/topicRegistry.js`.
