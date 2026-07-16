import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "C",
  "slug": "css-vanilla",
  "title": "CSS Vanilla",
  "shortTitle": "CSS",
  "route": "/css-vanilla",
  "icon": "Brush",
  "summary": "Selector, box model, specificity, styling, layout, dan navbar CSS lengkap.",
  "accent": "from-sky-400 via-lime-300 to-pink-300"
}

const material = {
  "title": "CSS Vanilla",
  "subtitle": "CSS Vanilla adalah CSS murni tanpa framework. Materi ini membahas sejarah, struktur dasar, selector, box model, cascade, specificity, styling warna/text/layout, hingga membuat navbar.",
  "overview": [
    "CSS membaca aturan dari selector, declaration block, property, dan value.",
    "Tiga konsep penting untuk debugging CSS adalah cascade, inheritance, dan specificity.",
    "Specificity menentukan selector mana yang menang saat beberapa aturan mengubah property yang sama.",
    "CSS juga mengatur warna, layout (box model, display, position), dan komponen umum seperti navbar."
  ],
  "sections": [
    {
      "title": "Pengertian dan Sejarah CSS",
      "description": "Sebelum masuk ke teknis, penting memahami apa itu CSS dan mengapa CSS diciptakan.",
      "points": [
        "Pada awal pengembangan web, HTML adalah satu-satunya alat untuk membuat halaman web, namun kemampuannya terbatas pada penyusunan konten, bukan desain visual.",
        "Proposal CSS diajukan pada tahun 1994 oleh Håkon Wium Lie dan Bert Bos dengan judul 'Cascading HTML Style Sheets', bertujuan memisahkan konten dan gaya dokumen web.",
        "CSS (Cascading Style Sheets) digunakan untuk membuat tampilan halaman web, seperti mengatur tata letak, warna (font, background, border, dll), jenis huruf, dan berbagai aspek visual lainnya.",
        "Tanpa CSS, halaman web hanya berupa teks dan elemen polos tanpa tata letak; dengan CSS, halaman yang sama bisa tampil rapi, berwarna, dan terstruktur."
      ],
      "image": true,
      "imageSrc": "/assets/s.png",
      "imageLabel": "SISIPKAN GAMBAR: perbandingan halaman web tanpa CSS vs dengan CSS.",
      "id": "css-vanilla-1-pengertian-dan-sejarah-css"
    },
    {
      "title": "Struktur Dasar CSS",
      "description": "Setiap aturan CSS terdiri dari beberapa bagian yang saling berkaitan: selector, blok deklarasi, property, dan value.",
      "points": [
        "Selector adalah keyword yang menunjuk elemen HTML mana yang akan diatur stylenya.",
        "Blok deklarasi adalah tempat menuliskan atribut/properti CSS, dibungkus dengan kurung kurawal pembuka dan penutup.",
        "Property adalah aturan yang dipakai untuk mengatur elemen HTML, misalnya color atau font-size.",
        "Value adalah nilai dari suatu property, misalnya green atau 40px.",
        "Setiap deklarasi diakhiri titik koma, meskipun pada deklarasi terakhir tanda ini tidak wajib.",
        "Komentar CSS ditulis dengan /* ... */ dan bisa satu baris atau beberapa baris."
      ],
      "image": true,
      "imageSrc": "/assets/t.png",
      "imageLabel": "SISIPKAN GAMBAR: diagram selector, declaration block, property, dan value.",
      "language": "css",
      "codeTitle": "Anatomi CSS",
      "code": "\nh1 {\n  color: green;\n  font-size: 40px;\n}\n\n/* komentar satu baris */\n/* komentar\n   beberapa baris */",
      "id": "css-vanilla-2-struktur-dasar-css"
    },
    {
      "title": "Cara Penggunaan CSS",
      "description": "Ada tiga cara menuliskan CSS ke dalam halaman HTML: inline, internal, dan external.",
      "points": [
        "Inline style: kode CSS ditulis langsung di dalam atribut style pada tag HTML.",
        "Internal style: kode CSS ditempatkan pada bagian head HTML menggunakan tag style.",
        "External style: kode HTML dan CSS dipisah ke file masing-masing, lalu dihubungkan dengan tag link.",
        "External style paling direkomendasikan untuk project nyata karena kode lebih rapi dan bisa dipakai ulang di banyak halaman."
      ],
      "language": "html",
      "codeTitle": "Inline, Internal, dan External CSS",
      "code": "\n<!-- Inline style -->\n<h1 style=\"color: green; background: blue;\">\n  Belajar desain web dengan inline style CSS\n</h1>\n\n<!-- Internal style -->\n<head>\n  <style>\n    h1 {\n      color: red;\n      background: green;\n    }\n  </style>\n</head>\n\n<!-- External style -->\n<head>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>",
      "id": "css-vanilla-3-cara-penggunaan-css"
    },
    {
      "title": "Jenis-Jenis Selector CSS",
      "description": "Selector menentukan elemen HTML mana yang ditarget oleh sebuah aturan CSS. Beberapa jenis selector yang umum dipakai:",
      "points": [
        "Universal selector (*) memilih seluruh elemen HTML di halaman.",
        "Element selector memilih berdasarkan nama tag, misalnya h1, p, button.",
        "Class selector diawali titik (.) dan bisa dipakai berkali-kali pada elemen berbeda, misalnya .underlined-text.",
        "ID selector diawali pagar (#) dan idealnya unik dalam satu halaman, misalnya #blue.",
        "Spesifik selector menggabungkan tag dan class/id untuk menarget elemen lebih presisi, misalnya p.red atau p#green.",
        "Grouping selector memungkinkan beberapa selector berbagi deklarasi yang sama dengan dipisah koma, misalnya h1, p { ... }."
      ],
      "language": "css",
      "codeTitle": "Contoh Selector",
      "code": "\n/* Universal */\n* {\n  font-family: 'Times New Roman';\n}\n\n/* Element */\nh1 { color: blue; }\n\n/* Class */\n.underlined-text { text-decoration: underline; }\n\n/* ID */\n#blue { background-color: blue; }\n\n/* Spesifik */\np.red { color: red; }\np#green { color: green; }\n\n/* Grouping */\nh1, p {\n  font-family: 'Times New Roman';\n  color: green;\n}",
      "id": "css-vanilla-4-jenis-jenis-selector-css"
    },
    {
      "title": "Selector Dasar dan Box Model",
      "description": "Setelah memahami jenis selector, penting juga memahami bagaimana ukuran elemen dihitung oleh browser lewat box model.",
      "points": [
        "Box model terdiri dari empat lapisan: content, padding, border, dan margin, dari dalam ke luar.",
        "Padding adalah jarak antara content dengan border, sedangkan margin adalah jarak elemen dengan elemen lain di luarnya.",
        "box-sizing: border-box membuat width mencakup content + padding + border sehingga layout lebih mudah diprediksi.",
        "Tanpa border-box, menambah padding atau border akan membuat total lebar elemen membesar melebihi width yang ditentukan."
      ],
      "language": "css",
      "codeTitle": "Selector dan Box Model",
      "code": "\n* {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 320px;\n  padding: 24px;\n  border: 1px solid #e5e7eb;\n  margin: 16px;\n  border-radius: 16px;\n}",
      "id": "css-vanilla-5-selector-dasar-dan-box-model"
    },
    {
      "title": "Cascade, Inheritance, dan Specificity",
      "description": "CSS memilih rule pemenang berdasarkan importance, specificity, source order, dan inheritance. Memahami urutannya membuat konflik style lebih mudah diselesaikan.",
      "points": [
        "Urutan ringkas sesuai catatan belajar: Universal (*) < Element < Class < ID < Attribute/Spesifik < Inline < !important.",
        "Catatan penting: dalam hitungan CSS resmi, class selector, attribute selector, dan pseudo-class berada pada bobot yang sama yaitu 0-1-0.",
        "Inline style memiliki bobot lebih tinggi daripada selector di stylesheet.",
        "!important mengalahkan deklarasi normal, tetapi sebaiknya dipakai sangat hemat karena sulit dioverride.",
        "Jika dua selector punya bobot sama, rule yang ditulis lebih akhir akan menang.",
        "Inheritance membuat beberapa property seperti color dan font-family turun ke child element, tetapi margin, padding, dan border tidak otomatis diwariskan."
      ],
      "image": true,
      "imageSrc": "/assets/u.png",
      "imageLabel": "SISIPKAN GAMBAR: tangga prioritas cascade dan specificity.",
      "id": "css-vanilla-6-cascade-inheritance-dan-specificity"
    },
    {
      "title": "Tabel Bobot Specificity",
      "description": "Specificity sering ditulis sebagai tiga atau empat kolom. Makin besar kolom kiri, makin kuat selector tersebut.",
      "points": [
        "* memiliki bobot 0-0-0 karena hanya menyasar semua elemen tanpa menambah specificity.",
        "Element seperti p bernilai 0-0-1.",
        "Class seperti .alert, attribute seperti [type=\"email\"], dan pseudo-class seperti :hover bernilai 0-1-0.",
        "ID seperti #login bernilai 1-0-0.",
        "Inline style dapat dianggap 1-0-0-0 dan menang atas selector stylesheet biasa.",
        "!important bukan specificity, tetapi importance layer yang mengubah prioritas deklarasi."
      ],
      "language": "css",
      "codeTitle": "Bobot Selector",
      "code": "\n/* 0-0-0 */\n* { color: black; }\n\n/* 0-0-1 */\np { color: gray; }\n\n/* 0-1-0 */\n.note { color: blue; }\n[data-state=\"active\"] { color: green; }\n\n/* 1-0-0 */\n#featured { color: hotpink; }\n\n/* Mengalahkan deklarasi normal */\n.note { color: red !important; }",
      "id": "css-vanilla-7-tabel-bobot-specificity"
    },
    {
      "title": "Contoh Konflik Selector",
      "description": "Konflik terjadi saat lebih dari satu rule mengubah property yang sama. Untuk debug, lihat selector, bobot, dan urutan source.",
      "points": [
        "Pada contoh ini, #title menang atas .heading dan h1 karena ID lebih spesifik.",
        "Jika !important ditambahkan pada .heading, deklarasi itu menang meskipun bobot class lebih rendah.",
        "Jika specificity sama, rule terakhir menang. Ini sering terjadi pada class utility atau stylesheet yang diimport belakangan.",
        "Solusi yang sehat: rapikan struktur selector, hindari chaining berlebihan, dan gunakan class yang jelas."
      ],
      "language": "css",
      "codeTitle": "Konflik Specificity",
      "code": "\nh1 {\n  color: black;\n}\n\n.heading {\n  color: blue;\n}\n\n#title {\n  color: hotpink;\n}\n\n/* <h1 id=\"title\" class=\"heading\">Logbook</h1>\n   Hasil akhir: hotpink karena ID menang. */",
      "id": "css-vanilla-8-contoh-konflik-selector"
    },
    {
      "title": "Kesalahan Umum dalam CSS",
      "description": "Beberapa error CSS sering muncul karena kesalahan penulisan sederhana. Mengenali polanya mempercepat proses debugging.",
      "points": [
        "Missing semicolon: lupa titik koma di akhir deklarasi membuat deklarasi berikutnya ikut gagal terbaca.",
        "Invalid property name: salah ketik nama property (misalnya colr alih-alih color) membuat browser mengabaikan baris tersebut.",
        "Invalid value: memberi nilai yang tidak valid untuk property tertentu, misalnya width bernilai negatif.",
        "Unclosed braces: lupa menutup kurung kurawal blok deklarasi membuat aturan setelahnya ikut tidak terbaca dengan benar.",
        "Extra colon atau brace: menuliskan tanda titik dua atau kurung kurawal berlebih juga membuat parsing CSS gagal."
      ],
      "language": "css",
      "codeTitle": "Contoh Error CSS",
      "code": "\n/* Missing semicolon */\n.bad {\n  color: red\n  background-color: yellow;\n}\n\n/* Invalid property name */\n.bad {\n  colr: blue;\n  font-size: 16px;\n}\n\n/* Unclosed braces */\n.bad {\n  padding: 20px;\n  margin: 10px;\n\n/* Extra colon */\n.bad {\n  color:: blue;\n}",
      "id": "css-vanilla-9-kesalahan-umum-dalam-css"
    },
    {
      "title": "CSS Warna, Background, dan Border",
      "description": "Warna dan latar belakang bisa ditulis dengan beberapa format, sementara border punya beberapa property untuk mengatur gaya, warna, ketebalan, dan sudutnya.",
      "points": [
        "Warna dapat ditulis dalam format rgb (misalnya rgb(255, 99, 71)), hexadecimal (#ff6347), atau hsl (hsl(9, 100%, 64%)).",
        "background-color mengatur warna latar, sedangkan opacity mengatur tingkat transparansinya.",
        "background-image menampilkan gambar sebagai latar, dikombinasikan dengan background-repeat, background-position, background-attachment, dan background-size.",
        "border-style menentukan bentuk garis (dotted, dashed, solid, dll), sedangkan border-color, border-width, dan border-radius mengatur warna, ketebalan, dan kelengkungan sudutnya."
      ],
      "language": "css",
      "codeTitle": "Warna, Background, dan Border",
      "code": "\n.warna {\n  color: rgb(255, 99, 71);\n  background-color: #ff6347;\n  border-color: hsl(9, 100%, 64%);\n}\n\nbody {\n  background-image: url(\"gradient_bg.png\");\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-position: 50px 150px;\n  background-size: cover;\n}\n\ndiv {\n  border-style: dotted;\n  border-color: coral;\n  border-width: 7px;\n  border-radius: 5px;\n}",
      "id": "css-vanilla-10-css-warna-background-dan-border"
    },
    {
      "title": "CSS Margin, Padding, dan Ukuran Elemen",
      "description": "Margin dan padding mengatur jarak di sekitar elemen, sedangkan height dan width mengatur ukuran elemen itu sendiri.",
      "points": [
        "margin dapat ditulis dengan 1 sampai 4 nilai: 4 nilai berarti atas-kanan-bawah-kiri, 3 nilai berarti atas-kiri&kanan-bawah, 2 nilai berarti atas&bawah-kiri&kanan, dan 1 nilai berlaku untuk semua sisi.",
        "padding memiliki pola penulisan yang sama seperti margin, tetapi menambah jarak di dalam border menuju content.",
        "height dan width dapat diisi dengan satuan tetap seperti px atau satuan relatif seperti %.",
        "max-width sering dipakai bersama width: 100% agar elemen responsif tetapi tidak melebar tak terbatas di layar besar."
      ],
      "image": true,
      "imageSrc": "/assets/v.png",
      "imageLabel": "SISIPKAN GAMBAR: diagram margin, border, padding, dan content.",
      "language": "css",
      "codeTitle": "Margin, Padding, dan Ukuran",
      "code": "\np {\n  margin: 25px 50px 75px 100px;\n}\n\ndiv {\n  padding: 25px 50px;\n}\n\ndiv {\n  height: 200px;\n  width: 50%;\n  background-color: powderblue;\n}\n\n.div1 {\n  width: 100%;\n  max-width: 900px;\n  background-color: powderblue;\n}",
      "id": "css-vanilla-11-css-margin-padding-dan-ukuran-elemen"
    },
    {
      "title": "CSS Text dan Font",
      "description": "Property text dan font mengatur bagaimana teks ditampilkan, mulai dari perataan, dekorasi, hingga jenis huruf.",
      "points": [
        "text-align mengatur perataan teks (left, right, center, justify), sedangkan text-transform mengubah kapitalisasi (uppercase, lowercase, capitalize).",
        "text-decoration-line, text-decoration-color, dan text-decoration-style dipakai untuk mengatur garis pada teks seperti underline atau line-through.",
        "letter-spacing, word-spacing, dan line-height mengatur jarak antar huruf, antar kata, dan tinggi baris teks.",
        "font-family menentukan jenis huruf, font-style mengatur normal/italic, font-weight mengatur ketebalan, dan font-size mengatur ukuran huruf.",
        "Google Fonts dapat digunakan dengan menautkan link stylesheet-nya di head, lalu memanggil nama font tersebut di font-family."
      ],
      "language": "css",
      "codeTitle": "Text dan Font",
      "code": "\np {\n  text-align: center;\n  text-transform: uppercase;\n  text-decoration-line: underline;\n  letter-spacing: 2px;\n  line-height: 1.5;\n}\n\nbody {\n  font-family: 'Sofia', sans-serif;\n  font-style: italic;\n  font-weight: bold;\n  font-size: 16px;\n}",
      "id": "css-vanilla-12-css-text-dan-font"
    },
    {
      "title": "CSS Link (Pseudo-class) dan Tabel",
      "description": "Pseudo-class dipakai untuk menata elemen berdasarkan kondisi tertentu, misalnya status link atau baris tabel yang di-hover.",
      "points": [
        "a:link menata link yang belum dikunjungi, a:visited menata link yang sudah dikunjungi, a:hover menata saat kursor berada di atas link, dan a:active menata saat link sedang diklik.",
        "Pada tabel, tr:hover dipakai untuk memberi highlight saat baris tabel disorot kursor.",
        "tr:nth-child(even) dipakai untuk memberi warna berbeda pada baris genap, sehingga tabel lebih mudah dibaca (zebra striping).",
        "text-align dan vertical-align pada sel tabel (td) mengatur perataan konten secara horizontal dan vertikal."
      ],
      "language": "css",
      "codeTitle": "Pseudo-class Link dan Styling Tabel",
      "code": "\na.one:link { color: red; }\na.one:visited { color: blue; }\na.one:hover { color: orange; }\n\ntable {\n  border: 1px solid green;\n  padding: 10px;\n  width: 80%;\n}\n\ntd {\n  text-align: center;\n  vertical-align: bottom;\n}\n\ntr:hover { background-color: coral; }\ntr:nth-child(even) { background-color: #f2f2f2; }",
      "id": "css-vanilla-13-css-link-pseudo-class-dan-tabel"
    },
    {
      "title": "CSS Display dan Position",
      "description": "display mengatur bagaimana elemen ditampilkan dalam alur halaman, sedangkan position mengatur bagaimana elemen diposisikan relatif terhadap elemen lain atau viewport.",
      "points": [
        "display: block membuat elemen mengambil satu baris penuh, seperti div, h1-h6, p, form, header, footer, dan section.",
        "display: inline membuat elemen sejajar dengan teks lain tanpa baris baru, seperti span, a, dan img.",
        "display: flex dan display: grid dipakai untuk membuat layout yang lebih fleksibel dan terstruktur.",
        "visibility: hidden menyembunyikan elemen tetapi tetap menyisakan ruang kosongnya, berbeda dengan display: none yang menghilangkan elemen sepenuhnya.",
        "position: static adalah posisi default, position: relative bergeser dari posisi awalnya, position: fixed menempel pada viewport, position: absolute mengikuti parent terdekat yang memiliki posisi selain static, dan position: sticky menempel setelah melewati titik scroll tertentu."
      ],
      "image": true,
      "imageSrc": "/assets/w.png",
      "imageLabel": "SISIPKAN GAMBAR: perbandingan display none/inline/block/flex/grid dan position static/relative/fixed/absolute/sticky.",
      "language": "css",
      "codeTitle": "Display dan Position",
      "code": "\ndiv {\n  display: flex;\n}\n\n.hidden {\n  visibility: hidden;\n}\n\n.box-relative {\n  position: relative;\n}\n\n.box-absolute {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n.box-sticky {\n  position: sticky;\n  top: 0;\n}",
      "id": "css-vanilla-14-css-display-dan-position"
    },
    {
      "title": "CSS Align (Perataan Elemen)",
      "description": "Ada beberapa teknik untuk merapikan posisi elemen, teks, dan gambar secara horizontal maupun vertikal.",
      "points": [
        "margin: auto meratakan elemen block secara horizontal di tengah, asalkan elemen memiliki width yang jelas.",
        "text-align: center meratakan teks di tengah elemen.",
        "Gambar diratakan ke tengah dengan mengubahnya jadi display: block lalu memberi margin-left dan margin-right auto.",
        "display: flex dikombinasikan dengan justify-content: center dan align-items: center meratakan konten secara horizontal dan vertikal sekaligus.",
        "display: grid dengan place-items: center adalah cara singkat lain untuk membuat konten benar-benar berada di tengah container."
      ],
      "language": "css",
      "codeTitle": "Berbagai Teknik Center Align",
      "code": "\n.center-block {\n  width: 300px;\n  margin: auto;\n}\n\n.center-text {\n  text-align: center;\n}\n\n.center-image {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.center-flex {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.center-grid {\n  display: grid;\n  place-items: center;\n}",
      "id": "css-vanilla-15-css-align-perataan-elemen"
    },
    {
      "title": "Membuat Navbar dengan CSS",
      "description": "Navbar adalah salah satu komponen paling umum di halaman web, dan bisa dibuat secara vertikal maupun horizontal hanya dengan HTML dan CSS.",
      "points": [
        "Struktur dasar navbar biasanya berupa daftar link (ul > li > a) tanpa styling bawaan.",
        "Untuk navbar vertikal, list-item ditata memanjang ke bawah dengan lebar tetap, sedangkan link diberi display: block agar seluruh areanya bisa diklik.",
        "text-decoration: none dipakai untuk menghilangkan garis bawah bawaan pada link.",
        "Untuk navbar horizontal, overflow: hidden pada ul mencegah list-item keluar dari kontainer, dan float: left pada li membuat item-item sejajar ke samping.",
        "Efek hover pada a:hover memberi umpan balik visual seperti perubahan warna latar saat kursor diarahkan ke menu."
      ],
      "language": "css",
      "codeTitle": "Navbar Vertikal dan Horizontal",
      "code": "\n/* Navbar vertikal */\nul {\n  margin: 0;\n  padding: 0;\n  width: 200px;\n  background-color: #f1f1f1;\n}\nli a {\n  display: block;\n  color: black;\n  padding: 8px 16px;\n  text-decoration: none;\n}\nli a:hover {\n  background-color: #555555;\n  color: white;\n}\n\n/* Navbar horizontal */\nul.horizontal {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: #333333;\n}\nul.horizontal li {\n  float: left;\n}\nul.horizontal li a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\nul.horizontal li a:hover {\n  background-color: #111111;\n}",
      "id": "css-vanilla-16-membuat-navbar-dengan-css"
    },
    {
      "title": "Tools dan Environment Setup",
      "description": "Beberapa tools umum yang dipakai untuk menulis dan menguji kode CSS.",
      "points": [
        "Visual Studio Code sebagai teks editor untuk menulis kode HTML dan CSS.",
        "Google Chrome sebagai browser untuk menjalankan halaman web sekaligus melakukan inspect element saat debugging style."
      ],
      "id": "css-vanilla-17-tools-dan-environment-setup"
    }
  ]
}

const CSSVanilla = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default CSSVanilla