import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "G",
  "slug": "tailwind",
  "title": "Tailwind",
  "shortTitle": "Tailwind",
  "route": "/tailwind",
  "icon": "Wind",
  "summary": "Utility-first, responsive, dark mode, dan workflow komponen.",
  "accent": "from-cyan-300 via-sky-300 to-lime-300"
}

const material = {
  "title": "Tailwind",
  "subtitle": "Tailwind CSS adalah framework CSS yang berfokus pada pendekatan utility-first: banyak class kecil bertujuan tunggal yang dirangkai langsung di markup atau component untuk membangun desain kustom.",
  "overview": [
    "Utility-first membuat styling cepat, konsisten, dan dekat dengan struktur component, karena setiap keputusan visual terlihat langsung di markup.",
    "Materi ini mencakup alur kerja lengkap: instalasi, konsep dasar, perbandingan dengan CSS/Bootstrap, hingga kategori utility inti seperti warna, sizing, spacing, border, typography, background, effects, filter, transition, transform, dan interactivity.",
    "Tailwind cocok untuk React karena class dapat ditempel langsung pada JSX dan dipakai bersama state atau props, misalnya untuk dark mode atau animasi.",
    "Tantangannya adalah menjaga class tetap terbaca dan tidak menumpuk tanpa pola - karena itu materi ini juga membahas bloated class, konflik class, dan cara merapikannya lewat component extraction."
  ],
  "sections": [
    {
      "title": "Apa itu Tailwind dan Konsep Utility-First",
      "description": "Tailwind adalah framework CSS yang berfokus pada pendekatan utility-first: banyak class kecil dengan satu fungsi spesifik, digabungkan langsung di markup untuk membangun desain kustom.",
      "points": [
        "Setiap utility class hanya memetakan satu properti CSS, misalnya flex (display: flex), text-center (text-align: center), mt-4 (margin-top), atau bg-gray-200 (warna latar).",
        "Desain kustom dibuat dengan menggabungkan class-class ini langsung di HTML/JSX, tanpa menulis CSS baru atau berpindah ke file terpisah.",
        "Berbeda dari CSS konvensional yang menulis selector dan aturan dari nol, dan berbeda dari Bootstrap yang menyediakan komponen siap pakai.",
        "Nama class sengaja deskriptif dan konsisten, sehingga tim lebih mudah membaca maksud styling langsung dari markup."
      ],
      "language": "html",
      "codeTitle": "Contoh Utility Class",
      "code": "\n<div class=\"flex items-center gap-3 rounded-lg bg-gray-200 p-4 text-center\">\n  <!-- flex, items-center, gap-3: layout -->\n  <!-- rounded-lg, bg-gray-200, p-4: tampilan -->\n  <!-- text-center: perataan teks -->\n</div>",
      "id": "tailwind-1-apa-itu-tailwind-dan-konsep-utility-first"
    },
    {
      "title": "Keunggulan Tailwind",
      "description": "Empat keunggulan utama yang membuat Tailwind populer untuk membangun antarmuka modern secara cepat dan konsisten.",
      "points": [
        "Pengembangan cepat dan efisien: styling ditambahkan langsung di HTML/JSX tanpa bolak-balik ke file CSS terpisah, sehingga alur kerja lebih ringkas.",
        "Performa yang dioptimalkan: proses build otomatis membuang class CSS yang tidak dipakai, menghasilkan file CSS akhir yang jauh lebih kecil dan website lebih ringan.",
        "Responsif secara bawaan: class breakpoint (sm, md, lg, xl, 2xl) mempermudah membuat layout yang menyesuaikan berbagai ukuran layar tanpa media query manual.",
        "Fleksibilitas desain dan kustomisasi penuh: tidak dibatasi komponen bawaan, sehingga tampilan bisa didesain sepenuhnya personal sesuai kebutuhan proyek."
      ],
      "image": true,
      "imageSrc": "/assets/o.png",
      "imageLabel": "SISIPKAN GAMBAR: empat poin keunggulan Tailwind dengan ikon checklist.",
      "id": "tailwind-2-keunggulan-tailwind"
    },
    {
      "title": "Cara Kerja Tailwind",
      "description": "Tailwind bekerja lewat empat tahap: instalasi, penulisan kode, kompilasi, dan produksi. Memahami alur ini membantu menjelaskan kenapa hasil akhirnya ringan.",
      "points": [
        "Instalasi: memasang Tailwind sebagai package/plugin di proyek (npm, CLI, atau integrasi Vite).",
        "Penulisan kode: menulis HTML/JSX sambil menggabungkan utility class Tailwind langsung pada element.",
        "Kompilasi: build script memindai seluruh file project, mendeteksi class yang benar-benar dipakai, lalu menghasilkan satu file CSS akhir yang sudah dioptimalkan.",
        "Produksi: file CSS hasil kompilasi ditautkan ke HTML; ukurannya kecil karena hanya memuat class yang benar-benar dipakai."
      ],
      "id": "tailwind-3-cara-kerja-tailwind"
    },
    {
      "title": "Install Tailwind CLI dan Vite",
      "description": "Tailwind dapat dipasang sebagai CLI mandiri atau plugin di Vite. Pada proyek React modern, integrasi Vite biasanya paling nyaman.",
      "points": [
        "CLI klasik: npm install -D tailwindcss postcss autoprefixer, lalu npx tailwindcss init -p.",
        "Watch mode klasik: npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch.",
        "Vite modern: install tailwindcss dan plugin Vite, lalu import Tailwind di CSS entry.",
        "Dark mode class dipakai agar theme dapat dikontrol dari React dan localStorage.",
        "Pastikan file JSX/HTML masuk ke proses scanning agar class Tailwind tidak hilang saat build."
      ],
      "language": "bash",
      "codeTitle": "Install Tailwind",
      "code": "\nnpm install tailwindcss @tailwindcss/vite\n\n# CLI klasik jika dibutuhkan\nnpx tailwindcss init -p\nnpx tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
      "id": "tailwind-4-install-tailwind-cli-dan-vite"
    },
    {
      "title": "Tailwind vs CSS vs Bootstrap",
      "description": "Membandingkan tiga pendekatan styling membantu memilih tool yang tepat sesuai kebutuhan proyek.",
      "points": [
        "Pendekatan: Vanilla CSS menulis selector dan aturan dari awal; Tailwind berfokus pada utility class fungsi tunggal; Bootstrap berfokus pada komponen siap pakai seperti card dan button.",
        "Fleksibilitas: Vanilla CSS fleksibel tapi memakan waktu; Tailwind sangat fleksibel untuk desain yang sepenuhnya kustom; Bootstrap kurang fleksibel jika ingin tampilan berbeda dari gaya bawaan.",
        "Waktu pengerjaan: Vanilla CSS lambat karena harus menulis dan berpindah file; Tailwind mempercepat alur kerja karena styling langsung di markup; Bootstrap cepat di awal tapi bisa melambat saat perlu penyesuaian rumit.",
        "Ukuran kode: Vanilla CSS bisa membesar seiring bertambahnya aturan; Tailwind menghasilkan CSS akhir yang kecil karena class tak terpakai dihilangkan; Bootstrap sering berukuran besar karena memuat semua komponen meski tidak semua dipakai."
      ],
      "id": "tailwind-5-tailwind-vs-css-vs-bootstrap"
    },
    {
      "title": "Utility-First dan Styling Dasar",
      "description": "Contoh paling sederhana dari utility-first: membangun tombol lengkap dengan warna, teks, padding, radius, dan hover hanya lewat class.",
      "points": [
        "Setiap sifat visual tombol, warna latar, warna teks, padding, dan sudut membulat, masing-masing punya class sendiri yang tinggal digabung.",
        "State hover ditulis dengan prefix hover:, misalnya hover:bg-sky-700 membuat warna berubah lebih pekat saat mouse berada di atas tombol.",
        "Design token bawaan seperti spacing, warna, radius, dan shadow menjaga konsistensi tanpa perlu nama class custom seperti card-big-new-final.",
        "Pola ini mengurangi context-switching antara file HTML/JSX dan file CSS karena semua keputusan visual terlihat langsung di markup."
      ],
      "language": "html",
      "codeTitle": "Tombol dengan Hover",
      "code": "\n<button class=\"rounded bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700\">\n  Simpan\n</button>",
      "id": "tailwind-6-utility-first-dan-styling-dasar"
    },
    {
      "title": "Bloated Class dan Konflik Class",
      "description": "Class Tailwind bisa menjadi bloated (terlalu rumit dan bertumpuk) atau saling konflik. Memahami penyebabnya membantu menjaga markup tetap rapi.",
      "points": [
        "Bloated class adalah class CSS yang terlalu rumit, banyak aturan, atau terlalu spesifik sehingga tidak efisien dan sulit dikelola, sering tumpang tindih dengan style lain.",
        "Penyebab umum: over-specification (aturan berlebihan), redundansi, dan kurangnya prinsip desain yang konsisten sejak awal.",
        "Konflik class terjadi karena tiga faktor: spesifisitas selector (ID lebih kuat dari class, class lebih kuat dari tag), urutan cascading (aturan yang muncul terakhir menang jika spesifisitas sama), dan !important yang mengesampingkan semua aturan lain untuk properti tersebut.",
        "Contoh konflik sederhana: memakai p-4 dan p-8 sekaligus, atau text-sm dan text-lg sekaligus, pada element yang sama."
      ],
      "language": "css",
      "codeTitle": "Ilustrasi Spesifisitas",
      "code": "\n/* class kalah dari id, meski ditulis lebih akhir */\n#tombol-utama { background-color: gray; }\n.btn-primer { background-color: skyblue; }\n\n/* !important mengesampingkan semuanya */\n.btn-primer { background-color: skyblue !important; }",
      "id": "tailwind-7-bloated-class-dan-konflik-class"
    },
    {
      "title": "Unbloated Class dan Component Extraction",
      "description": "Solusinya bukan meninggalkan utility-first, tetapi menata ulang class jadi pola component yang rapi dan mudah dipakai ulang.",
      "points": [
        "Utility-first pada inline class element membuat developer tidak perlu membuat dan mengingat nama class CSS baru di setiap halaman atau komponen.",
        "Gunakan component extraction untuk UI berulang seperti Button, Card, Badge, dan Input, sehingga kombinasi class panjang cukup ditulis sekali.",
        "@apply dapat dipakai di CSS untuk pola yang benar-benar stabil, tetapi jangan berlebihan karena mengurangi keterbacaan khas utility-first.",
        "Gunakan helper className atau library merge (misalnya clsx atau tailwind-merge) jika class dinamis dari props/state sering bertabrakan."
      ],
      "language": "css",
      "codeTitle": "@apply",
      "code": "\n.btn-primary {\n  @apply rounded-2xl bg-pink-400 px-5 py-3 font-black text-zinc-950 shadow-lg transition hover:scale-105;\n}",
      "id": "tailwind-8-unbloated-class-dan-component-extraction"
    },
    {
      "title": "Responsive Design dan Breakpoint",
      "description": "Tailwind mobile-first: class tanpa prefix berlaku dari layar terkecil, lalu prefix breakpoint menimpa aturan di layar yang lebih besar.",
      "points": [
        "Tambahkan meta viewport di head agar halaman benar-benar responsif di perangkat mobile: width=device-width, initial-scale=1.0.",
        "Breakpoint bawaan: sm mulai 640px, md mulai 768px, lg mulai 1024px, xl mulai 1280px, dan 2xl mulai 1536px.",
        "Prefix breakpoint diletakkan sebelum nama utility, misalnya md:w-32 hanya aktif mulai lebar layar medium ke atas.",
        "Karena mobile-first, urutan class yang lazim ditulis dari breakpoint terkecil ke terbesar agar mudah dibaca: w-16 md:w-32 lg:w-48."
      ],
      "language": "html",
      "codeTitle": "Breakpoint pada Lebar Gambar",
      "code": "\n<!-- lebar 16 (default), 32 di layar medium, 48 di layar besar -->\n<img class=\"w-16 md:w-32 lg:w-48\" src=\"/img/mountains.jpg\" />",
      "id": "tailwind-9-responsive-design-dan-breakpoint"
    },
    {
      "title": "Dark Mode",
      "description": "Dark mode class membuat style dark: aktif ketika salah satu ancestor element memiliki class dark, cocok dikontrol lewat state React atau localStorage.",
      "points": [
        "Setiap utility berpasangan dengan versi dark:-nya, misalnya text-gray-900 dark:text-white, atau bg-white dark:bg-zinc-900.",
        "Karena strategi ini berbasis class (bukan hanya prefers-color-scheme), toggle tema bisa dikendalikan manual lewat tombol di UI.",
        "Kombinasikan dengan class disimpan di localStorage supaya preferensi tema pengguna tetap konsisten setelah reload.",
        "Terapkan dark: pada seluruh lapisan visual yang relevan: warna teks, warna latar, dan warna border agar transisinya konsisten."
      ],
      "language": "html",
      "codeTitle": "Kartu dengan Dark Mode",
      "code": "\n<h3 class=\"mt-5 text-base font-medium text-gray-900 dark:text-white\">\n  Writes upside-down\n</h3>\n<p class=\"mt-2 text-sm text-gray-500 dark:text-gray-400\">\n  The Zero Gravity Pen can be used to write in any orientation.\n</p>",
      "id": "tailwind-10-dark-mode"
    },
    {
      "title": "Warna: Skala dan Palet",
      "description": "Setiap warna Tailwind punya skala bertingkat, dari paling terang sampai paling gelap, memudahkan konsistensi tanpa menebak kode hex.",
      "points": [
        "Skala warna berjalan dari 50 (paling terang) naik bertahap 100, 200, ... hingga 900 dan 950 (paling gelap/pekat).",
        "Tailwind menyediakan belasan keluarga warna bawaan, di antaranya slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, dan blue.",
        "Nama keluarga warna yang mirip (slate, gray, zinc, neutral, stone) sama-sama netral tapi punya undertone berbeda, cocok dipilih sesuai mood desain.",
        "Karena skalanya konsisten di semua keluarga warna, mengganti tema warna cukup mengganti nama keluarganya saja, misalnya dari sky-500 ke violet-500."
      ],
      "language": "html",
      "codeTitle": "Skala Warna Sky",
      "code": "\n<div class=\"flex\">\n  <div class=\"h-10 w-10 bg-sky-100\"></div>\n  <div class=\"h-10 w-10 bg-sky-300\"></div>\n  <div class=\"h-10 w-10 bg-sky-500\"></div>\n  <div class=\"h-10 w-10 bg-sky-700\"></div>\n  <div class=\"h-10 w-10 bg-sky-900\"></div>\n</div>",
      "id": "tailwind-11-warna-skala-dan-palet"
    },
    {
      "title": "Warna: Kategori Utility dan Opacity",
      "description": "Warna tidak cuma untuk background dan teks. Tailwind punya belasan kategori utility warna, plus modifier opacity lewat garis miring.",
      "points": [
        "Kategori utama: bg-* (latar), text-* (teks), border-* (border), outline-* (outline), ring-* (ring shadow), fill-* dan stroke-* (elemen SVG).",
        "Kategori lanjutan: decoration-* (warna garis dekorasi teks), shadow-* dan inset-shadow-* (warna box shadow), accent-* (warna form control), dan caret-* (warna kursor input).",
        "Tambahkan modifier /angka setelah nama warna untuk mengatur opacity, misalnya text-blue-600/75 berarti warna teks blue-600 dengan opacity 75%.",
        "Modifier opacity yang sama juga berlaku untuk border dan background, misalnya border-rose-600/50 atau bg-indigo-500/80."
      ],
      "language": "html",
      "codeTitle": "Opacity Modifier",
      "code": "\n<p class=\"text-blue-600/100\">Opacity 100%</p>\n<p class=\"text-blue-600/75\">Opacity 75%</p>\n<p class=\"text-blue-600/50\">Opacity 50%</p>\n<p class=\"text-blue-600/25\">Opacity 25%</p>",
      "id": "tailwind-12-warna-kategori-utility-dan-opacity"
    },
    {
      "title": "Sizing",
      "description": "Utility sizing mengatur lebar dan tinggi element, baik lewat pecahan proporsional, angka skala tetap, maupun ukuran teks.",
      "points": [
        "Lebar proporsional pakai pecahan, misalnya w-1/2, w-1/3, w-2/3, w-1/4, w-3/4, hingga w-full untuk 100% lebar parent.",
        "Lebar tetap pakai angka skala spacing, misalnya w-24 atau w-96; setiap angka mewakili kelipatan 0.25rem (w-24 = 6rem, w-96 = 24rem).",
        "Kombinasi w-* dan h-* juga bisa diringkas dengan size-* untuk mengatur lebar dan tinggi sekaligus dalam satu class.",
        "Ukuran teks memakai skala tersendiri: text-sm, text-base, text-lg, text-xl, hingga text-2xl dan seterusnya."
      ],
      "image": true,
      "imageSrc": "/assets/p.png",
      "imageLabel": "SISIPKAN GAMBAR: empat poin keunggulan Tailwind dengan ikon checklist.",
      "language": "html",
      "codeTitle": "Lebar Proporsional dan Tetap",
      "code": "\n<div class=\"flex\">\n  <div class=\"w-1/3 bg-purple-500\">w-1/3</div>\n  <div class=\"w-2/3 bg-purple-400\">w-2/3</div>\n</div>\n<div class=\"w-48 bg-blue-500\">w-48</div>",
      "id": "tailwind-13-sizing"
    },
    {
      "title": "Spacing: Margin, Padding, dan Space Between",
      "description": "Margin dan padding memakai pola awalan yang sama: m untuk margin, p untuk padding, diikuti arah (t, r, b, l, x, y) dan angka skala.",
      "points": [
        "Margin: m-8 di semua sisi, atau arah spesifik seperti mt-6 (top), mr-4 (right), mb-8 (bottom), ml-2 (left).",
        "Padding memakai pola identik: p-8 di semua sisi, atau pt-6, pr-4, pb-8, pl-2 untuk sisi tertentu.",
        "Untuk jarak antar-children dalam satu container, pakai space-x-4 (horizontal) atau space-y-4 (vertical) alih-alih memberi margin ke setiap child.",
        "Di layout flex/grid modern, gap-4 sering jadi alternatif space-x/y karena bekerja merata di kedua arah sekaligus."
      ],
      "language": "html",
      "codeTitle": "Margin, Padding, Space Between",
      "code": "\n<div class=\"flex space-x-4\">\n  <div class=\"p-4\">01</div>\n  <div class=\"p-4\">02</div>\n  <div class=\"p-4\">03</div>\n</div>\n<div class=\"mt-6 mb-8\">Konten dengan jarak atas-bawah</div>",
      "id": "tailwind-14-spacing-margin-padding-dan-space-between"
    },
    {
      "title": "Position dan Display",
      "description": "Utility position dan display mengatur bagaimana element ditempatkan dan disusun relatif terhadap element lain.",
      "points": [
        "Nilai position: static (default), relative, absolute, fixed, dan sticky, dipakai bersama top-*, right-*, bottom-*, left-* untuk menggeser posisi.",
        "Element dengan absolute mengikuti ancestor terdekat yang punya relative atau static custom, contohnya badge kecil di pojok kartu.",
        "Nilai display umum: flex dan inline-flex untuk layout satu baris/kolom fleksibel, grid untuk layout dua dimensi, hidden untuk menyembunyikan element, dan block untuk element blok biasa.",
        "items-center dan justify-* dipakai bersama flex atau grid untuk mengatur perataan vertikal dan horizontal konten, seperti avatar sejajar dengan nama dan jabatan."
      ],
      "language": "html",
      "codeTitle": "Absolute di Atas Static",
      "code": "\n<div class=\"static rounded-lg bg-purple-100 p-6\">\n  <p>Static parent</p>\n  <div class=\"absolute bottom-0 left-0 rounded bg-purple-600 px-3 py-1 text-white\">\n    Absolute child\n  </div>\n</div>",
      "id": "tailwind-15-position-dan-display"
    },
    {
      "title": "Border dan Radius",
      "description": "Border punya kontrol granular untuk ketebalan, arah, warna, gaya garis, dan sudut membulat, masing-masing lewat class terpisah.",
      "points": [
        "Ketebalan border: border (1px), border-2, border-4, hingga border-8; bisa diarahkan ke sisi tertentu dengan border-t-4, border-r-4, border-b-4, atau border-l-4.",
        "divide-x-4 menambahkan garis pembatas otomatis di antara children dalam satu container, tanpa perlu border manual di tiap item.",
        "Sudut membulat diatur lewat rounded-sm hingga rounded-xl untuk semua sudut, atau per sisi/sudut seperti rounded-t-lg, rounded-tl-lg, dan rounded-br-lg.",
        "Gaya garis border-solid, border-dashed, border-dotted, dan border-double juga tersedia untuk outline lewat outline-solid, outline-dashed, dan seterusnya, lengkap dengan outline-offset."
      ],
      "language": "html",
      "codeTitle": "Border dan Rounded",
      "code": "\n<div class=\"rounded-t-lg border-4 border-dashed border-indigo-500 p-4\">\n  Kartu dengan border dashed dan sudut atas membulat\n</div>",
      "id": "tailwind-16-border-dan-radius"
    },
    {
      "title": "Typography Lanjutan",
      "description": "Selain ukuran dasar, Tailwind punya utility typography untuk font family, transformasi teks, perataan, dekorasi, dan rasio font-size/line-height.",
      "points": [
        "Font family: font-sans, font-serif, dan font-mono untuk tiga gaya huruf dasar.",
        "Transform teks: uppercase, lowercase, capitalize, dan normal-case untuk membatalkan transformasi.",
        "Dekorasi teks: underline, overline, dan line-through, plus italic untuk teks miring.",
        "Perataan vertikal: align-baseline, align-top, align-middle, align-bottom; perataan horizontal termasuk text-justify.",
        "Nilai arbitrary seperti text-[14px] dipakai untuk ukuran di luar skala bawaan, sedangkan rasio text-sm/6 menetapkan font-size dan line-height sekaligus dalam satu class."
      ],
      "language": "html",
      "codeTitle": "Transform dan Dekorasi Teks",
      "code": "\n<p class=\"uppercase\">the quick brown fox</p>\n<p class=\"underline\">The quick brown fox</p>\n<p class=\"line-through\">The quick brown fox</p>",
      "id": "tailwind-17-typography-lanjutan"
    },
    {
      "title": "Background",
      "description": "Background di Tailwind bukan cuma warna polos, ada posisi, perulangan, ukuran, attachment, hingga gradient linear dengan sudut custom.",
      "points": [
        "Gambar latar pakai arbitrary value bg-[url(...)], lalu diatur posisinya dengan bg-top, bg-center, bg-bottom-right, dan kombinasi lain.",
        "bg-fixed membuat background diam saat halaman discroll, bg-local ikut scroll di dalam element itu sendiri, bg-scroll adalah perilaku default.",
        "Perulangan pola diatur dengan bg-repeat, bg-repeat-x, bg-repeat-y, atau bg-repeat-space untuk jarak antar pengulangan yang rata.",
        "Ukuran gambar memakai bg-cover (memenuhi area, bisa terpotong), bg-contain (utuh tanpa terpotong), atau bg-auto dengan bg-no-repeat.",
        "Gradient linear ditulis dengan bg-linear-to-r, bg-linear-to-t, bg-linear-to-bl (arah), atau bg-linear-65 (sudut custom dalam derajat), dikombinasikan dengan from-* dan to-* untuk warna."
      ],
      "language": "html",
      "codeTitle": "Gradient Linear",
      "code": "\n<div class=\"h-14 rounded bg-linear-to-r from-cyan-500 to-blue-500\"></div>\n<div class=\"h-14 rounded bg-linear-65 from-purple-500 to-pink-500\"></div>",
      "id": "tailwind-18-background"
    },
    {
      "title": "Effects dan Filter",
      "description": "Kategori effects dan filter menambahkan shadow, mask, blur, dan penyesuaian warna gambar tanpa perlu editor gambar terpisah.",
      "points": [
        "shadow-md, shadow-lg, shadow-xl mengatur box-shadow; text-shadow-2xs hingga text-shadow-lg mengatur shadow khusus untuk teks.",
        "Utility mask-t-from-*, mask-r-from-*, mask-l-from-*-to-*, dan mask-b-from-*-to-* membuat efek fade/gradasi transparan di tepi gambar.",
        "bg-clip-text dikombinasikan dengan text-transparent dan gradient background menghasilkan teks bergradasi warna.",
        "Filter gambar: blur-none sampai blur-2xl, grayscale, invert, hue-rotate-*, dan brightness-* untuk mengubah tampilan tanpa mengedit file aslinya.",
        "backdrop-blur dan backdrop-grayscale menerapkan filter pada apa yang ada di belakang element (bukan element itu sendiri), cocok untuk efek kaca buram (glassmorphism)."
      ],
      "language": "html",
      "codeTitle": "Filter Gambar",
      "code": "\n<img class=\"grayscale hover:grayscale-0\" src=\"/img/mountains.jpg\" />\n<img class=\"blur-sm hover:blur-none\" src=\"/img/mountains.jpg\" />",
      "id": "tailwind-19-effects-dan-filter"
    },
    {
      "title": "Transition, Transform, dan Animasi",
      "description": "Transition membuat perubahan state jadi halus, transform mengubah posisi/ukuran/rotasi element, dan animate-* menyediakan animasi berulang siap pakai.",
      "points": [
        "transition-colors, transition-opacity, transition-shadow, dan transition-transform membatasi transisi hanya pada properti tertentu; transition-all mencakup semua properti.",
        "duration-* mengatur lama transisi dan delay-* mengatur jeda sebelum transisi mulai; easing seperti ease-in, ease-out, dan ease-in-out mengatur percepatan gerak.",
        "Transform dasar: rotate-45 untuk memutar, scale-125 untuk memperbesar, dan translate-8 untuk menggeser posisi element.",
        "Untuk rotasi 3D per sumbu, gunakan rotate-x-*, rotate-y-*, dan rotate-z-* secara bersamaan.",
        "Class animate-spin (berputar terus), animate-ping (efek radar/notifikasi), animate-pulse (berkedip halus), dan animate-bounce (memantul) siap dipakai tanpa menulis keyframe sendiri."
      ],
      "code": "\n<button class=\"scale-100 transition-transform duration-300 ease-in-out hover:scale-110\">\n  Hover aku\n</button>\n<span class=\"inline-block h-3 w-3 animate-ping rounded-full bg-sky-500\"></span>",
      "id": "tailwind-20-transition-transform-dan-animasi"
    },
    {
      "title": "Interactivity",
      "description": "Utility interactivity menyesuaikan tampilan elemen form dan kursor sesuai state-nya, membuat interaksi terasa lebih hidup.",
      "points": [
        "accent-* mengubah warna bawaan checkbox dan radio button, misalnya accent-pink-500.",
        "cursor-pointer, cursor-progress, dan cursor-not-allowed mengubah bentuk kursor sesuai state tombol (aktif, memproses, atau disabled).",
        "caret-* mengatur warna kursor blink pada input/textarea, misalnya caret-pink-500.",
        "field-sizing-fixed mengunci ukuran textarea agar tidak otomatis membesar mengikuti panjang teks yang diketik."
      ],
      "language": "html",
      "codeTitle": "Cursor dan Accent Color",
      "code": "\n<input type=\"checkbox\" class=\"accent-pink-500\" checked />\n<button class=\"cursor-not-allowed opacity-50\" disabled>Confirm</button>",
      "id": "tailwind-21-interactivity"
    },
    {
      "title": "Motion dan Interactivity",
      "description": "Tailwind menyediakan transition dan transform dasar. Untuk animasi page transition atau scroll reveal, kombinasikan dengan Framer Motion.",
      "points": [
        "Gunakan transition-all atau transition-colors untuk perubahan halus.",
        "Gunakan duration-* dan ease-* untuk mengatur tempo.",
        "Transform seperti scale, translate, rotate, dan skew dapat dipicu oleh hover atau focus.",
        "Gunakan animate-* untuk animasi bawaan seperti pulse dan spin jika dibutuhkan.",
        "Untuk motion kompleks, gunakan motion.div, whileHover, initial, animate, exit, dan whileInView dari Framer Motion."
      ],
      "language": "jsx",
      "codeTitle": "Tailwind + Framer Motion",
      "code": "\n<motion.div\n  initial={{ opacity: 0, y: 24 }}\n  whileInView={{ opacity: 1, y: 0 }}\n  whileHover={{ scale: 1.03 }}\n  className=\"rounded-2xl border bg-white p-6 shadow-lg dark:bg-zinc-900\"\n>\n  Konten materi\n</motion.div>",
      "id": "tailwind-22-motion-dengan-framer-motion"
    },
    {
      "title": "Tools dan Environment Setup",
      "description": "Tools pendukung yang dipakai selama pelatihan untuk menulis, melihat, dan menjalankan proyek Tailwind.",
      "points": [
        "VS Code sebagai code editor utama untuk menulis HTML/JSX dan class Tailwind.",
        "Google Chrome untuk menjalankan dan memeriksa hasil tampilan lewat DevTools.",
        "Node.js sebagai runtime yang dibutuhkan untuk menjalankan npm dan proses build Tailwind.",
        "Dokumentasi resmi di https://tailwindcss.com/ jadi rujukan utama untuk daftar lengkap utility class dan konfigurasi lanjutan."
      ],
      "id": "tailwind-23-tools-dan-environment-setup"
    }
  ]
}

const Tailwind = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default Tailwind