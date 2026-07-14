import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "E",
  "slug": "modern-js",
  "title": "Modern JS",
  "shortTitle": "Modern JS",
  "route": "/modern-js",
  "icon": "Sparkles",
  "summary": "ES6+, promise, async/await, module, dan array method.",
  "accent": "from-yellow-300 via-pink-300 to-cyan-300"
}

const material = {
  "title": "Modern JS",
  "subtitle": "Modern JavaScript atau ES6+ membuat kode lebih ringkas, modular, dan mudah dirawat dibanding gaya penulisan lama (ES5). Materi ini membahas fitur-fitur yang sering dipakai di proyek React, lengkap dengan contoh kode.",
  "overview": [
    "Modern JavaScript (ES6+) adalah kumpulan fitur baru JavaScript sejak ES2015 yang membuat kode lebih ringkas, modular, dan mudah dirawat dibanding ES5 (ECMAScript 5) yang lebih panjang dan mengandalkan var serta callback.",
    "Ada beberapa alasan modern JS penting dipelajari: kode lebih ringkas dan mudah dibaca, mengurangi risiko bug akibat scope var yang membingungkan, sudah menjadi standar industri, membuat kode asynchronous lebih mudah ditulis, serta performa dan optimasi yang lebih baik.",
    "Fitur andalan modern JS antara lain let/const, arrow function, template literal, destructuring, spread/rest, class, promise, async/await, dan module (import/export). Semua ini menjadi standar di proyek Vite, React, dan Node.js modern.",
    "Walau sintaksnya lebih ringkas, tetap pahami perilaku dasarnya seperti scope variable, cara kerja Promise, dan aturan module, agar tidak bingung saat debugging."
  ],
  "sections": [
    {
      "title": "Perbedaan ES5 dan ES6+",
      "description": "Sebelum masuk ke detail tiap fitur, penting memahami gambaran besar perbedaan gaya penulisan JavaScript lama (ES5/ECMAScript 5) dan JavaScript modern (ES6+).",
      "points": [
        "Variable: ES5 memakai var, ES6+ memakai let dan const.",
        "Function: ES5 memakai function biasa, ES6+ bisa memakai arrow function yang lebih ringkas.",
        "String: ES5 menggabungkan string dengan tanda plus, ES6+ memakai template literal dengan backtick.",
        "Object: ES5 mengambil property secara manual satu per satu, ES6+ memakai destructuring.",
        "Asynchronous: ES5 memakai callback, ES6+ memakai promise dan async/await.",
        "Module: ES5 tidak punya sistem module bawaan, ES6+ punya import/export.",
        "Code style: ES5 cenderung lebih panjang, ES6+ lebih ringkas dan deklaratif."
      ],
      "language": "javascript",
      "codeTitle": "Gaya ES5 vs Gaya ES6+",
      "code": "// Gaya ES5\nvar nama = 'Okti'\nfunction sapaES5(n) {\n  return 'Halo, ' + n\n}\nconsole.log(sapaES5(nama))\n\n// Gaya ES6+\nconst nama2 = 'Okti'\nconst sapaES6 = (n) => `Halo, ${n}`\nconsole.log(sapaES6(nama2))",
      "id": "modern-js-1-perbedaan-es5-dan-es6"
    },
    {
      "title": "let, const, dan var",
      "description": "Pemilihan keyword variable memengaruhi scope dan keamanan kode. Modern JavaScript mengutamakan const dan let dibanding var.",
      "points": [
        "const digunakan saat binding variable tidak direassign. Isi object atau array masih bisa berubah selama object-nya sama.",
        "let digunakan saat nilai perlu direassign, misalnya counter, state sementara, atau jumlah peserta pelatihan.",
        "var bersifat function scope dan bisa bocor keluar dari block seperti for-loop, sehingga sering membuat bug.",
        "let dan const bersifat block scope, sehingga lebih aman dan error-nya lebih jelas saat variable diakses di luar scope-nya.",
        "Gunakan const sebagai default, lalu ubah ke let hanya saat benar-benar perlu."
      ],
      "language": "javascript",
      "codeTitle": "let vs const vs var",
      "code": "const namaLembaga = 'BBPVP Bandung'\nlet jumlahPeserta = 20\n\njumlahPeserta = 25 // berhasil, let boleh diubah\n// namaLembaga = 'Lembaga Lain' // Error! const tidak boleh direassign\n\n// Perbedaan scope var vs let\nfor (var i = 0; i < 3; i++) {}\nconsole.log(i) // 3, var bocor keluar dari loop\n\nfor (let j = 0; j < 3; j++) {}\n// console.log(j) // ReferenceError, let tidak bisa diakses di luar loop",
      "id": "modern-js-2-let-const-dan-var"
    },
    {
      "title": "Arrow Function",
      "description": "Arrow function adalah cara penulisan function yang lebih ringkas dan sering dipakai di framework modern seperti React.",
      "points": [
        "Arrow function cocok untuk callback seperti map, filter, event handler, atau function pendek.",
        "Jika isi function hanya satu ekspresi, kurung kurawal dan kata return bisa dihilangkan (implicit return).",
        "Arrow function tidak memiliki this sendiri, sehingga perilakunya berbeda dari function biasa, terutama saat dipakai sebagai method di dalam object.",
        "Gunakan arrow function untuk mempersingkat penulisan dibanding function declaration biasa."
      ],
      "language": "javascript",
      "codeTitle": "Function Biasa vs Arrow Function",
      "code": "// Cara lama\nfunction sapa(nama) {\n  return 'Halo, ' + nama\n}\n\n// Cara modern\nconst sapaModern = (nama) => `Halo, ${nama}`\n\nconsole.log(sapaModern('Okti'))",
      "id": "modern-js-3-arrow-function"
    },
    {
      "title": "Template Literal",
      "description": "Template literal memudahkan penyusunan string, termasuk string multi-line dan interpolasi value, tanpa perlu tanda plus.",
      "points": [
        "Template literal memakai tanda backtick, bukan tanda kutip biasa.",
        "Sisipkan variable atau ekspresi apa pun langsung dengan format dollar-curly di dalam backtick.",
        "Bisa dipakai untuk string multi-line tanpa karakter escape tambahan.",
        "Berguna untuk membuat pesan dinamis, class dinamis, query string, atau HTML string sederhana di React."
      ],
      "language": "javascript",
      "codeTitle": "Template Literal",
      "code": "const kelas = 'Web Developer'\nconst durasi = '240 jam'\n\nconsole.log(`Pelatihan ${kelas} akan berlangsung selama ${durasi}.`)",
      "id": "modern-js-4-template-literal"
    },
    {
      "title": "Destructuring Assignment",
      "description": "Destructuring memungkinkan mengambil nilai array atau property object ke variable terpisah dengan cepat, tanpa menulis object.property berulang-ulang.",
      "points": [
        "Object destructuring mengambil property langsung berdasarkan nama key.",
        "Array destructuring mengambil item berdasarkan posisi atau urutannya.",
        "Bisa memberi nama variable baru saat destructuring sesuai kebutuhan, tanpa harus sama dengan nama property aslinya.",
        "Sering dipakai untuk mengambil props di komponen React."
      ],
      "language": "javascript",
      "codeTitle": "Destructuring Object",
      "code": "const instruktur = {\n  nama: 'Ahmad',\n  keahlian: 'Frontend',\n  lokasi: 'Bandung',\n}\n\n// Mengambil property langsung ke variable\nconst { nama, keahlian } = instruktur\n\nconsole.log(`${nama} mengajar bidang ${keahlian}.`)",
      "id": "modern-js-5-destructuring-assignment"
    },
    {
      "title": "Spread dan Rest Operator (...)",
      "description": "Simbol titik tiga punya dua peran: spread untuk membentangkan atau menyalin data, dan rest untuk mengumpulkan sisa data ke dalam array/object baru.",
      "points": [
        "Spread membentangkan array atau object, cocok untuk menyalin data atau menggabungkan beberapa data menjadi satu.",
        "Rest mengumpulkan sisa item array atau parameter function ke dalam satu array/object baru.",
        "Pada React, spread sering dipakai untuk memperbarui state tanpa mengubah (mutate) data asli secara langsung.",
        "Saat destructuring, posisi rest harus selalu berada di bagian paling akhir."
      ],
      "language": "javascript",
      "codeTitle": "Spread dan Rest",
      "code": "const materiDasar = ['HTML', 'CSS']\nconst materiLanjutan = [...materiDasar, 'JS Modern', 'React']\nconsole.log(materiLanjutan)\n// Output: ['HTML', 'CSS', 'JS Modern', 'React']\n\nconst scores = [80, 90, 100]\nconst [firstScore, ...otherScores] = scores\nconsole.log(firstScore, otherScores) // 80 [90, 100]",
      "id": "modern-js-6-spread-dan-rest-operator"
    },
    {
      "title": "Promise dan async/await",
      "description": "Promise merepresentasikan proses asynchronous seperti fetch API, baca file, atau query database. async/await membuat alurnya lebih mudah dibaca layaknya kode synchronous biasa.",
      "points": [
        "Promise punya 3 kemungkinan state: pending (masih diproses), fulfilled (berhasil), atau rejected (gagal).",
        "Alurnya selalu dimulai dari pending, lalu berubah menjadi fulfilled atau rejected, dan tidak bisa berubah lagi setelah itu.",
        "then/catch dapat dipakai untuk menangani hasil dan error dari Promise secara langsung.",
        "async function selalu mengembalikan Promise, walau isinya bukan Promise.",
        "await menunggu Promise selesai sebelum lanjut ke baris berikutnya, membuat kode asynchronous terbaca seperti kode sinkron.",
        "Gunakan try/catch di dalam async function agar error saat proses asynchronous bisa ditangani dengan jelas."
      ],
      "language": "javascript",
      "codeTitle": "Fetch dengan async/await",
      "code": "// Contoh 1: memanggil API publik untuk latihan\nasync function ambilDataUser() {\n  try {\n    const respon = await fetch('https://jsonplaceholder.typicode.com/users/1')\n    const data = await respon.json()\n    console.log(`Nama User: ${data.name}`)\n  } catch (error) {\n    console.error('Gagal mengambil data', error)\n  }\n}\n\nambilDataUser()\n\n// Contoh 2: pola yang sama untuk memanggil API materi\nasync function loadMaterials() {\n  try {\n    const response = await fetch('/api/materials')\n    const data = await response.json()\n    return data\n  } catch (error) {\n    console.error('Gagal mengambil materi:', error)\n    return []\n  }\n}",
      "id": "modern-js-7-promise-dan-async-await"
    },
    {
      "title": "Modules: import dan export",
      "description": "Module membuat kode bisa dipisah ke beberapa file kecil lalu digabungkan kembali. Vite dan React memakai ES Module sebagai standar.",
      "points": [
        "Named export dapat mengekspor banyak nilai (variable, function, dan sebagainya) dari satu file, dan harus diimport memakai nama yang sama di dalam kurung kurawal.",
        "Default export biasanya dipakai untuk satu nilai utama dalam satu file, dan bisa diimport dengan nama bebas tanpa kurung kurawal.",
        "Satu file boleh punya banyak named export, tapi hanya boleh punya satu default export.",
        "Import path relatif dimulai dari ./ atau ../.",
        "Pisahkan data, component, util, dan page agar struktur proyek lebih rapi."
      ],
      "language": "javascript",
      "codeTitle": "Named Export vs Default Export",
      "code": "// matematika.js (named export)\nexport const PI = 3.14\nexport const tambah = (a, b) => a + b\nexport const kurang = (a, b) => a - b\n\n// app.js (import named export)\nimport { PI, tambah } from './matematika.js'\nconsole.log(PI) // 3.14\nconsole.log(tambah(5, 10)) // 15\n\n// user.js (default export)\nconst profil = { nama: 'Okti', peran: 'Instruktur IT' }\nexport default profil\n\n// main.js (import default export, nama bebas)\nimport dataDiri from './user.js'\nconsole.log(dataDiri.peran) // Instruktur IT",
      "id": "modern-js-8-modules-import-dan-export"
    },
    {
      "title": "Array Methods Modern",
      "description": "Method array modern membuat transformasi data lebih deklaratif. Ini sering dipakai saat render list di React.",
      "points": [
        "map mengubah setiap item menjadi bentuk baru.",
        "filter memilih item yang memenuhi kondisi.",
        "reduce mengakumulasi data menjadi satu nilai atau struktur baru.",
        "find mengambil item pertama yang cocok.",
        "some dan every mengecek kondisi pada sebagian atau seluruh item.",
        "toSorted dan toReversed membuat versi baru tanpa mengubah array asli pada environment modern."
      ],
      "language": "javascript",
      "codeTitle": "Array Method",
      "code": "const lessons = [\n  { title: 'HTML', progress: 100 },\n  { title: 'React', progress: 65 },\n  { title: 'VPS', progress: 30 },\n]\n\nconst completed = lessons.filter((lesson) => lesson.progress === 100)\nconst titles = lessons.map((lesson) => lesson.title)\nconst average = lessons.reduce((total, lesson) => total + lesson.progress, 0) / lessons.length\nconst reactLesson = lessons.find((lesson) => lesson.title === 'React')\n\nconsole.log({ completed, titles, average, reactLesson })",
      "id": "modern-js-9-array-methods-modern"
    },
    {
      "title": "CLI Relevan untuk Modern JS",
      "description": "Fitur modern biasanya berjalan langsung di Node.js dan browser modern, tetapi beberapa proyek masih memakai transpiler atau bundler.",
      "points": [
        "node -v dipakai untuk memastikan versi Node mendukung fitur JavaScript modern yang dibutuhkan.",
        "npm run dev menjalankan bundler seperti Vite yang memahami import/export, JSX, CSS import, dan HMR.",
        "npm run build membuat output production yang sudah dioptimasi untuk browser.",
        "Babel dapat mentranspilasi JavaScript modern ke target browser lama jika proyek membutuhkannya.",
        "TypeScript atau SWC kadang dipakai bersama bundler untuk transformasi kode yang lebih cepat."
      ],
      "language": "bash",
      "codeTitle": "CLI Modern JS",
      "code": "node -v\nnpm run dev\nnpm run build\n\n# contoh bila proyek memakai Babel\nnpx babel src --out-dir dist",
      "id": "modern-js-10-cli-relevan-untuk-modern-js"
    }
  ]
}

const ModernJS = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default ModernJS