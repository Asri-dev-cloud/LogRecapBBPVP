import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "F",
  "slug": "dom",
  "title": "DOM",
  "shortTitle": "DOM",
  "route": "/dom",
  "icon": "Network",
  "summary": "DOM tree, selector, manipulasi element, event, dan latihan praktik.",
  "accent": "from-cyan-300 via-lime-300 to-pink-300"
}

const material = {
  "title": "DOM",
  "subtitle": "DOM adalah representasi tree dari dokumen HTML yang bisa dibaca, dijelajahi, dan dimanipulasi lewat JavaScript. Materi ini membahas struktur, selector, manipulasi element, event, sampai latihan praktik.",
  "overview": [
    "DOM (Document Object Model) adalah representasi struktur dokumen HTML atau XML dalam bentuk object yang bisa dibaca dan dimanipulasi memakai bahasa pemrograman seperti JavaScript.",
    "Browser mengubah HTML menjadi DOM lewat beberapa tahap: membuka file HTML, membacanya, mengubahnya menjadi struktur pohon (tree), lalu menyediakan struktur tersebut ke JavaScript.",
    "DOM tersusun dari node-node yang saling berelasi sebagai parent, child, atau sibling, sehingga bisa dijelajahi dan dimanipulasi sesuai kebutuhan.",
    "Walau React mengabstraksi banyak hal lewat virtual DOM, memahami DOM asli tetap penting untuk debugging, integrasi browser API, dan proyek non-React."
  ],
  "sections": [
    {
      "title": "Apa itu DOM dan Cara Kerja Browser",
      "description": "DOM adalah representasi struktur dokumen HTML atau XML dalam bentuk object yang bisa dimanipulasi dengan bahasa pemrograman seperti JavaScript.",
      "points": [
        "Browser membuka file HTML yang diminta oleh user.",
        "Browser membaca (parsing) HTML baris demi baris.",
        "Browser mengubah hasil parsing HTML menjadi struktur pohon (tree) di memori.",
        "Struktur pohon tersebut disediakan ke JavaScript sebagai DOM, sehingga bisa dibaca dan diubah secara dinamis.",
        "DOM menjadi jembatan antara struktur HTML, style CSS, dan interaksi user lewat JavaScript."
      ],
      "language": "javascript",
      "codeTitle": "Mengakses DOM dari JavaScript",
      "code": "// document adalah pintu masuk utama ke DOM\nconsole.log(document)\nconsole.log(document.title)\nconsole.log(document.body)",
      "id": "dom-1-apa-itu-dom-dan-cara-kerja-browser"
    },
    {
      "title": "DOM Tree dan Jenis Node",
      "description": "DOM direpresentasikan seperti pohon (tree) yang tersusun dari node-node. Setiap tag HTML, teks, dan attribute punya jenis node masing-masing.",
      "points": [
        "Document Node adalah root utama dari seluruh document.",
        "Element Node adalah tag HTML seperti <p>, <h1>, <a>, <div>, dan <body>.",
        "Text Node adalah isi teks di dalam element, misalnya 'Hello World'.",
        "Attribute Node adalah attribute HTML pada sebuah element, misalnya atribut class='btn-primary'.",
        "DOM tree selalu dimulai dari Document sebagai root, lalu bercabang mengikuti struktur tag HTML aslinya."
      ],
      "language": "html",
      "codeTitle": "HTML dan Struktur DOM Tree-nya",
      "code": "<!-- HTML -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Belajar DOM</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>Belajar JavaScript</p>\n  </body>\n</html>\n\n<!--\nStruktur DOM (tree):\nDocument\n  html\n    head\n      title\n        'Belajar DOM'\n    body\n      h1\n        'Hello World'\n      p\n        'Belajar JavaScript'\n-->",
      "id": "dom-2-dom-tree-dan-jenis-node"
    },
    {
      "title": "Relasi Antar Node: Parent, Child, Sibling",
      "description": "Setiap node dalam DOM tree punya posisi relatif terhadap node lain. Memahami relasi ini membantu saat menjelajahi atau memanipulasi element di sekitar target.",
      "points": [
        "Parent (induk): posisi node yang berada di atas atau membungkus node lain. Contoh: node body adalah parent dari node p.",
        "Child (anak): posisi node yang berada di bawah atau dibungkus oleh node lain. Contoh: node text adalah child dari node title.",
        "Sibling (saudara): posisi node yang sejajar dengan node lain di bawah parent yang sama.",
        "Property seperti parentElement, children, nextElementSibling, dan previousElementSibling dipakai untuk menjelajahi (traverse) relasi ini lewat JavaScript."
      ],
      "language": "javascript",
      "codeTitle": "Traversal Parent, Child, Sibling",
      "code": "const item = document.querySelector('.card')\n\nconsole.log(item.parentElement) // parent dari .card\nconsole.log(item.children) // semua child element dari .card\nconsole.log(item.nextElementSibling) // sibling setelah .card\nconsole.log(item.previousElementSibling) // sibling sebelum .card",
      "id": "dom-3-relasi-antar-node"
    },
    {
      "title": "Selector DOM (Mengambil Element)",
      "description": "Selector digunakan untuk memilih element sebelum dimanipulasi. Pilih selector yang paling sesuai dengan kebutuhan.",
      "points": [
        "getElementById memilih satu element berdasarkan id dan paling cepat untuk target yang unik.",
        "getElementsByTagName memilih semua element berdasarkan nama tag, mengembalikan HTMLCollection yang bersifat live.",
        "getElementsByClassName memilih semua element berdasarkan nama class, juga mengembalikan HTMLCollection yang live.",
        "querySelector memilih element pertama yang cocok dengan CSS selector apa pun.",
        "querySelectorAll memilih semua element yang cocok dengan CSS selector dan mengembalikan NodeList (bukan live).",
        "Gunakan data attribute seperti data-id atau data-action untuk target JavaScript yang tidak bergantung pada class styling."
      ],
      "language": "javascript",
      "codeTitle": "Selector DOM",
      "code": "const judul = document.getElementById('page-title')\nconst paragraf = document.getElementsByTagName('p')\nconst items = document.getElementsByClassName('item')\n\nconst firstCard = document.querySelector('.card')\nconst allButtons = document.querySelectorAll('[data-action]')\n\nallButtons.forEach((button) => {\n  console.log(button.dataset.action)\n})",
      "id": "dom-4-selector-dom"
    },
    {
      "title": "Mengubah Isi Element",
      "description": "Setelah element dipilih, JavaScript bisa mengubah teks, HTML, attribute, atau style-nya secara langsung.",
      "points": [
        "textContent aman dipakai untuk mengubah teks biasa tanpa mem-parsing HTML.",
        "innerHTML dapat menyisipkan HTML baru, tetapi harus hati-hati terhadap input user karena berisiko XSS.",
        "Attribute seperti src pada img bisa diubah langsung lewat property dengan nama yang sama.",
        "Property style dipakai untuk mengubah CSS inline pada element, misalnya style.color atau style.display."
      ],
      "language": "javascript",
      "codeTitle": "Mengubah Isi, Attribute, dan Style",
      "code": "document.querySelector('h1').textContent = 'Halo'\n\ndocument.querySelector('p').innerHTML = '<b>Belajar DOM</b>'\n\ndocument.querySelector('img').src = 'gambar.jpg'\n\ndocument.querySelector('h1').style.color = 'red'",
      "id": "dom-5-mengubah-isi-element"
    },
    {
      "title": "Menambah dan Menghapus Element",
      "description": "DOM memungkinkan JavaScript membuat element baru lalu menambahkannya ke halaman, atau menghapus element yang sudah tidak diperlukan.",
      "points": [
        "createElement membuat element baru yang belum terhubung ke halaman.",
        "appendChild atau append menambahkan element baru ke akhir parent tertentu.",
        "classList.add, remove, toggle, dan contains dipakai untuk mengelola class pada element.",
        "setAttribute dan removeAttribute mengubah attribute seperti aria-expanded atau disabled.",
        "Method remove() menghapus element itu sendiri langsung dari DOM."
      ],
      "language": "javascript",
      "codeTitle": "Membuat dan Menghapus Element",
      "code": "const list = document.querySelector('#lesson-list')\nconst item = document.createElement('li')\n\nitem.classList.add('lesson-item')\nitem.textContent = 'Belajar DOM Manipulation'\n\nlist.appendChild(item)\n\n// Menghapus element\nconst oldItem = document.querySelector('.lesson-item.selesai')\noldItem?.remove()",
      "id": "dom-6-menambah-dan-menghapus-element"
    },
    {
      "title": "Event dan addEventListener",
      "description": "Event terjadi saat user atau browser melakukan aksi, seperti klik, input, submit, resize, scroll, atau keydown. Ada dua cara umum untuk menangani event di HTML/JavaScript.",
      "points": [
        "Cara lama: memakai attribute HTML seperti onclick langsung di tag. Cara ini mudah tapi mencampur HTML dan logika JavaScript.",
        "Cara modern: memakai method addEventListener() pada element, sehingga struktur HTML dan logika JavaScript tetap terpisah.",
        "Event object berisi informasi seperti target, key, clientX, dan default behavior dari aksi yang terjadi.",
        "preventDefault dipakai untuk mencegah perilaku bawaan browser, misalnya form yang reload halaman saat submit.",
        "Event delegation memasang listener pada parent untuk menangani banyak child dinamis sekaligus.",
        "Event umum terbagi jadi beberapa kategori: Mouse Events (click, dblclick, mouseover/mouseout), Keyboard Events (keydown, keyup), Form Events (submit, change, focus/blur), dan Window/Document Events (load, resize, scroll)."
      ],
      "language": "javascript",
      "codeTitle": "Dua Cara Menangani Event",
      "code": "// Cara lama: attribute HTML\n// <button onclick='sapa()'>Klik Saya</button>\nfunction sapa() {\n  alert('Halo!')\n}\n\n// Cara modern: addEventListener\nconst form = document.querySelector('#search-form')\nconst result = document.querySelector('#result')\n\nform.addEventListener('submit', (event) => {\n  event.preventDefault()\n\n  const keyword = event.target.elements.keyword.value\n  result.textContent = 'Mencari materi: ' + keyword\n})",
      "id": "dom-7-event-dan-addeventlistener"
    },
    {
      "title": "Tools untuk Belajar DOM",
      "description": "Tools browser membantu melihat struktur, style, event, dan error. Live Server mempercepat refresh saat latihan HTML/CSS/JS.",
      "points": [
        "Browser DevTools tab Elements dipakai untuk inspect HTML dan CSS, sekaligus melihat perubahan DOM secara real-time.",
        "Console dipakai untuk menjalankan JavaScript, melihat log, dan membaca error.",
        "Sources dipakai untuk debugging dengan breakpoint.",
        "Network dipakai untuk melihat request asset dan API.",
        "Live Server di VS Code membantu membuka file dengan server lokal agar path asset lebih konsisten."
      ],
      "language": "javascript",
      "codeTitle": "Tips Console DevTools",
      "code": "// $0 merujuk ke element yang sedang dipilih di tab Elements\nconsole.log($0)\n\n// Cara cepat cek jumlah element tertentu di halaman\nconsole.log(document.querySelectorAll('.card').length)",
      "id": "dom-8-tools-untuk-belajar-dom"
    },
    {
      "title": "Latihan Praktik DOM",
      "description": "Setelah memahami konsep di atas, coba kerjakan latihan berikut secara mandiri untuk melatih selector, manipulasi element, dan event handling. Kerjakan di file HTML/JS terpisah, lalu cek hasilnya lewat browser.",
      "points": [
        "Latihan 1 - Ubah Warna: sediakan paragraf dan tombol, saat tombol diklik ubah warna teks paragraf menjadi merah.",
        "Latihan 2 - Ambil Banyak Elemen: ambil semua elemen li dalam list, lalu ubah semua teksnya menjadi 'Item sudah diubah'.",
        "Latihan 3 - Tambah Elemen: ambil nilai dari input text, lalu tambahkan sebagai li baru di dalam ul saat tombol diklik.",
        "Latihan 4 - Hapus Elemen: lanjutan latihan 3, setiap li yang diklik akan langsung terhapus dari list.",
        "Latihan 5 - Toggle Class: saat teks diklik, toggle class aktif (misalnya warna merah dan bold) pada element tersebut.",
        "Latihan 6 - Counter: buat angka bertambah saat tombol tambah diklik, dan berkurang saat tombol kurang diklik.",
        "Latihan 7 - Validasi: tampilkan pesan 'Nama tidak boleh kosong' jika input kosong, atau 'Selamat datang, [nama]!' jika diisi.",
        "Latihan 8 - Ganti Gambar: ganti src gambar menjadi file lain saat tombol diklik."
      ],
      "language": "html",
      "codeTitle": "Starter Code Tiap Latihan",
      "code": "<!-- Latihan 1: Ubah Warna -->\n<p class=\"teks\">Ini paragraf</p>\n<button>Ubah Warna</button>\n\n<!-- Latihan 2: Ambil Banyak Elemen -->\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n\n<!-- Latihan 3 dan 4: Tambah dan Hapus Elemen -->\n<input type=\"text\" id=\"input\">\n<button>Tambah</button>\n<ul id=\"list\"></ul>\n\n<!-- Latihan 5: Toggle Class -->\n<p id=\"teks\">Klik saya</p>\n<style>\n  .aktif {\n    color: red;\n    font-weight: bold;\n  }\n</style>\n\n<!-- Latihan 6: Counter -->\n<h1 id=\"angka\">0</h1>\n<button id=\"tambah\">+</button>\n<button id=\"kurang\">-</button>\n\n<!-- Latihan 7: Validasi -->\n<input type=\"text\" id=\"nama\">\n<button>Kirim</button>\n<p id=\"pesan\"></p>\n\n<!-- Latihan 8: Ganti Gambar -->\n<img id=\"gambar\" src=\"img1.jpeg\" height=\"400\">\n<br>\n<button>Ganti</button>",
      "id": "dom-9-latihan-praktik-dom"
    }
  ]
}

const DOM = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default DOM