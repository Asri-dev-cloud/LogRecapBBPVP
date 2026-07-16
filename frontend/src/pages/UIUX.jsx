import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "A",
  "slug": "uiux",
  "title": "Cara Mengimplementasikan UI/UX",
  "shortTitle": "UI/UX",
  "route": "/uiux",
  "icon": "Palette",
  "summary": "Design thinking dari riset user sampai usability testing.",
  "accent": "from-pink-400 via-lime-300 to-cyan-300"
}

const material = {
  "title": "Cara Mengimplementasikan UI/UX",
  "subtitle": "UI/UX bukan sekadar tampilan cantik. Materi ini memandu proses design thinking mulai dari elemen visual, prinsip desain, warna, dan tipografi, hingga riset user dan usability testing, agar produk punya alasan, alur, dan pengalaman yang jelas untuk user.",
  "overview": [
    "UI berfokus pada elemen visual dan interaksi seperti layout, warna, tombol, form, ikon, dan state.",
    "UX berfokus pada pengalaman menyeluruh: kebutuhan user, kemudahan alur, konteks penggunaan, serta keberhasilan menyelesaikan tugas.",
    "Fondasi UI seperti prinsip visual desain, pemilihan warna, tipografi, dan ikonografi dibahas lebih dulu, sebelum masuk ke proses UX secara menyeluruh.",
    "Design thinking membantu tim bergerak dari masalah nyata menuju solusi yang diuji, bukan sekadar asumsi desain, lengkap dengan contoh tools seperti Figma."
  ],
  "sections": [
    {
      "title": "Apa itu UI dan UX",
      "description": "Perancangan desain web adalah proses perencanaan, penyusunan, dan pembentukan elemen visual suatu situs web. Proses ini menggabungkan seni dan teknologi untuk menciptakan estetika (UI) sekaligus memastikan situs mudah digunakan (UX).",
      "points": [
        "User Interface (UI) adalah aspek visual dari produk digital yang berhubungan langsung dengan pengguna, berfokus pada visual dan estetika desain seperti warna, tipografi, dan tata letak.",
        "User Experience (UX) adalah pengalaman pengguna secara keseluruhan saat menggunakan produk, berfokus pada kemudahan navigasi, alur penggunaan, dan kepuasan pengguna.",
        "Tugas utama UI adalah merancang elemen visual yang menarik dan intuitif, sedangkan tugas utama UX adalah merancang pengalaman yang efisien dan memuaskan.",
        "UI lebih banyak melibatkan desain grafis dan estetika, sementara UX melibatkan riset, analisis kebutuhan pengguna, hingga pengujian atau testing.",
        "UI dan UX saling melengkapi: tampilan yang indah tanpa pengalaman yang baik akan sulit digunakan, begitu juga sebaliknya."
      ],
      "id": "uiux-1-apa-itu-ui-dan-ux"
    },
    {
      "title": "Elemen User Interface",
      "description": "UI berfokus pada cara elemen-elemen desain ditampilkan kepada pengguna. Ada lima elemen utama yang membentuk sebuah antarmuka yang baik.",
      "points": [
        "Visual Design: elemen visual seperti warna, tipografi, gambar, dan ikon.",
        "Layout: penempatan elemen di layar sesuai unsur keseimbangan, kesatuan, dan kontras.",
        "Interaksi: elemen interaktif seperti tombol, formulir, pop up, dan sejenisnya.",
        "Informasi: mengutamakan hierarki informasi agar konten penting mudah ditemukan.",
        "Konsistensi: mempermudah user saat berpindah halaman atau fitur karena pola yang sama dipakai berulang."
      ],
      "id": "uiux-2-elemen-user-interface"
    },
    {
      "title": "Prinsip Visual Desain: Alignment, Repetition, Contrast",
      "description": "Prinsip visual desain adalah aturan yang dipegang untuk mempermudah proses pembuatan desain yang efektif dan menarik.",
      "points": [
        "Alignment (perataan): prinsip desain paling dasar namun paling penting, karena memungkinkan mata melihat keteraturan dan memberi kenyamanan bagi user.",
        "Repetition (pengulangan): bertujuan memperkuat desain dengan mengikat bagian-bagian yang terpisah, sehingga menciptakan asosiasi, identitas, dan konsistensi di seluruh halaman.",
        "Contrast (kontras): prinsip paling efektif untuk menciptakan penekanan pada desain. Kontras tercipta ketika dua elemen berlawanan total, misalnya ukuran besar/kecil, font klasik/kontemporer, garis tipis/tebal, atau warna gelap/terang.",
        "Ketiga prinsip ini biasa dipakai bersamaan: alignment merapikan, repetition menyatukan, dan contrast menonjolkan bagian yang penting."
      ],
      "image": true,
      "imageSrc": "/assets/g.png",
      "imageLabel": "SISIPKAN GAMBAR: perbandingan good alignment vs poor alignment, dan contoh desain dengan contrast tinggi.",
      "id": "uiux-3-prinsip-visual-alignment-repetition-contrast"
    },
    {
      "title": "Prinsip Visual Desain: Balance dan Hierarchy",
      "description": "Selain alignment, repetition, dan contrast, balance dan hierarchy juga berperan penting agar desain enak dilihat dan mudah dibaca.",
      "points": [
        "Balance (keseimbangan): memberikan stabilitas dan struktur pada desain, baik melalui simetri (symmetry) maupun tegangan elemen atau asimetri (tension).",
        "Balance simetris menempatkan elemen secara seimbang di kedua sisi sumbu sehingga memberi kesan formal dan tenang.",
        "Balance asimetris menempatkan elemen berbeda ukuran atau posisi namun tetap terasa seimbang secara visual, sehingga memberi kesan dinamis.",
        "Hierarchy (hierarki): menciptakan organisasi visual pada desain dan memberi user gagasan tentang di mana harus memulai dan menyelesaikan membaca.",
        "Setiap elemen desain dapat diberi peringkat prioritas, misalnya lewat ukuran, ketebalan huruf, atau warna, sehingga informasi paling penting terbaca lebih dulu."
      ],
      "id": "uiux-4-prinsip-visual-balance-hierarchy"
    },
    {
      "title": "Pemilihan Warna",
      "description": "Pemilihan warna yang tepat dapat memberikan pengaruh berbeda pada pemikiran, perilaku, dan suasana hati pengguna karena setiap warna memiliki emosi psikologi tersendiri.",
      "points": [
        "Setiap warna membawa emosi berbeda, misalnya merah untuk cinta/energi/bahaya, biru untuk kepercayaan/ketenangan, kuning untuk keramahan/perhatian, dan hijau untuk kehidupan/alam.",
        "Warna dapat diatur lewat tiga komponen: Hue (jenis warna), Lightness (tingkat terang-gelap), dan Saturation (tingkat kemurnian warna). Warna gelap dengan saturasi tinggi memberi kesan kuat (strong feeling), sedangkan warna terang dengan saturasi rendah memberi kesan lembut (soft feeling).",
        "Gunakan aturan 60-30-10: 60% warna netral untuk background, 30% warna utama untuk elemen besar seperti app bar dan menu, serta 10% warna aksen untuk elemen kecil seperti tombol dan toggle.",
        "Kenali istilah Tint (hue + putih), Tone (hue + putih & hitam), dan Shade (hue + hitam) untuk membuat variasi dari satu warna dasar.",
        "Palet Complementary (warna berseberangan, kontras tinggi) dan Analogous (tiga warna berdekatan yang senada) cocok dipakai kalau ingin kesan sangat kontras atau justru harmonis.",
        "Palet Triadic (tiga warna membentuk segitiga, vibrant), Split Complementary (warna berseberangan dengan salah satu ujung dipisah), dan Tetradic (empat warna membentuk segi empat) cocok untuk desain yang ingin tampil lebih beragam.",
        "Gunakan tools seperti colorsupplyyy.com untuk membuat kombinasi warna dengan lebih mudah dan cepat."
      ],
      "id": "uiux-5-pemilihan-warna"
    },
    {
      "title": "Typografi",
      "description": "Typografi adalah teknik menyusun teks agar komunikasi visual menjadi efektif, nyaman dibaca (readable), dan mampu menyampaikan pesan yang tepat kepada audience.",
      "points": [
        "Kenali anatomi huruf seperti ascender, descender, baseline, x-height, counter, dan spine untuk memahami cara sebuah font dibentuk.",
        "Kerning adalah jarak antar satu huruf dengan huruf lainnya, tracking adalah jarak antar huruf dalam satu kata atau kalimat, dan leading adalah jarak antar baris teks.",
        "Serif memiliki 'kaki/sirip' kecil di ujung huruf dan memberi kesan formal, klasik, terpercaya, seperti Times New Roman atau Garamond.",
        "Sans Serif adalah font modern tanpa kaki, memberi kesan bersih, minimalis, dan efisien, seperti Arial, Helvetica, atau Calibri.",
        "Script menyerupai tulisan tangan dan memberi kesan elegan, personal, feminin, sedangkan Display/Decorative punya bentuk unik yang cocok untuk judul besar.",
        "Font pairing adalah teknik menggabungkan dua atau tiga font berbeda agar terlihat serasi. Kombinasi paling aman adalah menduetkan font Serif untuk judul dengan font Sans Serif untuk body text, atau sebaliknya, dan hindari menggabungkan dua font yang terlalu mirip."
      ],
      "id": "uiux-6-typografi"
    },
    {
      "title": "Panduan Penulisan Teks dan Ikonografi",
      "description": "Penulisan teks yang baik dan penggunaan ikon yang tepat membantu pesan tersampaikan lebih cepat dan nyaman dibaca oleh pengguna.",
      "points": [
        "Susun urutan baca dengan hierarki ukuran huruf yang jelas: bagian yang ingin dibaca pertama dibuat paling besar atau tebal, lalu bagian pendukung dibuat lebih kecil.",
        "Sejajarkan (align) posisi teks dengan komposisi gambar di sekitarnya agar terlihat rapi dan tidak asal tempel.",
        "Pilih font yang sesuai konteks; font dekoratif yang sulit dibaca sebaiknya dihindari untuk judul atau isi yang penting dibaca dengan cepat.",
        "Perhatikan penempatan teks agar tidak menabrak objek utama pada gambar, dan pastikan kontras warna teks terhadap background cukup tinggi supaya tetap terbaca.",
        "Ikonografi adalah ilmu yang mempelajari cara mengidentifikasi, mendeskripsikan, dan menginterpretasi sebuah konten dalam gambar atau simbol.",
        "Fungsi ikonografi: menghemat tempat dibanding teks panjang, membuat tampilan aplikasi lebih menarik, efisien dan cepat dikenali pengguna, serta mengubah ide kompleks menjadi visual yang sederhana."
      ],
      "id": "uiux-7-panduan-teks-ikonografi"
    },
    {
      "title": "User Experience",
      "description": "UX berhubungan dengan pengalaman pengguna secara keseluruhan saat menggunakan produk, mencakup kemudahan navigasi, responsivitas, dan seberapa efektif produk memenuhi kebutuhan pengguna.",
      "points": [
        "User-Centered Design: seluruh proses desain berfokus pada kebutuhan pengguna, bukan asumsi tim desain semata.",
        "Usability: kemudahan dalam menggunakan aplikasi, mencakup Learnability (mudah dipelajari), Efficiency (efisien dipakai), Memorability (mudah diingat), Error Prevention (mencegah kesalahan), dan Satisfaction (memuaskan).",
        "Accessibility: memastikan aplikasi dapat digunakan oleh semua orang, termasuk pengguna dengan keterbatasan tertentu.",
        "10 Prinsip Usability Nielsen (1-5): Visibility of System Status (sistem selalu memberi feedback), Match Between System and Real World (gunakan bahasa yang dipahami user), User Control and Freedom (sediakan tombol back/cancel), Consistency and Standards (gunakan pola yang konsisten), dan Error Prevention (cegah kesalahan sebelum terjadi).",
        "10 Prinsip Usability Nielsen (6-10): Recognition Rather Than Recall (kurangi kebutuhan mengingat), Flexibility and Efficiency (mendukung pengguna pemula dan mahir), Minimalist Design (hindari elemen yang tidak perlu), Error Recovery (pesan error harus jelas), dan Help and Documentation (sediakan bantuan jika diperlukan)."
      ],
      "image": true,
      "imageSrc": "../assets/h.png",
      "imageLabel": "SISIPKAN GAMBAR: ilustrasi UX strategy seperti user persona, user journey, accessibility, dan testing.",
      "id": "uiux-8-user-experience"
    },
    {
      "title": "UX Metrics",
      "description": "Agar hasil desain tidak hanya dinilai dari feeling, keberhasilan UX perlu diukur dengan metrik yang jelas.",
      "points": [
        "Task Success Rate: persentase pengguna yang berhasil menyelesaikan tugas, dengan rumus (Jumlah Berhasil / Total Pengguna) × 100%.",
        "Time on Task: waktu yang dibutuhkan pengguna untuk menyelesaikan sebuah tugas; semakin efisien alurnya, biasanya waktu semakin singkat.",
        "Error Rate: jumlah kesalahan yang dilakukan pengguna saat mencoba menyelesaikan tugas.",
        "System Usability Scale (SUS): metode pengukuran usability memakai 10 pertanyaan standar, dengan skor di atas 80 dikategorikan Excellent, 68-80 Good, dan di bawah 68 berarti perlu perbaikan."
      ],
      "id": "uiux-9-ux-metrics"
    },
    {
      "title": "Empathize - Memahami User",
      "description": "Tahap empathize dipakai untuk melihat masalah dari sudut pandang user lewat pertanyaan What, Who, Why, When, Where, dan How. Tujuannya mengumpulkan fakta tentang kebutuhan, motivasi, hambatan, dan kebiasaan user.",
      "points": [
        "Mulai dari riset user: tentukan target user, konteks penggunaan, perangkat yang dipakai, dan tugas utama yang ingin diselesaikan.",
        "Gunakan interview singkat dengan pertanyaan terbuka seperti \"biasanya kesulitan di bagian mana?\" dan \"apa tanda bahwa proses ini berhasil?\".",
        "Lengkapi dengan observasi, survei, Focus Group Discussion (FGD), review aplikasi sejenis, dan analisis data penggunaan bila sudah ada produk berjalan.",
        "Catat pain point, goal, emosi user, kata-kata yang sering muncul, dan situasi yang membuat user berhenti.",
        "Output tahap ini berupa User Persona, yaitu profil fiktif yang mewakili target pengguna lengkap dengan demografi, karakteristik, tujuan, perilaku belanja, dan hambatan. Contohnya persona \"Andini, Si Pemburu Diskon yang Praktis\": wanita 24 tahun, tech-savvy, ingin belanja pakaian kerja dengan cepat, dan kesal jika ukuran baju tidak jelas."
      ],
      "image": true,
      "imageSrc": "/assets/j.png",
      "imageLabel": "SISIPKAN GAMBAR: empathy map, hasil user interview, atau contoh kartu user persona lengkap.",
      "id": "uiux-10-empathize-memahami-user"
    },
    {
      "title": "Define - Merumuskan Masalah",
      "description": "Define mengubah hasil riset menjadi masalah yang tajam lewat User Story dan User Journey. Masalah yang baik harus spesifik, berorientasi user, dan bisa diuji.",
      "points": [
        "Rumuskan User Story dengan format \"Sebagai [peran], saya ingin [tujuan], sehingga [manfaat]\". Contoh: \"Sebagai pelanggan yang sibuk, saya ingin membayar menggunakan E-wallet atau QRIS, sehingga saya bisa menyelesaikan transaksi secara instan tanpa perlu transfer manual.\"",
        "Petakan User Journey untuk melihat seluruh perjalanan pengguna, mulai dari Awareness (kesadaran), Consideration (pertimbangan), Purchase (pembelian), Retention (menunggu paket), hingga Advocacy (pasca pembelian).",
        "Di setiap tahap User Journey, catat tindakan pengguna, perasaan pengguna, dan masalah yang dihadapi. Misalnya di tahap Consideration, pengguna merasa \"bingung dan teliti\" karena deskripsi ukuran produk tidak jelas.",
        "Prioritaskan masalah memakai matriks impact versus effort agar tim tidak langsung mengerjakan semua hal sekaligus.",
        "Tentukan success metric seperti waktu menyelesaikan tugas, error rate, conversion rate, task completion, atau kepuasan user.",
        "Hasil define menjadi batas desain: fitur apa yang penting, informasi apa yang harus tampil, dan alur mana yang wajib mulus."
      ],
      "image": true,
      "imageSrc": "/assets/k.png",
      "imageLabel": "SISIPKAN GAMBAR: contoh user story, dan tabel user journey map lengkap dengan tahapan serta emosi pengguna.",
      "id": "uiux-11-define-merumuskan-masalah"
    },
    {
      "title": "Ideate - Menghasilkan Alternatif Solusi",
      "description": "Ideate adalah proses membuka kemungkinan solusi. Jangan cepat puas dengan solusi pertama karena biasanya masih terlalu dekat dengan asumsi awal.",
      "points": [
        "Gunakan brainstorming untuk mengumpulkan banyak ide tanpa menilai terlalu cepat.",
        "Pakai mind map untuk melihat hubungan antara kebutuhan user, fitur, data, dan langkah interaksi.",
        "Gunakan Crazy 8: lipat kertas menjadi 8 bagian lalu buat 8 alternatif layar atau flow dalam waktu singkat.",
        "Rumuskan solusi konkret dari hasil riset, misalnya desain wajib mobile (responsif dan cepat diakses), menyediakan size chart yang detail, serta fitur checkout cepat tanpa daftar akun (guest checkout) yang mendukung dompet digital (E-wallet).",
        "Gambarkan alur sistem lewat Use Case Diagram, yang memetakan interaksi antara aktor (pengunjung, pelanggan, admin) dengan fitur seperti mengelola keranjang, checkout, atau melacak pengiriman.",
        "Susun Sitemap untuk merancang struktur halaman secara menyeluruh, misalnya halaman utama, kategori produk, halaman produk, halaman informasi, hingga halaman akun dan transaksi.",
        "Gabungkan ide yang kuat, buang yang tidak sesuai dengan masalah utama, lalu pilih solusi berdasarkan value dan feasibility."
      ],
      "image": true,
      "imageSrc": "/assets/l.png",
      "imageLabel": "SISIPKAN GAMBAR: hasil brainstorming atau Crazy 8, use case diagram, dan struktur sitemap.",
      "id": "uiux-12-ideate-menghasilkan-alternatif-solusi"
    },
    {
      "title": "Prototype - Low-fi, Mid-fi, Hi-fi",
      "description": "Prototype membuat ide menjadi bentuk yang bisa dicoba. Level fidelity dipilih sesuai tujuan: validasi alur, validasi layout, atau presentasi visual akhir.",
      "points": [
        "Low-fi: sketsa kertas atau wireframe kasar untuk menguji urutan informasi dan alur dasar. Tools: kertas, FigJam, Whimsical, Balsamiq.",
        "Mid-fi: wireframe digital dengan struktur lebih rapi, komponen dasar, dan hierarki konten yang lebih jelas. Tools: Figma, Adobe XD, Sketch.",
        "Hi-fi: tampilan mendekati produk asli dengan warna, tipografi, ikon, spacing, state, dan prototype yang bisa diklik (clickable). Tools: Figma, Framer, ProtoPie.",
        "Prototype harus fokus pada task utama, bukan seluruh sistem. Pilih skenario seperti login, cari produk, isi form, atau checkout.",
        "Tambahkan state penting seperti empty state, loading, error, success, hover, disabled, dan tampilan mobile."
      ],
      "image": true,
      "imageSrc": "/assets/m.png",
      "imageLabel": "SISIPKAN GAMBAR: rangkaian sketsa, wireframe, dan hi-fi prototype untuk satu alur yang sama.",
      "id": "uiux-13-prototype-low-fi-mid-fi-hi-fi"
    },
    {
      "title": "Test - Usability Testing dan Iterasi",
      "description": "Testing memastikan desain bekerja untuk user nyata dengan melakukan usability testing. Hasil test digunakan untuk iterasi, bukan untuk membela desain awal.",
      "points": [
        "Siapkan skenario tugas yang jelas, misalnya \"temukan materi React dan buka contoh kode state\".",
        "Amati perilaku user: bagian yang membuat ragu, klik yang salah, teks yang tidak terbaca, dan langkah yang tidak ditemukan.",
        "Gunakan metrik task success, waktu penyelesaian, jumlah error, dan komentar kualitatif untuk menilai hasil testing.",
        "Setelah test, kelompokkan masalah berdasarkan severity: blocker, major, minor, dan improvement.",
        "Iterasi desain dengan memperbaiki masalah terbesar dulu, lalu test ulang sampai alur inti cukup lancar.",
        "Fungsi utama testing: mengetahui efektivitas interaksi pengguna, dan menemukan permasalahan sebelum website diluncurkan ke publik."
      ],
      "id": "uiux-14-test-usability-testing-dan-iterasi"
    },
    {
      "title": "Tools Perancangan Desain Web: Figma",
      "description": "Figma adalah platform desain dan prototyping berbasis cloud yang digunakan untuk membuat antarmuka (UI) dan pengalaman pengguna (UX) untuk aplikasi atau situs web.",
      "points": [
        "Keunggulan Figma: berbasis web, multi platform, mendukung kolaborasi real-time bersama tim, berbasis cloud, mendukung banyak resource open source, dan punya banyak fitur pendukung desain.",
        "Gunakan Figma untuk membuat wireframe: susun frame per halaman (misalnya Home, Product, Product Detail) lengkap dengan placeholder gambar dan komponen dasar.",
        "Lanjutkan wireframe menjadi prototype interaktif dengan menghubungkan antar frame memakai fitur flow, sehingga alur klik dari satu halaman ke halaman lain bisa disimulasikan.",
        "Gunakan mode Present atau Share prototype untuk menjalankan hasil desain layaknya aplikasi asli, lalu lakukan testing langsung dari tampilan tersebut."
      ],
      "image": true,
            "imageSrc": "/assets/i.png",
      "imageLabel": "SISIPKAN GAMBAR: tampilan dashboard Figma, proses membuat wireframe, dan mode present/testing prototype.",
      "id": "uiux-15-tools-figma"
    },
    {
      "title": "Studi Kasus: Praktik Mandiri",
      "description": "Setelah memahami keseluruhan proses UI/UX, saatnya masuk ke tahap implementasi dan mempraktikkan langsung lewat sebuah studi kasus sederhana.",
      "points": [
        "Buatlah desain prototype untuk sebuah aplikasi travel & tour.",
        "Rancang mulai dari low fidelity (sketsa), mid fidelity (wireframe), hingga high fidelity (prototype interaktif).",
        "Buat minimal 10 frame yang mencakup alur utama aplikasi, misalnya halaman utama, pencarian destinasi, detail paket wisata, hingga proses pemesanan.",
        "Terapkan kembali prinsip visual desain, pemilihan warna, dan tipografi yang sudah dipelajari agar hasil desain konsisten dan enak dilihat."
      ],
      "id": "uiux-16-studi-kasus"
    }
  ]
}

const UIUX = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default UIUX