import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "H",
  "slug": "react",
  "title": "React",
  "shortTitle": "React",
  "route": "/react",
  "icon": "Atom",
  "summary": "Vite setup, component, props, state, effect, hooks, dan JSX.",
  "accent": "from-cyan-300 via-pink-300 to-lime-300"
}

const material = {
  "title": "React",
  "subtitle": "React adalah library JavaScript untuk membangun UI berbasis component. Materi ini fokus pada setup Vite dan konsep dasar React.",
  "overview": [
    "React memecah UI menjadi component yang dapat dipakai ulang, seperti menyusun tampilan dari balok-balok kecil.",
    "Vite memberi dev server cepat, hot module replacement, dan build modern.",
    "Konsep wajib React: JSX, component, props, state, effect, hooks, dan render list."
  ],
  "sections": [
    {
      "title": "Apa itu React dan Sejarahnya",
      "description": "ReactJS adalah library JavaScript untuk membangun antarmuka pengguna (user interface) di web maupun mobile.",
      "points": [
        "React memecah sebuah halaman web menjadi kumpulan component kecil yang dapat disusun dan dipakai ulang, mirip menyusun rumah dari balok-balok lego.",
        "ReactJS pertama kali dibuat oleh Jordan Walke, seorang insinyur di Facebook.",
        "Pada tahun 2011, React digunakan untuk membuat halaman News Feed Facebook.",
        "Setahun kemudian (2012), teknologi ini diadopsi oleh Instagram.",
        "Pada tahun 2013, ReactJS resmi dirilis ke publik sebagai proyek open-source.",
        "Berdasarkan data w3techs.com, React tercatat sebagai salah satu JavaScript library dengan pertumbuhan penggunaan tercepat di dunia."
      ],
      "image": true,
      "imageSrc": "/assets/r.png",
      "imageLabel": "SISIPKAN GAMBAR: ilustrasi Web Page tersusun dari Components (balok lego).",
      "id": "react-1-apa-itu-react-dan-sejarahnya"
    },
    {
      "title": "Install React dengan Vite",
      "description": "Vite adalah pilihan umum untuk memulai proyek React karena setup ringan dan cepat.",
      "points": [
        "Jalankan npm create vite@latest lalu pilih nama project dan template React.",
        "Masuk ke folder project, jalankan npm install, lalu npm run dev.",
        "Struktur dasar biasanya berisi src/main.jsx, src/App.jsx, package.json, dan vite.config.js.",
        "main.jsx merender root React ke element HTML dengan id root.",
        "App.jsx menjadi component utama yang dapat memuat routing dan layout."
      ],
      "language": "bash",
      "codeTitle": "Buat Project React",
      "code": "\nnpm create vite@latest logbook-bbpvp2 -- --template react\ncd logbook-bbpvp2\nnpm install\nnpm run dev",
      "id": "react-2-install-react-dengan-vite"
    },
    {
      "title": "Tabel CLI Vite",
      "description": "Script Vite didefinisikan di package.json. Command ini dipakai untuk development, build, dan preview hasil production.",
      "points": [
        "npm run dev: menjalankan development server dengan hot reload.",
        "npm run build: membuat bundle production ke folder dist.",
        "npm run preview: menjalankan preview lokal dari hasil build.",
        "npm install package-name: menambahkan dependency.",
        "npm install -D package-name: menambahkan devDependency seperti plugin atau tooling.",
        "Ctrl + C di terminal dipakai untuk menghentikan dev server."
      ],
      "language": "json",
      "codeTitle": "Script package.json",
      "code": "\n{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\"\n  }\n}",
      "id": "react-3-tabel-cli-vite"
    },
    {
      "title": "Keunggulan React",
      "description": "React banyak dipakai karena performanya, kemudahan belajar, dan ekosistemnya yang matang.",
      "points": [
        "Performa tinggi: React menggunakan Virtual DOM sehingga hanya bagian yang berubah yang di-render ulang, bukan seluruh halaman.",
        "Reusable components: UI dibangun dari komponen-komponen kecil yang dapat digunakan kembali di berbagai bagian aplikasi.",
        "JSX membuat penulisan kode HTML langsung di dalam JavaScript, sehingga komponen lebih praktis ditulis dan mudah dibaca.",
        "SEO-friendly: dengan Server-Side Rendering (SSR), React dapat menghasilkan HTML yang lebih mudah diakses mesin pencari.",
        "Mudah dipelajari karena berbasis JavaScript yang sudah familiar bagi banyak developer.",
        "Ekosistem yang matang dengan banyak library, tools, dan dokumentasi pendukung.",
        "Dapat dipakai membangun aplikasi mobile native untuk Android dan iOS menggunakan React Native."
      ],
      "id": "react-4-keunggulan-react"
    },
    {
      "title": "Component dan JSX",
      "description": "Component adalah function yang mengembalikan JSX. JSX terlihat seperti HTML, tetapi sebenarnya syntax JavaScript yang dikompilasi.",
      "points": [
        "Nama component harus diawali huruf kapital.",
        "JSX hanya boleh mengembalikan satu parent element atau fragment.",
        "Gunakan className, bukan class.",
        "Ekspresi JavaScript ditulis dalam kurung kurawal.",
        "Component rafce membuat struktur import React, function arrow, return JSX, dan export default."
      ],
      "language": "jsx",
      "codeTitle": "Component rafce",
      "code": "\nimport React from 'react'\n\nconst MaterialCard = () => {\n  return (\n    <article className=\"rounded-2xl border p-6\">\n      <h2>React Component</h2>\n    </article>\n  )\n}\n\nexport default MaterialCard",
      "id": "react-5-component-dan-jsx"
    },
    {
      "title": "Cara Kerja React dan Elemen Utama",
      "description": "React bekerja dengan memecah UI menjadi component kecil, lalu menggabungkannya menjadi tampilan yang lebih besar melalui Virtual DOM dan JSX.",
      "points": [
        "React memecah tampilan menjadi component kecil, misalnya Komponen Item pada News Feed, yang disusun ulang menjadi Komponen News Feed, lalu digabungkan ke dalam App.",
        "Komponen adalah blok bangunan dasar aplikasi ReactJS; setiap komponen merepresentasikan bagian tertentu dari UI dan dapat berbasis function atau class.",
        "Virtual DOM adalah representasi ringan dari DOM asli; ketika data/state dalam komponen berubah, React merender ulang komponen dan memperbarui Virtual DOM sebelum menyinkronkan perubahan minimal ke DOM asli di browser.",
        "JSX adalah syntax extension untuk JavaScript yang memungkinkan penulisan kode HTML di dalam kode JavaScript, sehingga kode ReactJS lebih mudah dibaca dan dipahami."
      ],
      "id": "react-6-cara-kerja-react-dan-elemen-utama"
    },
    {
      "title": "Props dan Render List",
      "description": "Props mengirim data dari parent ke child. Dengan map, data array dapat dirender menjadi daftar component.",
      "points": [
        "Props bersifat read-only di child component.",
        "Destructuring props membuat kode lebih ringkas.",
        "Saat render list, setiap item harus punya key stabil.",
        "Data-driven UI membuat halaman lebih mudah dikembangkan karena konten disimpan di data, bukan disalin manual."
      ],
      "language": "jsx",
      "codeTitle": "Props dan map",
      "code": "\nconst Card = ({ title }) => {\n  return <h2>{title}</h2>\n}\n\nconst App = () => {\n  const topics = ['HTML', 'CSS', 'React']\n\n  return topics.map((topic) => <Card key={topic} title={topic} />)\n}",
      "id": "react-7-props-dan-render-list"
    },
    {
      "title": "State dengan useState",
      "description": "State menyimpan data yang berubah dan memicu render ulang saat nilainya diperbarui.",
      "points": [
        "useState mengembalikan value dan function setter.",
        "Jangan mengubah array/object state secara langsung; buat salinan baru.",
        "Gunakan functional update saat nilai baru bergantung pada nilai sebelumnya.",
        "Contoh state: theme, status menu mobile, input form, filter, tab aktif, dan data API."
      ],
      "language": "jsx",
      "codeTitle": "useState",
      "code": "\nimport React, { useState } from 'react'\n\nconst Counter = () => {\n  const [count, setCount] = useState(0)\n\n  return (\n    <button onClick={() => setCount((current) => current + 1)}>\n      Count: {count}\n    </button>\n  )\n}\n\nexport default Counter",
      "id": "react-8-state-dengan-usestate"
    },
    {
      "title": "Effect dengan useEffect",
      "description": "useEffect menjalankan side effect seperti fetch data, membaca localStorage, mengatur event listener, atau sinkronisasi document title.",
      "points": [
        "Effect berjalan setelah render.",
        "Dependency array menentukan kapan effect dijalankan ulang.",
        "Return function dari effect dipakai untuk cleanup seperti melepas event listener.",
        "Hindari effect yang tidak perlu; banyak transformasi data bisa dihitung langsung saat render."
      ],
      "language": "jsx",
      "codeTitle": "useEffect",
      "code": "\nimport React, { useEffect, useState } from 'react'\n\nconst WindowWidth = () => {\n  const [width, setWidth] = useState(window.innerWidth)\n\n  useEffect(() => {\n    const handleResize = () => setWidth(window.innerWidth)\n    window.addEventListener('resize', handleResize)\n\n    return () => window.removeEventListener('resize', handleResize)\n  }, [])\n\n  return <p>Width: {width}px</p>\n}\n\nexport default WindowWidth",
      "id": "react-9-effect-dengan-useeffect"
    },
    {
      "title": "Hooks di React",
      "description": "Hooks adalah fungsi khusus yang memberi kemampuan tambahan pada function component, seperti menyimpan state atau menjalankan efek samping.",
      "points": [
        "useState: menyimpan state di dalam komponen.",
        "useEffect: menjalankan efek samping, misalnya fetch data atau sinkronisasi dengan luar komponen.",
        "useRef: mengakses elemen DOM secara langsung atau menyimpan nilai yang tidak memicu render ulang saat berubah.",
        "useContext: mengambil data global/shared antar komponen tanpa perlu mengirim props berlapis-lapis (prop drilling).",
        "Nama hook selalu diawali kata use, dan hanya boleh dipanggil di level teratas function component (tidak di dalam kondisi atau loop)."
      ],
      "language": "jsx",
      "codeTitle": "useRef dan useContext",
      "code": "\nimport React, { useRef, useContext, createContext } from 'react'\n\nconst ThemeContext = createContext('light')\n\nconst InputFocus = () => {\n  const inputRef = useRef(null)\n  const theme = useContext(ThemeContext)\n\n  return (\n    <div>\n      <input ref={inputRef} placeholder={`Tema aktif: ${theme}`} />\n      <button onClick={() => inputRef.current.focus()}>Fokus Input</button>\n    </div>\n  )\n}\n\nexport default InputFocus",
      "id": "react-10-hooks-di-react"
    },
    {
      "title": "State vs Props",
      "description": "State dan props sama-sama membawa data ke komponen, tetapi punya sifat dan kegunaan yang berbeda.",
      "points": [
        "Props adalah data yang dikirim dari parent ke child dan bersifat read-only/immutable; child tidak boleh mengubah props secara langsung.",
        "Props dapat diteruskan ke komponen anak sehingga cocok untuk membagikan data ke berbagai level komponen.",
        "State adalah data milik komponen itu sendiri (locally scoped) dan bersifat mutable, diubah lewat function setter seperti setCount.",
        "Perubahan state dapat bersifat asynchronous dan akan memicu React merender ulang komponen agar tampilan sesuai data terbaru.",
        "Aturan sederhana: gunakan props untuk data yang datang dari luar komponen, gunakan state untuk data yang dikelola sendiri oleh komponen."
      ],
      "language": "jsx",
      "codeTitle": "Props vs State",
      "code": "\n// Props: data dikirim dari parent ke child\nfunction Button({ text }) {\n  return <button>{text}</button>\n}\n\n// State: data dikelola sendiri oleh komponen\nimport { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <div>\n      <h1>{count}</h1>\n      <button onClick={() => setCount(count + 1)}>Tambah</button>\n    </div>\n  )\n}",
      "id": "react-11-state-vs-props"
    },
    {
      "title": "Tools dan Environment Setup",
      "description": "Beberapa tools umum yang dipakai untuk pengembangan website menggunakan React.",
      "points": [
        "Visual Studio Code sebagai code editor untuk menulis project React.",
        "Google Chrome (dengan React Developer Tools) untuk menjalankan dan debugging component, props, dan state.",
        "Node.js dibutuhkan sebagai runtime untuk menjalankan npm dan tools build seperti Vite.",
        "Vite dipakai sebagai build tool untuk membuat dan menjalankan project React secara cepat.",
        "Tailwind CSS sering dipakai bersama React untuk styling berbasis utility class.",
        "Dokumentasi resmi React tersedia di https://react.dev/ sebagai referensi belajar."
      ],
      "id": "react-12-tools-dan-environment-setup"
    }
  ]
}

const ReactJS = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default ReactJS