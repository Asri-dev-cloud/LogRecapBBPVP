import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "B",
  "slug": "html",
  "title": "HTML",
  "shortTitle": "HTML",
  "route": "/html",
  "icon": "FileCode2",
  "summary": "Struktur dokumen, form, iframe, tabel, list, dan semantic HTML.",
  "accent": "from-orange-400 via-pink-300 to-yellow-300"
}

const material = {
  "title": "HTML",
  "subtitle": "HTML adalah pondasi struktur halaman web. Materi ini membahas sejarah, struktur dokumen, elemen teks, tabel, list, form, iframe, input, hingga semantic HTML dan responsive design.",
  "overview": [
    "HTML (HyperText Markup Language) pertama kali diperkenalkan oleh Tim Berners-Lee pada tahun 1991 dan terus berkembang hingga versi HTML5 yang digunakan saat ini.",
    "HTML adalah bahasa markup yang digunakan untuk membuat dan menyusun struktur halaman web memakai elemen dan tag.",
    "CSS mengatur tampilan, JavaScript mengatur perilaku, sedangkan HTML memberi kerangka yang dapat dibaca browser, search engine, dan assistive technology.",
    "Penulisan HTML yang semantic membuat halaman lebih mudah dirawat, lebih ramah SEO, dan lebih aksesibel."
  ],
  "sections": [
    {
      "title": "Sejarah dan Pengertian HTML",
      "description": "Sebelum menulis kode, penting memahami apa itu HTML dan bagaimana ia berkembang dari versi paling sederhana hingga menjadi standar modern.",
      "points": [
        "HTML pertama kali diperkenalkan oleh Tim Berners-Lee pada tahun 1991.",
        "Versi pertama HTML (HTML 1.0) sangat sederhana, hanya memuat sedikit tag dasar.",
        "Seiring waktu HTML berkembang menjadi HTML5 yang digunakan saat ini dengan banyak fitur baru seperti video, audio, canvas, dan elemen semantic.",
        "HTML menggunakan elemen dan tag untuk menentukan cara konten diatur dan ditampilkan pada browser.",
        "Sebuah elemen HTML terdiri dari opening tag, konten, closing tag, dan atribut. Contoh: <a href=\"http://www.google.com/\">Go to Google</a> memiliki atribut href pada opening tag-nya.",
        "Tools yang umum dipakai untuk belajar HTML: teks editor seperti VS Code, dan browser seperti Google Chrome untuk menjalankan hasilnya."
      ],
      "image": true,
      "imageSrc": "/assets/n.png",
      "imageLabel": "SISIPKAN GAMBAR: anatomi elemen HTML (opening tag, attribute, closing tag).",
      "language": "html",
      "codeTitle": "Contoh Elemen HTML",
      "code": "\n<a href=\"http://www.google.com/\">Go to Google</a>",
      "id": "html-1-sejarah-dan-pengertian-html"
    },
    {
      "title": "Struktur Dasar Dokumen",
      "description": "Setiap halaman HTML diawali dengan deklarasi doctype, lalu elemen html, head, dan body. Struktur ini memberi konteks kepada browser tentang dokumen.",
      "points": [
        "<!doctype html> memberi tahu browser bahwa dokumen memakai standar HTML modern.",
        "<html lang=\"id\"> adalah pembungkus utama seluruh dokumen dan membantu browser, screen reader, serta search engine mengenali bahasa konten.",
        "<head> berisi metadata seperti charset, viewport, title, link CSS, dan script yang tidak langsung terlihat sebagai konten utama, tetapi penting untuk SEO.",
        "<body> berisi isi konten yang tampil di browser: heading, paragraf, gambar, form, navigasi, dan struktur lainnya.",
        "Meta viewport penting untuk responsive design: width=device-width membuat layout mengikuti lebar perangkat."
      ],
      "language": "html",
      "codeTitle": "Struktur HTML",
      "code": "\n<!DOCTYPE html>\n<html lang=\"id\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"description\" content=\"Logbook materi web development\" />\n    <title>Belajar HTML</title>\n  </head>\n  <body>\n    <h1>Halo Dunia!</h1>\n    <p>Ini adalah paragraf.</p>\n  </body>\n</html>",
      "id": "html-2-struktur-dasar-dokumen"
    },
    {
      "title": "Heading dan Paragraph",
      "description": "Heading digunakan untuk judul dengan tingkat kepentingan berbeda, sedangkan paragraph digunakan untuk blok teks biasa.",
      "points": [
        "<h1> sampai <h6> mendefinisikan judul dari yang paling penting (h1) sampai yang paling kecil (h6).",
        "Setiap halaman idealnya hanya memiliki satu <h1> sebagai judul utama.",
        "<p> mendefinisikan sebuah paragraf teks.",
        "Browser otomatis menambahkan jarak (margin) sebelum dan sesudah setiap heading maupun paragraf."
      ],
      "language": "html",
      "codeTitle": "Heading & Paragraph",
      "code": "\n<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>\n\n<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>",
      "id": "html-3-heading-dan-paragraph"
    },
    {
      "title": "Formatting Text",
      "description": "Elemen formatting memberi penekanan atau makna khusus pada teks. Beberapa elemen bersifat visual saja, beberapa juga membawa makna semantic.",
      "points": [
        "<b> membuat teks bold tanpa makna semantic tambahan (hanya visual).",
        "<strong> menandakan teks penting secara semantic dan biasanya tampil bold.",
        "<i> membuat teks italic untuk istilah, judul, atau gaya visual tertentu.",
        "<em> memberi emphasis (penekanan) secara semantic dan biasanya tampil italic.",
        "<mark> untuk menyorot/menandai teks, <small> untuk teks lebih kecil.",
        "<del> menandai teks yang dihapus, <ins> menandai teks yang ditambahkan.",
        "<sub> membuat subscript seperti H2O, sedangkan <sup> membuat superscript seperti x2.",
        "<code> dan <pre> sering dipakai untuk menampilkan contoh kode."
      ],
      "language": "html",
      "codeTitle": "Formatting Text",
      "code": "\n<p><strong>Penting:</strong> simpan perubahan sebelum deploy.</p>\n<p>This text is <b>bold</b>.</p>\n<p>This text is <i>italic</i>.</p>\n<p>Rumus air adalah H<sub>2</sub>O dan pangkat dua ditulis x<sup>2</sup>.</p>\n<p>Gunakan <code>npm run dev</code> untuk menjalankan Vite.</p>",
      "id": "html-4-formatting-text"
    },
    {
      "title": "Comments (Komentar)",
      "description": "Komentar HTML dipakai untuk memberi catatan pada kode tanpa mempengaruhi tampilan. Komentar tidak ditampilkan oleh browser.",
      "points": [
        "Sintaks komentar diawali <!-- dan diakhiri -->.",
        "Berguna untuk menjelaskan bagian kode, menandai TODO, atau menonaktifkan sementara sebagian kode saat debugging.",
        "Komentar tidak terlihat oleh pengguna di halaman, tetapi tetap terlihat jika seseorang membuka source code."
      ],
      "language": "html",
      "codeTitle": "Contoh Comments",
      "code": "\n<!-- This is a comment -->\n\n<p>This is a paragraph.</p>\n\n<!-- Remember to add more information here -->",
      "id": "html-5-comments"
    },
    {
      "title": "Style: Inline, Internal, External",
      "description": "HTML dapat dihubungkan dengan CSS melalui inline style, internal style, atau external stylesheet. Untuk proyek serius, external stylesheet paling mudah dirawat.",
      "points": [
        "Sintaks umum: <tagname style=\"property:value;\">.",
        "Inline style ditulis langsung di atribut style pada elemen. Cocok untuk eksperimen kecil, tetapi sulit dipakai ulang.",
        "Internal style ditulis di dalam tag <style> pada head. Cocok untuk satu halaman kecil atau demo.",
        "External stylesheet memakai <link rel=\"stylesheet\"> dan menjadi pilihan utama untuk proyek multi halaman.",
        "Properti style yang umum: color, background-color, font-family, font-size, dan text-align.",
        "Urutan CSS penting: jika specificity sama, aturan yang muncul belakangan biasanya menang."
      ],
      "language": "html",
      "codeTitle": "Menghubungkan CSS",
      "code": "\n<!-- Inline -->\n<h1 style=\"color: hotpink;\">LogbookBBPVP2</h1>\n\n<!-- Internal -->\n<style>\n  h1 {\n    color: #111827;\n  }\n</style>\n\n<!-- External -->\n<link rel=\"stylesheet\" href=\"./styles.css\" />\n\n<h1 style=\"background-color:powderblue;\">This is a heading</h1>\n<p style=\"text-align:center;\">Centered paragraph.</p>",
      "id": "html-6-style-inline-internal-external"
    },
    {
      "title": "HTML Entities (Symbol)",
      "description": "Beberapa karakter memiliki arti khusus dalam HTML (seperti < dan >), sehingga perlu ditulis memakai entity reference agar tidak dianggap sebagai bagian dari tag.",
      "points": [
        "&nbsp; menghasilkan non-breaking space (spasi yang tidak akan patah baris).",
        "&lt; menghasilkan tanda less than (<), &gt; menghasilkan greater than (>).",
        "&amp; menghasilkan tanda ampersand (&).",
        "&quot; menghasilkan tanda kutip dua (\"), &apos; menghasilkan tanda kutip satu (').",
        "Simbol mata uang: &cent; (¢), &pound; (£), &yen; (¥), &euro; (€).",
        "&copy; menghasilkan simbol copyright (©)."
      ],
      "language": "html",
      "codeTitle": "Contoh HTML Entities",
      "code": "\n<p>5 &lt; 10 &amp; 10 &gt; 5</p>\n<p>&copy; 2026 LogbookBBPVP2</p>\n<p>Harga: &euro;10 atau &pound;9</p>",
      "id": "html-7-html-entities-symbol"
    },
    {
      "title": "Link",
      "description": "Link (hyperlink) digunakan untuk menghubungkan satu halaman ke halaman lain, baik di dalam maupun di luar situs.",
      "points": [
        "Sintaks dasar: <a href=\"url\">link text</a>.",
        "Atribut target menentukan bagaimana link dibuka.",
        "target=\"_self\" adalah default, membuka link di window/tab yang sama.",
        "target=\"_blank\" membuka link di tab/window baru.",
        "target=\"_parent\" membuka link di parent frame, sedangkan target=\"_top\" membuka link di full body dari window."
      ],
      "language": "html",
      "codeTitle": "Contoh Link",
      "code": "\n<p>\n  <a href=\"https://www.google.com/\" target=\"_blank\">\n    Google\n  </a>\n</p>",
      "id": "html-8-link"
    },
    {
      "title": "Image dan File Path",
      "description": "Elemen <img> menampilkan gambar pada halaman. Cara penulisan file path menentukan dari mana gambar tersebut diambil.",
      "points": [
        "Sintaks dasar: <img src=\"url\" alt=\"alternatetext\">.",
        "Atribut alt wajib diisi sebagai teks alternatif jika gambar gagal dimuat, sekaligus penting untuk aksesibilitas dan SEO.",
        "img src=\"picture.jpg\": file terletak di folder yang sama dengan halaman saat ini.",
        "img src=\"images/picture.jpg\": file terletak di dalam folder images pada folder saat ini.",
        "img src=\"/images/picture.jpg\": file terletak di folder images pada root website.",
        "img src=\"../picture.jpg\": file terletak satu folder di atas folder saat ini.",
        "Gambar juga bisa dibungkus dengan <a> agar menjadi link yang bisa diklik."
      ],
      "language": "html",
      "codeTitle": "Contoh Image",
      "code": "\n<img src=\"img_girl.jpg\" alt=\"Girl in a jacket\">\n\n<a href=\"about.html\">\n  <img src=\"smiley.gif\" alt=\"HTML tutorial\" style=\"width:42px;height:42px;\">\n</a>",
      "id": "html-9-image-dan-file-path"
    },
    {
      "title": "Favicon dan Page Title",
      "description": "Favicon dan page title berada di dalam <head> dan tampil pada tab browser sebagai identitas halaman.",
      "points": [
        "Favicon adalah icon kecil yang terdapat pada tab browser, ditambahkan memakai <link rel=\"icon\">.",
        "Page title adalah judul yang terdapat pada tab browser, ditulis dengan tag <title> di dalam <head>.",
        "Keduanya membantu pengguna mengenali halaman ketika membuka banyak tab sekaligus."
      ],
      "language": "html",
      "codeTitle": "Favicon & Page Title",
      "code": "\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page Title</title>\n  <link rel=\"icon\" type=\"image/x-icon\" href=\"/images/favicon.ico\">\n</head>\n<body>\n  <h1>This is a Heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>",
      "id": "html-10-favicon-dan-page-title"
    },
    {
      "title": "Tabel",
      "description": "Tabel digunakan untuk menampilkan data dalam bentuk baris dan kolom, cocok untuk data tabular seperti daftar kontak atau jadwal.",
      "points": [
        "<table> adalah tag yang digunakan untuk mendefinisikan tabel.",
        "<tr> adalah tag baris (table row).",
        "<td> adalah tag kolom/data (table data).",
        "<th> adalah tag header kolom (table header), biasanya tampil bold dan center.",
        "Atribut colspan pada <th> atau <td> membuat sel menggabungkan beberapa kolom.",
        "Atribut rowspan membuat sel menggabungkan beberapa baris."
      ],
      "language": "html",
      "codeTitle": "Contoh Tabel",
      "code": "\n<table>\n  <tr>\n    <th>Company</th>\n    <th>Contact</th>\n    <th>Country</th>\n  </tr>\n  <tr>\n    <td>Alfreds Futterkiste</td>\n    <td>Maria Anders</td>\n    <td>Germany</td>\n  </tr>\n  <tr>\n    <td>Centro comercial Moctezuma</td>\n    <td>Francisco Chang</td>\n    <td>Mexico</td>\n  </tr>\n</table>\n\n<!-- Contoh colspan & rowspan -->\n<table>\n  <tr>\n    <th colspan=\"2\">Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Jill</td>\n    <td>Smith</td>\n    <td>43</td>\n  </tr>\n</table>",
      "id": "html-11-tabel"
    },
    {
      "title": "List (Daftar)",
      "description": "List digunakan untuk menampilkan kumpulan item, baik yang berurutan maupun tidak berurutan.",
      "points": [
        "<ul> membuat unordered list (list dengan bullet point).",
        "<ol> membuat ordered list (list dengan penomoran otomatis).",
        "<li> adalah tag untuk setiap item di dalam <ul> atau <ol>.",
        "List juga bisa dibuat bertingkat (nested) dengan menempatkan <ul> atau <ol> baru di dalam <li>."
      ],
      "language": "html",
      "codeTitle": "Contoh List",
      "code": "\n<!-- Unordered List -->\n<ul>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ul>\n\n<!-- Ordered List -->\n<ol>\n  <li>Coffee</li>\n  <li>Tea</li>\n  <li>Milk</li>\n</ol>",
      "id": "html-12-list"
    },
    {
      "title": "Block Element dan Inline Element",
      "description": "Perbedaan block dan inline penting untuk memahami layout. Block biasanya mengambil satu baris penuh, sedangkan inline mengikuti aliran teks.",
      "points": [
        "Block element mengambil lebar penuh yang tersedia dan selalu memulai baris baru. Contoh untuk struktur & semantik halaman: header, nav, main, section, article, aside, footer.",
        "Block element untuk teks & konten: h1-h6, p, blockquote, pre, hr.",
        "Block element untuk list: ul, ol, li, dl, dt, dd.",
        "Block element untuk form & media: form, fieldset, legend, figure, figcaption, video, canvas.",
        "Block element lainnya: table, tfoot, address, noscript, div.",
        "Inline element hanya mengambil lebar sesuai kontennya dan tidak memulai baris baru. Contoh: a, b, strong, i, em, small, big, sub, sup, span, br.",
        "Inline element untuk kutipan & istilah: cite, q, dfn, abbr, acronym.",
        "Inline element untuk kode: code, kbd, samp, var.",
        "Inline element untuk form: input, textarea, button, label, select, output.",
        "Inline element untuk media & script: img, object, map, script, bdo, time.",
        "CSS display dapat mengubah perilaku visual suatu elemen, misalnya display: block, inline, inline-block, flex, atau grid."
      ],
      "id": "html-13-block-element-dan-inline-element"
    },
    {
      "title": "Div",
      "description": "<div> adalah elemen block generik yang berfungsi sebagai wadah (container) untuk mengelompokkan konten lain, biasanya untuk keperluan styling atau layout dengan CSS/JavaScript.",
      "points": [
        "<div> tidak memiliki makna semantic khusus, berbeda dengan header, main, atau article.",
        "Karena bersifat block, isi di dalam <div> akan tampil pada baris barunya sendiri.",
        "<div> sering dipakai untuk membungkus beberapa elemen agar bisa diatur tata letaknya bersama-sama, misalnya dengan class atau id untuk CSS."
      ],
      "language": "html",
      "codeTitle": "Contoh Div",
      "code": "\n<div>\n  <h2>London</h2>\n  <p>London is the capital city of England.</p>\n  <p>London has over 9 million inhabitants.</p>\n</div>",
      "id": "html-14-div"
    },
    {
      "title": "Iframe",
      "description": "Iframe (inline frame) digunakan untuk menyisipkan halaman atau konten eksternal seperti video, map, dokumen, atau widget ke dalam halaman.",
      "points": [
        "Atribut src menentukan alamat konten yang ditampilkan, bisa berupa file HTML lokal maupun URL eksternal.",
        "Atribut title wajib dibuat deskriptif untuk aksesibilitas.",
        "width dan height mengatur ukuran iframe, tetapi layout responsive lebih baik memakai CSS.",
        "loading=\"lazy\" menunda pemuatan iframe sampai mendekati viewport.",
        "sandbox dapat membatasi kemampuan iframe untuk alasan keamanan.",
        "allow dipakai untuk izin fitur tertentu seperti fullscreen, autoplay, clipboard, atau geolocation.",
        "style=\"border:none;\" dipakai untuk menghilangkan garis border default pada iframe."
      ],
      "language": "html",
      "codeTitle": "Iframe Embed",
      "code": "\n<iframe\n  src=\"https://www.youtube.com/embed/video-id\"\n  title=\"Video pengantar web development\"\n  width=\"560\"\n  height=\"315\"\n  loading=\"lazy\"\n  allowfullscreen\n></iframe>\n\n<iframe src=\"latihan01.html\" height=\"200\" width=\"300\" title=\"Contoh Iframe\"></iframe>\n<iframe src=\"latihan02.html\" style=\"border:none;\" title=\"Contoh Iframe\"></iframe>",
      "id": "html-15-iframe"
    },
    {
      "title": "Form, Input, Fieldset, dan Legend",
      "description": "Form mengirim data dari user ke server atau diproses JavaScript. Struktur form yang baik membuat input mudah dipahami dan divalidasi.",
      "points": [
        "Atribut action menentukan endpoint tujuan pengiriman data.",
        "Atribut method biasanya GET untuk membaca/filter data dan POST untuk mengirim data yang mengubah state server.",
        "Label harus terhubung ke input memakai for dan id agar klik label ikut memfokuskan input.",
        "input type=\"text\" menampilkan input satu baris untuk teks bebas.",
        "input type=\"radio\" untuk memilih satu dari beberapa pilihan, input type=\"checkbox\" untuk memilih nol atau lebih pilihan.",
        "input type=\"submit\" menampilkan tombol untuk mengirim form, input type=\"reset\" mengembalikan form ke nilai awal, input type=\"button\" menampilkan tombol yang bisa dihubungkan ke JavaScript (misalnya onclick).",
        "Input type lain yang umum: password, email, number, tel, url, search, date, time, color, range, file, hidden, dan image.",
        "input type=\"hidden\" tidak ditampilkan ke pengguna, tetapi datanya tetap dikirim saat form disubmit — cocok untuk menyimpan ID atau data tersembunyi lain.",
        "select membuat dropdown list, dengan setiap pilihan didefinisikan memakai <option>.",
        "Fieldset (<fieldset>) mengelompokkan input yang berhubungan, sedangkan legend (<legend>) memberi judul untuk kelompok input tersebut.",
        "Validasi dasar dapat memakai atribut required, min, max, minlength, maxlength, pattern, dan type yang tepat.",
        "Atribut lain yang berguna: checked (pre-select radio/checkbox), disabled, readonly, size, step, dan value untuk nilai default input."
      ],
      "language": "html",
      "codeTitle": "Form HTML",
      "code": "\n<form action=\"/register\" method=\"post\">\n  <fieldset>\n    <legend>Data Akun</legend>\n\n    <label for=\"name\">Nama</label>\n    <input id=\"name\" name=\"name\" type=\"text\" required />\n\n    <label for=\"email\">Email</label>\n    <input id=\"email\" name=\"email\" type=\"email\" required />\n\n    <label for=\"pwd\">Password</label>\n    <input id=\"pwd\" name=\"pwd\" type=\"password\" required />\n\n    <label for=\"role\">Role</label>\n    <select id=\"role\" name=\"role\">\n      <option value=\"student\">Student</option>\n      <option value=\"mentor\">Mentor</option>\n    </select>\n\n    <input type=\"checkbox\" id=\"agree\" name=\"agree\" value=\"yes\">\n    <label for=\"agree\">Saya menyetujui syarat &amp; ketentuan</label>\n  </fieldset>\n\n  <button type=\"submit\">Daftar</button>\n</form>",
      "id": "html-16-form-input-fieldset-dan-legend"
    },
    {
      "title": "Semantic HTML",
      "description": "Semantic HTML adalah konsep dalam pengembangan web yang berfungsi menyediakan makna atau arti lebih dalam kode HTML, dibandingkan hanya memakai <div> dan <span> generik.",
      "points": [
        "<header> mendefinisikan header dari suatu bagian atau keseluruhan halaman.",
        "<nav> mendefinisikan bagian navigasi berisi daftar link utama atau sekunder.",
        "<main> mengidentifikasi konten utama yang unik dalam sebuah halaman.",
        "<article> mendefinisikan konten yang independen dan dapat berdiri sendiri, seperti posting blog atau berita.",
        "<section> mengelompokkan konten terkait yang biasanya memiliki heading sendiri.",
        "<aside> untuk konten yang sedikit terkait dengan konten sekitarnya, seperti sidebar atau iklan.",
        "<footer> mendefinisikan footer dari suatu bagian atau keseluruhan halaman.",
        "<figure> mengelompokkan media seperti gambar, diagram, atau video bersama dengan captionnya, sedangkan <figcaption> memberikan caption pada media tersebut.",
        "Untuk teks: <h1> - <h6> untuk judul bertingkat, <p> untuk paragraf, <strong> untuk penekanan tebal, <em> untuk penekanan miring.",
        "<blockquote> untuk kutipan panjang, <q> untuk kutipan pendek, <abbr> untuk menampilkan kepanjangan singkatan saat kursor hover, <cite> untuk judul karya (buku, lagu), <code> untuk menampilkan kode dalam teks biasa, <mark> untuk menyoroti teks, dan <time> untuk waktu/tanggal yang bisa dibaca mesin.",
        "Manfaat SEO: struktur konten lebih mudah dipahami crawler mesin pencari.",
        "Manfaat aksesibilitas: pengguna screen reader dapat lompat langsung ke landmark penting seperti nav, main, atau footer."
      ],
      "language": "html",
      "codeTitle": "Layout Semantic",
      "code": "\n<header>\n  <nav aria-label=\"Navigasi utama\">\n    <a href=\"/\">Home</a>\n    <a href=\"/react\">React</a>\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>Materi Terbaru</h2>\n    <article>\n      <h3>Belajar Semantic HTML</h3>\n      <p>Struktur semantic membuat konten lebih mudah dipahami.</p>\n      <figure>\n        <img src=\"semantic.png\" alt=\"Ilustrasi semantic HTML\">\n        <figcaption>Perbandingan non-semantic vs semantic HTML</figcaption>\n      </figure>\n    </article>\n  </section>\n\n  <aside>\n    <h2>Topik Terkait</h2>\n  </aside>\n</main>\n\n<footer>\n  <p>&copy; 2026 LogbookBBPVP2</p>\n</footer>",
      "id": "html-17-semantic-html"
    },
    {
      "title": "Responsive Design (Viewport)",
      "description": "Agar halaman HTML tampil baik di berbagai ukuran layar (desktop, tablet, mobile), diperlukan pengaturan viewport pada bagian head.",
      "points": [
        "Tambahkan tag meta viewport di dalam <head> agar halaman menyesuaikan lebar perangkat.",
        "width=device-width membuat lebar halaman mengikuti lebar layar perangkat.",
        "initial-scale=1.0 mengatur level zoom awal saat halaman pertama kali dimuat oleh browser.",
        "Tanpa meta viewport ini, halaman mobile biasanya akan tampil dengan tampilan versi desktop yang diperkecil dan sulit dibaca."
      ],
      "language": "html",
      "codeTitle": "Meta Viewport",
      "code": "\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "id": "html-18-responsive-design-viewport"
    }
  ]
}

const HTML = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default HTML