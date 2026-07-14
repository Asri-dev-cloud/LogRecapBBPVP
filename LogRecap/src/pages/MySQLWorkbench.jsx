import React from 'react'
import MaterialPage from './MaterialPage'

// Materi Data Types, Function & Operator, dan SQL Statement mengacu pada
// MySQL 8.0 Reference Manual: Chapter 13 (Data Types), Chapter 14 (Functions
// and Operators), Chapter 15 (SQL Statements).
// Materi Normalisasi Database (1NF-5NF) adalah teori desain database
// relasional umum (Codd), bukan bagian dari MySQL Reference Manual —
// ditambahkan supaya schema yang dibuat lebih rapi dan bebas anomali.

const topic = {
  "code": "K",
  "slug": "mysql-workbench",
  "title": "MySQL Workbench",
  "shortTitle": "MySQL",
  "route": "/mysql-workbench",
  "icon": "Database",
  "summary": "Install, koneksi, tipe data, function, operator, statement, normalisasi database, dan studi kasus.",
  "accent": "from-blue-300 via-yellow-300 to-pink-300"
}

const material = {
  "title": "MySQL Workbench",
  "subtitle": "MySQL Workbench adalah GUI untuk mendesain schema, menjalankan query, mengelola koneksi, dan belajar SQL.",
  "overview": [
    "MySQL menyimpan data dalam database, table, column, row, index, dan relation.",
    "Workbench memudahkan koneksi ke server lokal atau remote, menjalankan query, dan melihat hasil dalam grid.",
    "Materi Data Types, Function/Operator, dan SQL Statement merujuk pada MySQL 8.0 Reference Manual: Chapter 13 (Data Types), Chapter 14 (Functions and Operators), Chapter 15 (SQL Statements).",
    "Materi Normalisasi Database (1NF-5NF) adalah teori desain database relasional umum, bukan bagian dari MySQL Reference Manual, ditambahkan supaya schema yang dibuat lebih rapi dan bebas anomali."
  ],
  "sections": [
    {
      "title": "Install dan Connect",
      "description": "Workbench dapat terhubung ke MySQL lokal, server VPS, atau database remote. Pastikan kredensial dan akses network benar.",
      "points": [
        "Install MySQL Server dan MySQL Workbench, atau install Workbench saja jika server sudah tersedia di tempat lain.",
        "Buat koneksi baru dengan hostname, port 3306, username, password, dan default schema bila ada.",
        "Untuk lokal, hostname biasanya localhost atau 127.0.0.1.",
        "Untuk remote VPS, lebih aman gunakan SSH tunnel daripada membuka port MySQL langsung ke publik.",
        "Klik Test Connection untuk memastikan username, password, host, dan firewall benar."
      ],
      "image": true,
      "imageSrc": "/assets/a.png",
      "imageLabel": "SISIPKAN GAMBAR: dialog New Connection di MySQL Workbench.",
      "id": "mysql-workbench-1-install-dan-connect"
    },
    {
      "title": "Data Types — Numeric (Ch. 13)",
      "description": "Kategori numeric dipakai untuk angka: bilangan bulat, desimal presisi tinggi, dan bilangan pendekatan. Logika utamanya: pilih tipe berdasarkan rentang nilai realistis dan tingkat presisi yang dibutuhkan, bukan asal pakai INT untuk semuanya.",
      "table": {
        "columns": ["Tipe", "Ukuran", "Keterangan"],
        "rows": [
          ["TINYINT", "1 byte", "-128 s/d 127 (signed)"],
          ["SMALLINT", "2 byte", "Rentang lebih besar dari TINYINT"],
          ["MEDIUMINT", "3 byte", "Rentang di antara SMALLINT dan INT"],
          ["INT", "4 byte", "Sekitar ±2,1 miliar"],
          ["BIGINT", "8 byte", "Sekitar ±9,2 x 10^18"],
          ["UNSIGNED", "-", "Menghilangkan slot nilai negatif, batas atas jadi dua kali lipat"],
          ["DECIMAL(M,D)", "-", "Angka eksak sesuai jumlah digit, wajib dipakai untuk uang"],
          ["FLOAT / DOUBLE", "-", "Angka pendekatan (IEEE 754), cocok untuk data sains, bukan uang"],
          ["BIT(M)", "-", "Nilai bit mentah, untuk flag tingkat rendah"],
          ["BOOLEAN / BOOL", "-", "Alias dari TINYINT(1)"],
          ["AUTO_INCREMENT", "-", "Primary key surrogate yang otomatis naik tiap insert"]
        ]
      },
      "image": true,
      "imageSrc": "/assets/b.png",
      "imageLabel": "SISIPKAN GAMBAR: tabel range nilai tiap tipe integer, dari TINYINT sampai BIGINT.",
      "language": "sql",
      "codeTitle": "Numeric Types",
      "code": `
CREATE TABLE contoh_numeric (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  umur TINYINT UNSIGNED,
  stok SMALLINT UNSIGNED DEFAULT 0,
  saldo DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  rating FLOAT,
  is_aktif BOOLEAN DEFAULT TRUE
);

INSERT INTO contoh_numeric (umur, stok, saldo, rating, is_aktif)
VALUES (21, 120, 1500000.50, 4.8, TRUE);`,
      "id": "mysql-workbench-2-data-types-numeric"
    },
    {
      "title": "Data Types — String & Text (Ch. 13)",
      "description": "Kategori string dipakai untuk teks, dengan dua pertimbangan utama: apakah panjangnya tetap atau variabel, dan karakter set apa yang perlu didukung.",
      "table": {
        "columns": ["Tipe / Fitur", "Ukuran / Karakteristik", "Keterangan / Kegunaan"],
        "rows": [
          ["CHAR(n)", "Berukuran tetap (fixed-length)", "Mengalokasikan n karakter dan mem-padding spasi di kanan. Cocok untuk data seragam seperti NIK dalam KTP."],
          ["VARCHAR(n)", "Berukuran variabel (variable-length)", "Hanya memakai storage sepanjang data asli. Cocok untuk nama, email, atau judul."],
          ["Batas Baris InnoDB", "Maksimal ~65.535 byte per baris", "Batas total ukuran satu baris. VARCHAR yang terlalu besar bisa cepat menghabiskan batas ini bersama kolom lain."],
          ["TEXT Family", "Berukuran besar (TINYTEXT s/d LONGTEXT)", "Untuk teks panjang seperti deskripsi produk atau isi artikel. Disimpan terpisah dari baris utama jika ukurannya besar."],
          ["BINARY / VARBINARY", "Berbasis byte mentah (binary strings)", "Mirip CHAR/VARCHAR tetapi menyimpan byte dan selalu dibandingkan secara case-sensitive."],
          ["CHARACTER SET & COLLATION", "Pengaturan karakter dan teks", "CHARACTER SET menentukan karakter yang bisa disimpan. COLLATION menentukan aturan pengurutan dan perbandingan (case-sensitive atau tidak)."],
          ["utf8mb4", "Default modern (4 byte per karakter)", "Mendukung seluruh karakter Unicode termasuk emoji. Versi utf8 lama hanya 3 byte dan tidak cukup untuk emoji."]
        ]
      },
      "image": true,
      "imageSrc": "/assets/c.png",
      "imageLabel": "SISIPKAN GAMBAR: perbandingan alokasi storage antara CHAR dan VARCHAR.",
      "language": "sql",
      "codeTitle": "String Types",
      "code": `
CREATE TABLE contoh_string (
  kode_provinsi CHAR(2) NOT NULL,
  nama_lengkap VARCHAR(150) NOT NULL,
  bio TEXT,
  slug VARCHAR(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

INSERT INTO contoh_string (kode_provinsi, nama_lengkap, bio, slug)
VALUES ('JB', 'Ahmad Fauzan', 'Mahasiswa Informatika yang suka ngoding.', 'ahmad-fauzan');`,
      "id": "mysql-workbench-3-data-types-string"
    },
    {
      "title": "Data Types — Date & Time (Ch. 13)",
      "description": "Kategori date/time dipakai untuk tanggal, jam, atau kombinasi keduanya. Logika utamanya ada di perbedaan DATETIME vs TIMESTAMP soal timezone dan batas tahun.",
      "table": {
        "columns": ["Tipe / Fitur", "Ukuran / Rentang", "Keterangan / Logika Penggunaan"],
        "rows": [
          ["DATE", "1000-01-01 sampai 9999-12-31", "Menyimpan tanggal saja dengan format YYYY-MM-DD."],
          ["TIME", "-838:59:59 sampai 838:59:59", "Menyimpan jam atau durasi saja. Nilainya bisa negatif, sehingga sering dipakai untuk mencatat durasi, bukan cuma jam dinding."],
          ["DATETIME", "1000-01-01 00:00:00 sampai 9999-12-31 23:59:59", "Menyimpan tanggal dan jam apa adanya. Nilainya konstan dan tidak dikonversi mengikuti perubahan timezone server atau session."],
          ["TIMESTAMP", "Terbatas sampai tahun 2038", "Menyimpan tanggal dan jam dalam format UTC. Nilainya otomatis dikonversi sesuai timezone session saat dibaca."],
          ["YEAR", "4 digit tahun", "Hanya menyimpan komponen tahun saja."],
          ["fsp (Fractional Seconds)", "Presisi 0-6 digit mikrodetik", "Dapat ditambahkan pada TIME, DATETIME, atau TIMESTAMP untuk presisi milidetik atau mikrodetik, contohnya DATETIME(3)."],
          ["ON UPDATE CURRENT_TIMESTAMP", "-", "Membuat kolom otomatis diperbarui setiap kali ada perubahan data pada baris tersebut. Sangat umum digunakan untuk kolom updated_at."],
          ["Logika Memilih", "-", "Gunakan DATETIME jika aplikasi single-timezone dan butuh tanggal jauh ke depan melewati tahun 2038. Gunakan TIMESTAMP jika aplikasi bersifat multi-timezone dan butuh fitur auto-update."]
        ]
      },
      "image": true,
      "imageSrc": "/assets/d.png",
      "imageLabel": "SISIPKAN GAMBAR: perbandingan alokasi storage antara CHAR dan VARCHAR.",
      "language": "sql",
      "codeTitle": "Date & Time Types",
      "code": `
CREATE TABLE contoh_datetime (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tanggal_lahir DATE,
  jam_buka TIME,
  dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
  diubah_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  tahun_lulus YEAR
);`,
      "id": "mysql-workbench-4-data-types-datetime"
    },
    {
      "title": "Data Types — Enum, Set, JSON, Spatial, Blob (Ch. 13)",
      "description": "Kategori lanjutan ini dipakai untuk kasus khusus: pilihan terbatas, dokumen semi-terstruktur, data lokasi, dan data biner.",
      "table": {
        "columns": ["Tipe / Fitur", "Karakteristik / Storage", "Keterangan / Praktik Terbaik"],
        "rows": [
          ["ENUM('a','b','c')", "Disimpan sebagai indeks integer di balik layar", "Menyimpan satu nilai dari daftar pilihan tetap. Hemat ruang penyimpanan dan otomatis melakukan validasi format."],
          ["SET('a','b','c')", "Disimpan sebagai bitmap", "Menyimpan kombinasi banyak nilai sekaligus dari daftar pilihan tetap yang telah ditentukan."],
          ["Batasan ENUM / SET", "-", "Hindari penggunaan jika daftar pilihan sering berubah atau dipakai lintas banyak tabel. Lebih disarankan membuat tabel referensi terpisah dengan foreign key."],
          ["JSON", "Validasi format otomatis", "Menyimpan dokumen JSON terstruktur. Data dapat di-query secara langsung menggunakan fungsi JSON_EXTRACT atau operator -> dan ->>."],
          ["Spatial Types", "GEOMETRY, POINT, LINESTRING, POLYGON", "Menyimpan data lokasi atau geografis. Digunakan bersama dengan spatial index untuk kebutuhan query pencarian seperti \"cari lokasi terdekat\"."],
          ["BLOB Family", "Data biner mentah (TINYBLOB s/d LONGBLOB)", "Menyimpan file biner. Praktik terbaik di lapangan adalah hanya menyimpan path atau URL file saja agar ukuran database tetap ringan."],
          ["MySQL Reference Manual", "Chapter 13", "Berisi tabel resmi kebutuhan ruang penyimpanan (storage requirement) untuk tiap tipe data. Sangat berguna untuk pengecekan saat prioritasnya adalah optimasi disk."]
        ]
      },
      "image": true,
      "imageSrc": "/assets/e.png",
      "imageLabel": "SISIPKAN GAMBAR: diagram kapan pakai ENUM vs tabel referensi terpisah.",
      "language": "sql",
      "codeTitle": "Enum, Set, JSON, Spatial",
      "code": `
CREATE TABLE contoh_lanjutan (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  status ENUM('draft', 'active', 'archived') DEFAULT 'draft',
  hobi SET('baca', 'olahraga', 'musik', 'game'),
  metadata JSON,
  lokasi POINT SRID 4326,
  foto_profile MEDIUMBLOB
);

INSERT INTO contoh_lanjutan (status, hobi, metadata)
VALUES ('active', 'baca,game', JSON_OBJECT('level', 3, 'verified', TRUE));

SELECT metadata->>'$.level' AS level FROM contoh_lanjutan;`,
      "id": "mysql-workbench-5-data-types-enum-json"
    },
    {
      "title": "Data Types — Default Value & Storage Requirement (Ch. 13.6 - 13.7)",
      "description": "Bagian ini melengkapi materi Data Types dengan dua hal praktis yang sering terlewat: nilai default otomatis kalau kolom tidak diisi, dan estimasi ukuran penyimpanan tiap tipe data. Memahami storage requirement penting supaya tabel yang sudah berisi jutaan baris tetap ringan dan index-nya tetap cepat diakses.",
      "table": {
          "columns": ["Fitur / Aspek", "Aturan / Perilaku Storage", "Keterangan / Logika Optimalisasi"],
          "rows": [
            ["NOT NULL & DEFAULT", "Otomatis memakai nilai default bawaan jika tidak diisi", "0 untuk tipe numeric, string kosong untuk tipe string (tergantung sql_mode), dan NULL untuk kolom yang boleh kosong."],
            ["DEFAULT Ekspresi", "Bisa berupa nilai manual atau ekspresi", "Mendukung nilai manual (contoh: DEFAULT 0 atau DEFAULT 'pending'). Sejak MySQL 8.0, boleh berupa ekspresi lewat DEFAULT (...) untuk hasil fungsi/kalkulasi."],
            ["VARCHAR vs CHAR", "VARCHAR: Data aktual + 1-2 byte overhead. CHAR: Selalu n byte penuh", "VARCHAR(n) hanya memakai storage sepanjang isi data aktual. Berbeda dengan CHAR(n) yang selalu memakan memori penuh walaupun datanya lebih pendek."],
            ["DECIMAL Storage", "Memakai storage lebih besar dibanding INT/FLOAT", "Disimpan digit demi digit secara eksak (bukan biner murni). Ini adalah harga yang harus dibayar demi menjaga akurasi mutlak pada data keuangan/uang."],
            ["Index Kolom Besar", "Ikut membesar dan memperlambat performa", "Index yang dibuat di atas kolom besar (misal TEXT panjang) akan lambat. Solusinya, buat index pada sebagian prefix kolom saja, contoh: INDEX(deskripsi(50))."],
            ["Logika Praktis Index", "Gunakan tipe data sekecil mungkin yang masih cukup", "Kolom yang sering dipakai untuk index, WHERE, atau JOIN harus sekecil mungkin supaya index muat lebih banyak di memory (RAM) dan query jadi lebih cepat."],
            ["MySQL 8.0 Manual", "Chapter 13.7", "Berisi tabel resmi kebutuhan ruang penyimpanan (storage requirement) untuk tiap tipe data. Sangat berguna dicek langsung saat optimasi disk jadi prioritas."]
          ]
        },
      "image": true,
      "imageSrc": "/assets/f.png",
      "language": "sql",
      "codeTitle": "Default Value & Cek Ukuran Storage",
      "code": `
CREATE TABLE contoh_default (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  status ENUM('pending', 'paid') DEFAULT 'pending',
  stok INT DEFAULT 0,
  dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Estimasi ukuran data dan index tiap tabel
SELECT
  table_name,
  ROUND(data_length / 1024 / 1024, 2) AS data_mb,
  ROUND(index_length / 1024 / 1024, 2) AS index_mb
FROM information_schema.tables
WHERE table_schema = 'online_shop'
ORDER BY data_length DESC;`,
      "id": "mysql-workbench-6-data-types-default-storage"
    },
    {
      "title": "Data Types — Choosing the Right Type for a Column (Ch. 13.8)",
      "description": "Ini rangkuman pengambilan keputusan dari seluruh sub-bab Data Types sebelumnya: tipe data apa yang paling tepat dipakai untuk kebutuhan kolom tertentu, supaya tidak asal pilih dan tidak perlu migrasi menyakitkan di kemudian hari.",
      "table": {
        "columns": ["Kebutuhan Kolom", "Rekomendasi Tipe Data", "Aturan & Logika Pemilihan"],
        "rows": [
          ["Aturan Umum", "Paling kecil yang cukup", "Pilih tipe data paling kecil yang masih aman menampung rentang nilai realistis. Jangan boros ruang (terlalu besar) dan hindari risiko overflow (terlalu kecil)."],
          ["ID / Primary Key", "BIGINT/INT UNSIGNED AUTO_INCREMENT", "Gunakan BIGINT jika data berpotensi tumbuh sangat besar (skala besar/nasional). Gunakan INT untuk skala kecil-menengah. Selalu gunakan UNSIGNED."],
          ["Uang, Harga, Saldo, Komisi", "DECIMAL(M,D)", "Wajib digunakan untuk data finansial. Jangan pernah memakai FLOAT/DOUBLE karena tipe floating point berisiko memicu rounding error yang fatal."],
          ["Nama, Email, Username, Judul Pendek", "VARCHAR (panjang wajar)", "Gunakan VARCHAR dengan batas panjang sesuai kebutuhan riil data. Hindari kebiasaan asal memasang VARCHAR(255) untuk semua kolom."],
          ["Deskripsi, Isi Artikel, Komentar", "TEXT / MEDIUMTEXT", "Digunakan untuk teks panjang. Pilih variasi tipe TEXT berdasarkan estimasi batas panjang maksimal karakter yang akan ditampung."],
          ["Status Pilihan Tetap", "ENUM atau Tabel Referensi", "Gunakan ENUM jika daftar pilihan bersifat tetap dan jarang berubah (misal: gender). Buat tabel referensi + foreign key jika pilihan sering bertambah."],
          ["Timestamp Otomatis (created_at / updated_at)", "TIMESTAMP", "Gunakan TIMESTAMP dengan DEFAULT CURRENT_TIMESTAMP. Tambahkan klausul ON UPDATE CURRENT_TIMESTAMP khusus untuk kolom updated_at."],
          ["Tanggal Event / Jadwal Masa Depan", "DATETIME", "Gunakan DATETIME jika jadwal melampaui rentang waktu jauh ke depan atau tidak terikat timezone server. Jangan pakai TIMESTAMP karena mentok di tahun 2038."],
          ["Flag Benar / Salah (Boolean)", "BOOLEAN / TINYINT(1)", "Gunakan tipe BOOLEAN (alias TINYINT(1)). Hindari penggunaan VARCHAR('yes'/'no') karena boros ruang penyimpanan dan proses validasinya lebih lambat."],
          ["Data Fleksibel / Metadata / Response API", "JSON", "Cocok untuk dokumen atau settings yang strukturnya sering berubah. Namun, hindari tipe JSON jika data tersebut membutuhkan query relasional berat atau sering di-JOIN."],
          ["Panduan Saat Ragu", "3 Pertanyaan Kunci", "Tanyakan pada diri sendiri: 1) Perlu presisi eksak atau pendekatan? 2) Rentang nilainya muat di tipe kecil? 3) Kolom ini sering di-index/di-JOIN? Jawabannya akan langsung menuntun ke tipe yang tepat."]
        ]
      },
      "language": "sql",
      "codeTitle": "Contoh Skema Kolom yang Menerapkan Semua Keputusan Ini",
      "code": `
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  saldo DECIMAL(14, 2) NOT NULL DEFAULT 0.00,
  status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
  preferensi JSON,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             ON UPDATE CURRENT_TIMESTAMP
);`,
      "id": "mysql-workbench-7-data-types-choosing-right-type"
    },
    {
      "title": "Operator MySQL: Perbandingan, Logika, Aritmatika (Ch. 14)",
      "description": "Operator dipakai untuk membangun ekspresi di WHERE, HAVING, SET, dan tempat lain. Memahami precedence-nya penting supaya hasil query sesuai yang diniatkan.",
      "table": {
        "columns": ["Kategori Operator", "Contoh Operator", "Keterangan / Aturan Evaluasi"],
        "rows": [
          ["Perbandingan", "=, <>, !=, >, <, >=, <=, BETWEEN, IN, LIKE, REGEXP, IS NULL", "Digunakan untuk membandingkan dua nilai. Menghasilkan nilai boolean (TRUE, FALSE, atau NULL)."],
          ["Null-Safe Equal", "<=>", "Berbeda dari operator `=` biasa karena menganggap `NULL <=> NULL` bernilai TRUE. Sangat berguna saat membandingkan dua kolom yang boleh bernilai NULL."],
          ["Logika", "AND (&&), OR (||), NOT (!), XOR", "Urutan prioritas (*precedence*) evaluasinya dimulai dari NOT terlebih dahulu, kemudian AND, dan terakhir OR/XOR."],
          ["Aritmatika", "+, -, *, /, DIV, MOD (%)", "Operator `/` bisa menghasilkan nilai desimal, sedangkan operator `DIV` akan otomatis membulatkan hasil pembagian ke bilangan bulat (*integer*)."],
          ["Bitwise", "&, |, ^, ~, <<, >>", "Digunakan untuk melakukan manipulasi bit secara langsung. Jarang digunakan sehari-hari kecuali untuk kebutuhan sistem flag atau permission."],
          ["Assignment", ":=", "Digunakan untuk mengisi nilai ke dalam variabel *user* di dalam query. Berbeda dari `=` yang berfungsi sebagai perbandingan pada klausa WHERE."],
          ["Logika Keseluruhan", "Tanda Kurung ( ... )", "Jika satu ekspresi mencampur banyak operator berbeda, selalu gunakan tanda kurung agar urutan evaluasi menjadi eksplisit dan kode mudah dibaca ulang."]
        ]
      },
      "language": "sql",
      "codeTitle": "Operator",
      "code": `
SELECT
  10 DIV 3 AS hasil_div,
  10 % 3 AS sisa_bagi,
  (status = 'paid' OR status = 'shipped') AND total > 100000 AS lolos_filter,
  harga <=> NULL AS null_safe_compare
FROM orders
LIMIT 5;`,
      "id": "mysql-workbench-8-operator-mysql"
    },
    {
      "title": "String Functions & Regular Expression (Ch. 14)",
      "description": "Function string dipakai untuk menggabung, memformat, memotong, dan mencocokkan pola teks.",
      "table": {
        "columns": ["Fungsi / Fitur", "Kegunaan / Efek", "Keterangan / Kasus Penggunaan"],
        "rows": [
          ["CONCAT & CONCAT_WS", "Menggabungkan teks", "CONCAT menggabungkan string apa adanya. CONCAT_WS (With Separator) menggabungkan teks sekaligus otomatis menyisipkan karakter pemisah di antara setiap string."],
          ["UPPER, LOWER & TRIM Family", "Ubah kapitalisasi & bersihkan spasi", "UPPER/LOWER mengubah teks menjadi huruf besar/kecil. TRIM, LTRIM, dan RTRIM menghapus spasi tidak berguna di kiri, kanan, atau kedua sisi teks."],
          ["LENGTH vs CHAR_LENGTH", "Menghitung panjang string", "LENGTH menghitung ukuran dalam hitungan byte, sedangkan CHAR_LENGTH menghitung jumlah karakter asli. Hasilnya akan berbeda jika teks mengandung karakter multi-byte seperti emoji atau huruf non-latin."],
          ["SUBSTRING, LEFT, RIGHT", "Memotong string", "Digunakan untuk mengambil sebagian teks berdasarkan posisi atau arah tertentu (dari kiri, kanan, atau indeks spesifik)."],
          ["REPLACE", "Mengganti substring", "Mencari dan mengganti semua kemunculan kata atau sebagian teks tertentu dengan teks baru yang ditentukan."],
          ["LPAD & RPAD", "Menambahkan karakter padding", "Menambahkan karakter tambahan di sebelah kiri atau kanan teks sampai mencapai panjang tertentu. Sangat sering dipakai untuk membuat format penomoran kode seperti 'INV-0001'."],
          ["REGEXP Family (MySQL 8.0+)", "Pencarian pola tingkat lanjut", "Fungsi REGEXP_LIKE, REGEXP_REPLACE, dan REGEXP_SUBSTR memanfaatkan pola Regular Expression yang memberikan fleksibilitas jauh lebih tinggi dibandingkan operator LIKE standar."]
        ]
      },
      "language": "sql",
      "codeTitle": "String Function",
      "code": `
SELECT
  CONCAT_WS(' - ', 'INV', LPAD(7, 4, '0')) AS nomor_invoice,
  CHAR_LENGTH('Halo dunia') AS jumlah_karakter,
  REGEXP_LIKE('user@example.com', '^[A-Za-z0-9_.+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$') AS email_valid
FROM dual;`,
      "id": "mysql-workbench-9-string-function"
    },
    {
      "title": "Numeric & Date/Time Functions (Ch. 14)",
      "description": "Function numeric dan date/time dipakai untuk kalkulasi matematis serta memformat, menggeser, atau menghitung selisih tanggal.",
      "table": {
        "columns": ["Kategori Fungsi", "Contoh Fungsi", "Keterangan / Kasus Penggunaan"],
        "rows": [
          ["Matematika Dasar", "ROUND, CEIL/CEILING, FLOOR, ABS, POWER, SQRT, RAND()", "Digunakan untuk melakukan pembulatan angka (ke atas, ke bawah, atau ke terdekat) serta kalkulasi matematis dasar seperti nilai mutlak, pangkat, akar, dan angka acak."],
          ["Waktu Sekarang", "NOW(), CURDATE(), CURTIME()", "Mengambil data tanggal dan jam, tanggal saja, atau jam saja saat ini langsung dari sisi sistem server."],
          ["Modifikasi Tanggal", "DATE_ADD, DATE_SUB", "Digunakan untuk menggeser nilai tanggal maju (menambah) atau mundur (mengurangi), contohnya: `DATE_ADD(NOW(), INTERVAL 7 DAY)`."],
          ["Selisih Hari", "DATEDIFF(akhir, awal)", "Menghitung jumlah selisih hari secara spesifik di antara dua nilai tanggal yang diberikan."],
          ["Selisih Waktu Fleksibel", "TIMESTAMPDIFF(unit, awal, akhir)", "Menghitung selisih waktu dengan satuan yang bisa ditentukan sendiri (`SECOND`, `MINUTE`, `HOUR`, `DAY`, `MONTH`, `YEAR`). Jauh lebih fleksibel daripada fungsi DATEDIFF."],
          ["Format Tampilan", "DATE_FORMAT(tanggal, pola)", "Mengubah dan memformat tampilan visual tanggal sesuai dengan pola string tertentu, misalnya format '%Y-%m-%d' atau '%d %M %Y'."],
          ["Ekstraksi Bagian", "YEAR(), MONTH(), DAY(), EXTRACT(unit FROM tanggal)", "Mengambil atau memotong satu bagian komponen tertentu saja (tahun, bulan, atau hari) dari sebuah data tanggal utuh."]
        ]
      },
      "language": "sql",
      "codeTitle": "Numeric & Date Function",
      "code": `
SELECT
  ROUND(19.987, 2) AS harga_dibulatkan,
  DATE_ADD(CURDATE(), INTERVAL 7 DAY) AS jatuh_tempo,
  TIMESTAMPDIFF(YEAR, '2000-05-10', CURDATE()) AS umur,
  DATE_FORMAT(NOW(), '%d %M %Y') AS tanggal_indonesia
FROM dual;`,
      "id": "mysql-workbench-10-numeric-date-function"
    },
    {
      "title": "Aggregate Function, GROUP BY, dan Window Function (Ch. 14)",
      "description": "Aggregate function meringkas banyak baris jadi satu nilai per grup, sedangkan window function menghitung sesuatu lintas baris TANPA meringkas jumlah barisnya.",
      "table": {
        "columns": ["Fitur / Konsep", "Komponen / Contoh", "Keterangan / Logika Penggunaan"],
        "rows": [
          ["Fungsi Agregat", "COUNT, SUM, AVG, MIN, MAX, GROUP_CONCAT", "Digunakan untuk meringkas dan mengombinasikan banyak baris data menjadi satu nilai tunggal per grup."],
          ["Logika GROUP BY", "Pengelompokan Kolom", "Baris dikelompokkan berdasarkan kolom tertentu, lalu fungsi agregat dihitung per kelompok tersebut, bukan per baris individual."],
          ["HAVING vs WHERE", "Penyaringan Data", "WHERE memfilter baris data mentah sebelum proses grouping terjadi, sedangkan HAVING memfilter hasil grup setelah fungsi agregat selesai dihitung."],
          ["WITH ROLLUP", "Subtotal & Grand Total", "Klausul tambahan yang disisipkan di akhir GROUP BY untuk memunculkan baris subtotal dan grand total secara otomatis."],
          ["Window Functions", "ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD()", "Mirip seperti fungsi agregat (tersedia sejak MySQL 8.0+), tetapi setiap baris asli data tetap ditampilkan lengkap bersama tambahan kolom hasil kalkulasi."],
          ["Klausul OVER()", "PARTITION BY ... ORDER BY ...", "Menentukan \"jendela\" data yang dipakai oleh window function. PARTITION BY membagi data per grup, sedangkan ORDER BY menentukan urutan ranking atau lag-lead."],
          ["Perbedaan Kunci", "Window Function vs GROUP BY", "GROUP BY memangkas dan mengurangi jumlah baris menjadi satu per grup. Sebaliknya, window function tetap mempertahankan seluruh baris asli data."]
        ]
      },
      "language": "sql",
      "codeTitle": "Aggregate & Window Function",
      "code": `
SELECT
  customer_id,
  total,
  RANK() OVER (PARTITION BY customer_id ORDER BY total DESC) AS ranking_belanja,
  SUM(total) OVER (PARTITION BY customer_id) AS total_belanja_customer
FROM orders;`,
      "id": "mysql-workbench-11-aggregate-window"
    },
    {
      "title": "JSON Function & Flow Control Function (Ch. 14)",
      "description": "Function JSON dipakai membaca/menulis dokumen JSON, sedangkan flow control function dipakai membuat percabangan logika langsung di dalam query.",
      "table": {
        "columns": ["Fungsi / Operator", "Kategori", "Keterangan / Aturan Penggunaan"],
        "rows": [
          ["JSON_OBJECT & JSON_ARRAY", "Pembuatan JSON", "Digunakan untuk membuat dan menyusun dokumen JSON baru secara langsung dari data hasil query."],
          ["JSON_EXTRACT atau ->", "Ekstraksi JSON", "Mengambil nilai tertentu dari dokumen JSON berdasarkan path yang ditentukan (misal: '$.nama')."],
          ["Operator ->>", "Ekstraksi JSON", "Setara dengan fungsi JSON_UNQUOTE(JSON_EXTRACT(...)), menghasilkan data string biasa yang bersih tanpa tanda kutip bawaan JSON."],
          ["JSON_CONTAINS & JSON_SEARCH", "Pencarian JSON", "Digunakan untuk mengecek keberadaan nilai, elemen, atau key tertentu di dalam suatu dokumen JSON."],
          ["IF(kondisi, benar, salah)", "Kontrol Alur", "Fungsi percabangan logika sederhana untuk mengevaluasi satu kondisi tunggal."],
          ["CASE WHEN ... THEN ... ELSE ... END", "Kontrol Alur", "Percabangan untuk banyak kondisi. Jauh lebih rapi dan mudah dibaca dibanding susunan IF bersarang (*nested IF*) jika kondisinya lebih dari 2-3 lapis."],
          ["IFNULL & COALESCE", "Penanganan NULL", "IFNULL mengganti nilai NULL dengan satu nilai default. COALESCE lebih fleksibel karena menerima banyak argumen dan mengambil nilai pertama yang ditemukan tidak NULL."]
        ]
      },
      "language": "sql",
      "codeTitle": "Flow Control (versi CASE dari logika latihan_04.sql)",
      "code": `
SELECT
  Nama,
  CASE
    WHEN kel = 1 AND stat = 'Sendiri' THEN 'Bujangan'
    WHEN kel = 1 AND stat = 'Kawin' THEN 'Menikah'
    WHEN kel = 1 THEN 'Duda'
    WHEN kel = 0 AND stat = 'Sendiri' THEN 'Perawan'
    WHEN kel = 0 AND stat = 'Kawin' THEN 'Menikah'
    ELSE 'Janda'
  END AS keterangan,
  COALESCE(NULL, NULL, 'Default Value') AS contoh_coalesce
FROM staTem;`,
      "id": "mysql-workbench-12-json-flow-control"
    },
    {
      "title": "SQL Statement — DDL / Data Definition (Ch. 15)",
      "description": "DDL mengatur struktur database dan table: membuat, mengubah, dan menghapus objek. Logikanya, DDL tidak mengurus isi data, hanya \"bentuk wadahnya\".",
      "table": {
        "columns": ["Perintah / Komponen", "Kategori / Karakteristik", "Keterangan / Aturan Penggunaan"],
        "rows": [
          ["CREATE", "DDL (Data Definition Language)", "Digunakan untuk membuat objek baru di database, seperti DATABASE, TABLE, VIEW, INDEX, PROCEDURE, FUNCTION, dan TRIGGER."],
          ["ALTER TABLE", "DDL (Data Definition Language)", "Mengubah struktur tabel yang sudah ada (tambah, hapus, atau ubah kolom, index, dan constraint) tanpa menghapus data di dalamnya."],
          ["DROP", "DDL (Data Definition Language)", "Menghapus objek secara permanen dari database. Perintah DROP TABLE akan langsung menghapus struktur sekaligus seluruh data di dalamnya."],
          ["TRUNCATE TABLE", "DDL (Data Definition Language)", "Mengosongkan semua baris data tetapi mempertahankan struktur tabel. Jauh lebih cepat dari DELETE karena tidak mencatat log tiap baris, tetapi tidak bisa di-ROLLBACK dan otomatis me-reset nilai AUTO_INCREMENT."],
          ["RENAME TABLE", "DDL (Data Definition Language)", "Mengubah nama tabel yang sudah ada menjadi nama baru secara langsung tanpa perlu melakukan proses drop dan create ulang."],
          ["Constraint Utama", "Aturan / Validasi Tabel", "Terdiri dari PRIMARY KEY (identitas unik), FOREIGN KEY (relasi antar-tabel), UNIQUE (mencegah duplikat), NOT NULL (wajib diisi), CHECK (validasi custom), dan DEFAULT (nilai bawaan)."],
          ["IF EXISTS / IF NOT EXISTS", "Klausul Kondisional", "Mencegah terjadinya error jika objek sudah ada (saat CREATE) atau belum ada (saat DROP). Umumnya dipakai di dalam script SQL agar aman dijalankan ulang tanpa merusak alur."]
        ]
      },
      "language": "sql",
      "codeTitle": "DDL",
      "code": `
CREATE TABLE members (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(160) NOT NULL UNIQUE,
  umur TINYINT CHECK (umur >= 0)
);

ALTER TABLE members
  ADD COLUMN join_date DATE,
  ADD INDEX idx_email (email);

RENAME TABLE members TO app_members;

TRUNCATE TABLE app_members;`,
      "id": "mysql-workbench-13-ddl"
    },
    {
      "title": "SQL Statement — DML & Urutan Eksekusi Query (Ch. 15)",
      "description": "DML mengatur isi data: SELECT, INSERT, UPDATE, DELETE. Bagian paling penting untuk dipahami di sini adalah urutan PENULISAN klausa SELECT berbeda dari urutan EKSEKUSI-nya.",
      "table": {
        "columns": ["Perintah / Komponen", "Aspek / Urutan", "Keterangan / Aturan Eksekusi"],
        "rows": [
          ["Inti Perintah DML", "SELECT, INSERT, UPDATE, DELETE, REPLACE", "Kumpulan perintah utama dalam Data Manipulation Language yang digunakan untuk membaca, menambah, mengubah, dan menghapus data di dalam tabel."],
          ["INSERT ... ON DUPLICATE KEY UPDATE", "Upsert Pattern", "Melakukan insert data baru. Jika terjadi bentrokan karena melanggar aturan primary key atau unique index, perintah ini otomatis beralih fungsi menjadi UPDATE pada baris data tersebut."],
          ["Urutan Penulisan Klausa", "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT", "Urutan standar yang wajib diikuti ketika menulis struktur sintaks query SELECT di text editor."],
          ["Urutan Eksekusi Query", "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT", "Urutan asli bagaimana mesin MySQL memproses data di balik layar. Karena alasan inilah, nama alias (AS) yang dibuat di klausul SELECT tidak bisa dipakai di WHERE, tetapi sudah bisa dibaca di klausul ORDER BY."],
          ["Common Table Expression (CTE)", "WITH ... AS (MySQL 8.0+)", "Membuat tabel virtual sementara yang memiliki nama di bagian awal query. Membuat query yang kompleks dan rumit menjadi jauh lebih rapi dan mudah dibaca dibanding menggunakan subquery bertumpuk."],
          ["Recursive CTE", "WITH RECURSIVE", "Jenis CTE khusus yang mampu memanggil dirinya sendiri secara berulang. Sangat sering diandalkan untuk mengolah data hierarkis seperti struktur kategori produk bertingkat atau silsilah organisasi."],
          ["Subquery", "Query di dalam query", "Query pendukung yang disisipkan di dalam query utama. Bisa diletakkan pada bagian SELECT (scalar subquery), bagian FROM (derived table), atau di bagian WHERE (biasanya dipadukan bersama operator IN atau EXISTS)."]
        ]
      },
      "language": "sql",
      "codeTitle": "DML & CTE",
      "code": `
WITH ringkasan AS (
  SELECT customer_id, SUM(total) AS total_belanja
  FROM orders
  WHERE status = 'paid'
  GROUP BY customer_id
)
SELECT customers.name, ringkasan.total_belanja
FROM ringkasan
JOIN customers ON customers.id = ringkasan.customer_id
WHERE ringkasan.total_belanja > 500000
ORDER BY ringkasan.total_belanja DESC;

INSERT INTO products (id, name, stock)
VALUES (1, 'React Fundamental', 30)
ON DUPLICATE KEY UPDATE stock = stock + VALUES(stock);`,
      "id": "mysql-workbench-14-dml-urutan-eksekusi"
    },
    {
      "title": "SQL Statement — DCL, TCL, dan Stored Program (Ch. 15)",
      "description": "DCL mengatur izin akses user, TCL mengatur keutuhan sekumpulan perubahan data lewat transaksi.",
      "table": {
        "columns": ["Fitur / Komponen", "Kategori / Pemicu", "Keterangan / Logika Penggunaan"],
        "rows": [
          ["GRANT & REVOKE", "DCL (Data Control Language)", "GRANT digunakan untuk memberikan hak akses tertentu (seperti SELECT, INSERT, ALL PRIVILEGES) kepada user. REVOKE digunakan untuk mencabut kembali hak akses tersebut."],
          ["START TRANSACTION", "TCL (Transaction Control Language)", "Memulai sekumpulan operasi perubahan data yang harus sukses semua atau gagal semua sebagai satu kesatuan yang utuh (prinsip Atomicity)."],
          ["COMMIT & ROLLBACK", "TCL (Transaction Control Language)", "COMMIT digunakan untuk menyimpan seluruh rangkaian perubahan data dalam transaksi secara permanen. ROLLBACK digunakan untuk membatalkan seluruh perubahan sejak transaksi dimulai."],
          ["SAVEPOINT", "TCL (Transaction Control Language)", "Membuat titik penanda (*checkpoint*) di tengah-tengah transaksi, sehingga Anda bisa melakukan ROLLBACK TO SAVEPOINT tanpa harus membatalkan seluruh rangkaian transaksi dari awal."],
          ["Logika Transaksi", "Pentingnya Manajemen Transaksi", "Dalam kasus transfer saldo (kurangi saldo A, tambah saldo B), jika terjadi error di tengah proses, ROLLBACK memastikan tidak ada uang yang hilang atau data yang tersimpan setengah-jadi."],
          ["PROCEDURE vs FUNCTION", "Stored Programs", "PROCEDURE dipanggil menggunakan perintah CALL dan bisa mengembalikan banyak output. FUNCTION dipanggil langsung di dalam ekspresi query (contoh: SELECT nama_fungsi()) dan wajib mengembalikan satu nilai lewat perintah RETURN."],
          ["DELIMITER", "Sintaks Stored Programs", "Mengubah pembatas pernyataan (*statement delimiter*) sementara waktu (biasanya menjadi //) agar tanda titik koma (;) di dalam tubuh PROCEDURE/FUNCTION/TRIGGER tidak langsung dianggap sebagai akhir perintah oleh client SQL."],
          ["TRIGGER", "Stored Programs", "Blok kode program yang otomatis dieksekusi oleh sistem ketika terjadi *event* tertentu (BEFORE atau AFTER proses INSERT, UPDATE, atau DELETE) pada suatu tabel."]
        ]
      },
      "language": "sql",
      "codeTitle": "DCL & TCL",
      "code": `
GRANT SELECT, INSERT ON online_shop.* TO 'staff'@'localhost';
REVOKE INSERT ON online_shop.* FROM 'staff'@'localhost';

START TRANSACTION;
UPDATE accounts SET saldo = saldo - 100000 WHERE id = 1;
SAVEPOINT sebelum_tambah;
UPDATE accounts SET saldo = saldo + 100000 WHERE id = 2;
COMMIT;`,
      "id": "mysql-workbench-15-dcl-tcl"
    },
    {
      "title": "Normalisasi Database — Kenapa Perlu, 1NF, 2NF",
      "description": "Normalisasi BUKAN bagian dari MySQL Reference Manual — ini teori desain database relasional umum (Codd) supaya schema bebas redundansi dan anomali. Tetap penting dikuasai karena menentukan bagaimana tabel-tabel di atas seharusnya dirancang.",
      "table": {
        "columns": ["Konsep / Istilah", "Jenis / Aturan", "Keterangan / Logika Praktis"],
        "rows": [
          ["Tujuan Normalisasi", "Optimalisasi Struktur Data", "Menghilangkan redundansi (duplikasi) data dan mencegah terjadinya tiga jenis anomali, yaitu: insert anomaly, update anomaly, dan delete anomaly."],
          ["Insert Anomaly", "Anomali Data", "Kondisi di mana kita tidak bisa menambahkan suatu data baru tanpa adanya data lain yang belum tentu tersedia (misal: tidak bisa menginput kategori baru jika belum ada produknya)."],
          ["Update Anomaly", "Anomali Data", "Terjadi ketika informasi yang sama diulang di banyak baris. Jika ada perubahan, semua baris itu wajib di-update; jika terlewat satu saja, data menjadi tidak konsisten."],
          ["Delete Anomaly", "Anomali Data", "Kondisi di mana tindakan menghapus satu baris data tanpa sengaja ikut melenyapkan informasi penting lain yang kebetulan 'menumpang' di baris tersebut."],
          ["1NF (First Normal Form)", "Aturan Bentuk Normal", "Setiap kolom wajib bersifat atomik (hanya berisi satu nilai per sel) dan tidak boleh ada kolom berulang (*repeating group*) seperti kolom produk1, produk2, produk3."],
          ["2NF (Second Normal Form)", "Aturan Bentuk Normal", "Harus memenuhi syarat 1NF terlebih dahulu, DAN setiap kolom non-key harus bergantung penuh kepada seluruh primary key. Aturan ini baru relevan jika tabel menggunakan *composite key* (key gabungan)."],
          ["Partial Dependency", "Pelanggaran 2NF", "Terjadi ketika sebuah kolom non-key hanya bergantung kepada sebagian saja dari *composite key*. Solusinya, kolom tersebut harus dipisah ke tabel baru tersendiri."],
          ["Logika Praktis", "Prinsip Desain Database", "Untuk memastikan tabel sudah normal, teruslah bertanya: 'Apakah kolom ini benar-benar milik entitas ini, atau dia sebenarnya cuma menumpang dari entitas lain?'"]
        ]
      },
      "image": true,
      "imageLabel": "SISIPKAN GAMBAR: ilustrasi before-after tabel dari belum normal menuju 1NF lalu 2NF.",
      "language": "sql",
      "codeTitle": "1NF & 2NF",
      "code": `
-- SEBELUM 1NF: ada kolom berulang (repeating group)
-- order_id | customer | produk1 | produk2

-- SETELAH 1NF: satu produk per baris, atomik
CREATE TABLE order_items_1nf (
  order_id BIGINT,
  customer VARCHAR(120),
  produk VARCHAR(150)
);

-- SETELAH 2NF: pisahkan kolom yang cuma bergantung ke order_id
CREATE TABLE orders_2nf (
  order_id BIGINT PRIMARY KEY,
  customer VARCHAR(120)
);

CREATE TABLE order_items_2nf (
  order_id BIGINT,
  produk VARCHAR(150),
  PRIMARY KEY (order_id, produk)
);`,
      "id": "mysql-workbench-16-normalisasi-1nf-2nf"
    },
    {
      "title": "Normalisasi Database — 3NF, BCNF, dan Ringkasan",
      "description": "Lanjutan normalisasi sampai level yang lebih ketat, plus ringkasan trade-off supaya tahu kapan harus berhenti menormalisasi.",
      "table": {
        "columns": ["Konsep / Bentuk Normal", "Aturan / Fenomena", "Keterangan / Praktik Nyata"],
        "rows": [
          ["3NF (Third Third Form)", "Menghilangkan Transitive Dependency", "Harus memenuhi syarat 2NF terlebih dahulu. Tidak boleh ada kolom non-key yang bergantung kepada kolom non-key lainnya, melainkan harus langsung bergantung ke primary key."],
          ["Contoh Transitive Dependency", "Pelanggaran 3NF", "Misalnya, order_id menentukan customer_id, dan customer_id menentukan customer_city. Kolom customer_city harus dipindahkan ke tabel customers, bukan disimpan di tabel orders."],
          ["BCNF (Boyce-Codd Normal Form)", "Versi ketat dari 3NF", "Relevan jika tabel memiliki lebih dari satu candidate key yang saling tumpang tindih (*overlap*) secara fungsional. Untuk proyek sehari-hari, tingkat 3NF biasanya sudah cukup."],
          ["4NF (Fourth Normal Form)", "Menghilangkan Multi-valued Dependency", "Dua atribut bernilai banyak (*multi-value*) yang saling independen (misalnya daftar skill dan daftar hobi seseorang) tidak boleh digabungkan di dalam satu tabel yang sama."],
          ["5NF (Fifth Normal Form)", "Menghilangkan Join Dependency", "Menghapus redundansi dari relasi kompleks yang sebenarnya bisa direkonstruksi dari beberapa tabel yang lebih kecil. Jarang sekali dibutuhkan pada proyek skala kecil hingga menengah."],
          ["Trade-off Normalisasi", "Integritas vs Performa", "Semakin tinggi level normalisasi, semakin bersih data dari redundansi dan anomali. Namun, query akan membutuhkan lebih banyak operasi JOIN sehingga berpotensi sedikit lebih lambat."],
          ["Praktik Nyata", "Batas Desain Industri", "Pada sebagian besar sistem nyata, desain database berhenti di tahap 3NF. Proses 'denormalisasi' (sengaja menduplikasi data) baru dilakukan sebagian demi mendongkrak performa query jika benar-benar dibutuhkan."],
          ["Studi Kasus", "Skema Toko Online", "Struktur skema tabel seperti customers, categories, products, orders, dan order_items yang ada di akhir materi merupakan contoh hasil desain yang sudah patuh mengikuti prinsip normalisasi hingga level 3NF."]
        ]
      },
      "language": "sql",
      "codeTitle": "3NF",
      "code": `
-- Pelanggaran 3NF: customer_city menumpang lewat customer_id
CREATE TABLE orders_bad (
  order_id BIGINT PRIMARY KEY,
  customer_id BIGINT,
  customer_city VARCHAR(100)  -- transitive dependency!
);

-- Versi 3NF: pisahkan customer_city ke tabel customers
CREATE TABLE customers_3nf (
  customer_id BIGINT PRIMARY KEY,
  customer_city VARCHAR(100)
);

CREATE TABLE orders_3nf (
  order_id BIGINT PRIMARY KEY,
  customer_id BIGINT,
  FOREIGN KEY (customer_id) REFERENCES customers_3nf(customer_id)
);`,
      "id": "mysql-workbench-17-normalisasi-3nf-bcnf"
    },
    {
      "title": "JOIN Semua Jenis",
      "description": "JOIN menggabungkan data dari beberapa table berdasarkan relasi. Pilih jenis JOIN sesuai hasil yang dibutuhkan.",
      "table": {
        "columns": ["Jenis JOIN", "Karakteristik Hasil", "Keterangan / Kasus Penggunaan"],
        "rows": [
          ["INNER JOIN", "Mengambil baris yang cocok di kedua tabel", "Hanya menampilkan data jika baris dari tabel pertama memiliki pasangan/relasi yang valid di tabel kedua."],
          ["LEFT JOIN", "Mengambil semua baris dari tabel kiri", "Menampilkan seluruh data dari tabel sebelah kiri beserta data yang cocok dari tabel kanan. Jika tidak ada pasangan di tabel kanan, kolom akan diisi nilai NULL."],
          ["RIGHT JOIN", "Kebalikan dari LEFT JOIN", "Menampilkan seluruh data dari tabel sebelah kanan beserta data yang cocok dari tabel kiri. Jika tidak ada pasangan di tabel kiri, kolom akan diisi nilai NULL."],
          ["FULL OUTER JOIN", "Mengambil semua baris dari kedua sisi", "Menampilkan seluruh data baik dari tabel kiri maupun kanan. Karena MySQL tidak mendukung perintah ini secara bawaan, biasanya disimulasikan menggunakan operator UNION antara LEFT JOIN dan RIGHT JOIN."],
          ["CROSS JOIN", "Menghasilkan perkalian kartesian (*Cartesian Product*)", "Mengombinasikan setiap baris dari tabel pertama dengan seluruh baris dari tabel kedua tanpa kondisi ikatan relasi khusus."],
          ["SELF JOIN", "Menggabungkan tabel dengan dirinya sendiri", "Operasi penggabungan yang memperlakukan satu tabel sebagai dua entitas berbeda. Sangat berguna untuk relasi data hierarkis di tabel yang sama, seperti relasi karyawan (*employee*) dan manajernya."]
        ]
      },
      "language": "sql",
      "codeTitle": "JOIN",
      "code": `
SELECT
  orders.id,
  customers.name AS customer_name,
  orders.total
FROM orders
INNER JOIN customers ON customers.id = orders.customer_id
ORDER BY orders.created_at DESC
LIMIT 10;`,
      "id": "mysql-workbench-18-join-semua-jenis"
    },
    {
      "title": "Studi Kasus Database Toko Online",
      "description": "Studi kasus ini membuat schema sederhana untuk pelanggan, kategori, produk, order, dan order item. Lalu data diquery dengan JOIN.",
      "table": {
        "columns": ["Nama Tabel / Komponen", "Fungsi Utama", "Keterangan / Hubungan Data"],
        "rows": [
          ["customers", "Menyimpan data pembeli", "Berisi informasi profil pengguna atau pelanggan yang melakukan registrasi dan transaksi."],
          ["categories", "Mengelompokkan produk", "Tabel referensi yang digunakan untuk mengorganisasi produk ke dalam kategori tertentu."],
          ["products", "Menyimpan katalog produk", "Berisi daftar barang yang dijual serta memiliki relasi (foreign key) ke tabel categories."],
          ["orders", "Menyimpan transaksi utama", "Mencatat data transaksi induk dari pelanggan, seperti tanggal order, status, dan foreign key ke pelanggan."],
          ["order_items", "Menyimpan detail produk", "Tabel penampung item spesifik yang dibeli dalam satu order (relasi many-to-many antara orders dan products beserta jumlah dan harga saat dibeli)."],
          ["Query Report", "Pelaporan Analitis", "Query yang menggabungkan seluruh tabel di atas menggunakan operasi JOIN untuk menyajikan data riwayat transaksi dan kalkulasi total belanja secara utuh."]
        ]
      },
      "language": "sql",
      "codeTitle": "Studi Kasus SQL",
      "code": `
CREATE DATABASE IF NOT EXISTS online_shop;
USE online_shop;

CREATE TABLE customers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE
);

CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO customers (name, email) VALUES
('Alya', 'alya@example.com'),
('Bima', 'bima@example.com');

INSERT INTO categories (name) VALUES ('Course'), ('Template');

INSERT INTO products (category_id, name, price, stock) VALUES
(1, 'React Fundamental', 250000, 25),
(2, 'Landing Page Kit', 150000, 40);

INSERT INTO orders (customer_id, status) VALUES (1, 'paid');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 250000),
(1, 2, 2, 150000);

SELECT
  orders.id AS order_id,
  customers.name AS customer,
  products.name AS product,
  categories.name AS category,
  order_items.quantity,
  order_items.price,
  order_items.quantity * order_items.price AS subtotal
FROM orders
JOIN customers ON customers.id = orders.customer_id
JOIN order_items ON order_items.order_id = orders.id
JOIN products ON products.id = order_items.product_id
JOIN categories ON categories.id = products.category_id
WHERE orders.status = 'paid'
ORDER BY orders.created_at DESC;`,
      "id": "mysql-workbench-19-studi-kasus-database-toko-online"
    },
{
      "title": "Materi Pa Septi",
      "description": "Materi Prioritas Backend PBL Pengembangan Web ",
      "id": "materi-pa-septi"   
    },
    {
      "id": "mysql-workbench-20-latihan-01-ddl-dml-lampu",
      "title": "Latihan 01 - DDL & DML Dasar (Lampu On/Off)",
      "description": "Latihan dasar DDL (membuat database & tabel) dan DML (mengisi & mengambil data), dipadukan dengan fungsi IF untuk mengubah tampilan data 'On'/'Off' menjadi 'Nyala'/'Mati'.",
      "table": {
        "columns": ["Konsep / Perintah", "Keterangan / Contoh Ilustrasi"],
        "rows": [
          ["DDL (Data Definition Language)", "Bahasa SQL untuk membuat, mengubah, dan menghapus struktur database atau tabel. Contohnya adalah membuat pondasi rumah."],
          ["DML (Data Manipulation Language)", "Bahasa SQL untuk memanipulasi, mengisi, mengubah, atau mengambil data di dalam tabel yang sudah dibuat. Contohnya adalah mengisi perabotan ke dalam rumah."],
          ["CREATE DATABASE", "Digunakan untuk membuat database baru sebagai wadah besar untuk menyimpan tabel-tabel."],
          ["USE", "Digunakan untuk memilih dan mengaktifkan database yang ingin kita gunakan atau utak-atik."],
          ["DROP DATABASE", "Digunakan untuk menghapus seluruh database beserta semua tabel dan data di dalamnya secara permanen."],
          ["CREATE TABLE", "Digunakan untuk membuat tabel baru lengkap dengan nama kolom dan tipe datanya."],
          ["VARCHAR(3)", "Tipe data untuk teks atau huruf yang panjang maksimalnya dibatasi hanya 3 karakter (contoh: 'On' = 2 karakter, 'Off' = 3 karakter)."],
          ["INSERT INTO", "Digunakan untuk memasukkan data atau baris baru ke dalam tabel yang dituju."],
          ["VALUES", "Digunakan untuk mendefinisikan isi atau nilai data nyata yang ingin dimasukkan ke dalam kolom tabel."],
          ["SELECT", "Digunakan untuk mengambil, menampilkan, dan melihat data dari tabel."],
          ["Tanda Bintang (*)", "Simbol yang berarti 'pilih atau tampilkan semua kolom' yang ada di dalam tabel tanpa terkecuali."],
          ["IF(kondisi, benar, salah)", "Fungsi logika untuk mengubah tampilan data berdasarkan syarat tertentu. Jika kolom lampu berisi 'On', maka tampilkan 'Nyala'. Jika tidak, tampilkan 'Mati'."],
          ["AS status", "Digunakan untuk memberikan nama samaran (alias) pada kolom baru hasil formula IF agar judulan kolomnya rapi bernama 'status'."],
          ["FROM", "Digunakan untuk menunjuk tabel asal mana yang ingin kita ambil datanya."]
        ]
      },
      "language": "sql",
      "codeTitle": "LATIHAN 01",
      "code": `
/*--------------------*/
/*   INI BAGIAN DDL   */
/*--------------------*/

DROP DATABASE IF EXISTS book1;                               # Menghapus database lama jika ada
CREATE DATABASE IF NOT EXISTS book1;                         # Membuat database baru
USE book1;                                                   # Mengaktifkan database book1

CREATE TABLE sheet1 (
  lampu VARCHAR(3)                                           # Kolom dengan tipe data teks
);

/*--------------------*/
/*   INI BAGIAN DML   */
/*--------------------*/
INSERT INTO sheet1 VALUES ('On');                            # Memasukkan data satu per satu
INSERT INTO sheet1 VALUES ('Off');
INSERT INTO sheet1 VALUES ('On'), ('Off');                   # Memasukkan banyak data sekaligus

SELECT *,
   IF(lampu = 'On', 'Nyala', 'Mati') AS status               # Formula mengubah status lampu
FROM sheet1;                                                 # Menunjuk objek tabel`
    },
    {
      "id": "mysql-workbench-21-latihan-02-lampu-lalu-lintas",
      "title": "Latihan 02 - Nested IF (Lampu Lalu Lintas)",
      "description": "Latihan penggunaan Nested IF (IF di dalam IF) untuk memeriksa lebih dari satu kondisi secara berurutan, menggunakan studi kasus warna lampu lalu lintas.",
      "table": {
        "columns": ["Sintaks / Perintah", "Keterangan / Logika Penggunaan"],
        "rows": [
          ["CREATE TABLE sheet2", "Membuat tabel baru bernama sheet2 untuk menyimpan data lampu lalu lintas."],
          ["lampulalin VARCHAR(6)", "Membuat kolom bernama lampulalin dengan tipe data teks yang muat hingga maksimal 6 karakter (pas untuk kata 'Kuning' yang terdiri dari 6 huruf)."],
          ["INSERT INTO sheet2 (lampulalin)", "Perintah untuk memasukkan data baru khusus ke dalam kolom lampulalin."],
          ["VALUES ('Merah'), ('Kuning'), ('Hijau')", "Nilai atau teks nyata yang dimasukkan ke dalam tabel, yaitu warna-warna lampu lalu lintas."],
          ["SELECT", "Perintah untuk mengambil dan menampilkan data dari tabel."],
          ["lampulalin", "Menampilkan kolom asli yang berisi warna lampu ('Merah', 'Kuning', 'Hijau')."],
          ["IF di dalam IF (Nested IF)", "Fungsi logika bertingkat untuk memeriksa lebih dari satu kondisi secara berurutan: 1) Jika 'Merah' menjadi 'Berhenti'. 2) Jika 'Kuning' menjadi 'Berhati-hati'. 3) Sisa kondisi lainnya (artinya 'Hijau') otomatis menjadi 'Berjalan'."],
          ["AS status", "Membuat kolom tiruan baru untuk menampung hasil logika IF di atas dengan judul kolom 'status'."],
          ["FROM sheet2", "Menunjuk bahwa data yang ingin diambil dan diproses berasal dari tabel sheet2."]
        ]
      },
      "language": "sql",
      "codeTitle": "LATIHAN 02",
      "code": `
CREATE TABLE sheet2 (                                        # Membuat tabel sheet2
    lampulalin VARCHAR(6)
);

INSERT INTO sheet2 (lampulalin)
VALUES
    ('Merah'),
    ('Kuning'),
    ('Hijau');

SELECT
    lampulalin,
    IF(
        lampulalin = 'Merah',
        'Berhenti',
        IF(
            lampulalin = 'Kuning',
            'Berhati-hati',
            'Berjalan'
        )
    ) AS status
FROM sheet2;`
    },
    {
      "id": "mysql-workbench-22-latihan-03-status-teman",
      "title": "Latihan 03 - Nested IF Berlapis (Status Teman)",
      "description": "Latihan Nested IF yang lebih kompleks dengan dua tingkat pengecekan (status pernikahan dan jenis kelamin) sekaligus, ditambah kondisi darurat untuk data yang tidak sesuai.",
      "table": {
        "columns": ["Sintaks / Logika", "Keterangan / Aturan Penggunaan"],
        "rows": [
          ["CREATE TABLE statusTeman", "Membuat tabel baru bernama statusTeman dengan tiga kolom sekaligus: Nama (teks maks 50 karakter), Jenis_Kelamin (teks maks 6 karakter), dan Status (teks maks 10 karakter)."],
          ["INSERT INTO ... VALUES", "Memasukkan 6 baris data contoh yang berisi nama teman, jenis kelamin mereka (Pria/Wanita), dan status hubungan mereka saat ini (Sendiri/Kawin/Cerai)."],
          ["Cek Status Kawin", "Pertama, SQL melihat kolom Status. Jika isinya 'Kawin', maka otomatis keterangannya menjadi 'Menikah' (tanpa memandang jenis kelamin pria atau wanita)."],
          ["Cek Jika Pria", "Jika statusnya bukan 'Kawin', SQL akan memeriksa kolom Jenis_Kelamin. Jika bernilai 'Pria', maka dilakukan pengecekan status lanjutan: Jika Status = 'Sendiri' ditulis 'Bujangan', jika bukan 'Sendiri' (Cerai) ditulis 'Duda'."],
          ["Cek Jika Wanita", "Jika jenis kelaminnya bukan 'Pria' melainkan 'Wanita', SQL melakukan pengecekan status lanjutan: Jika Status = 'Sendiri' ditulis 'Perawan', jika bukan 'Sendiri' (Cerai) ditulis 'Janda'."],
          ["Kondisi Darurat", "Jika ada data jenis kelamin yang tidak cocok dengan 'Pria' atau 'Wanita', maka sistem otomatis akan menulis 'Tidak Diketahui'."]
        ]
      },
      "language": "sql",
      "codeTitle": "LATIHAN 03",
      "code": `
CREATE TABLE statusTeman (                                   # Membuat tabel statusTeman
    Nama VARCHAR(50),
    Jenis_Kelamin VARCHAR(6),
    Status VARCHAR(10)
);

INSERT INTO statusTeman (Nama, Jenis_Kelamin, Status)
VALUES
    ('Irfan', 'Pria', 'Sendiri'),
    ('Riyan', 'Pria', 'Kawin'),
    ('Rio', 'Pria', 'Cerai'),
    ('Nida', 'Wanita', 'Sendiri'),
    ('Ghefira', 'Wanita', 'Kawin'),
    ('Salsabila', 'Wanita', 'Cerai');

SELECT 
    Nama,
    Jenis_Kelamin,
    Status,
    IF(
        Status = 'Kawin', 
        'Menikah', 
        IF(
            Jenis_Kelamin = 'Pria', 
            IF(Status = 'Sendiri', 'Bujangan', 'Duda'), 
            IF(
                Jenis_Kelamin = 'Wanita', 
                IF(Status = 'Sendiri', 'Perawan', 'Janda'),
                'Tidak Diketahui'
            )
        )
    ) AS Keterangan
FROM statusTeman;`
    },
    {
      "id": "mysql-workbench-23-latihan-04-view-stored-procedure",
      "title": "Latihan 04 - View, Stored Procedure & CRUD (Data Warga)",
      "description": "Latihan komprehensif yang menggabungkan tipe data BOOL & ENUM dengan DEFAULT, pembuatan VIEW untuk logika keterangan status warga, serta beberapa STORED PROCEDURE untuk operasi CRUD (tampil, tambah, ubah, hapus) dan agregasi COUNT.",
      "table": {
        "columns": ["Sintaks / Perintah / Prosedur", "Keterangan / Alur Logika Perilaku"],
        "rows": [
          ["DROP DATABASE IF EXISTS book1;", "Menghapus database bernama book1 secara permanen dari server. Klausa IF EXISTS bertindak sebagai pengaman agar tidak muncul error jika database belum ada."],
          ["CREATE DATABASE book1;", "Membuat database baru bernama book1 yang berfungsi sebagai kontainer utama seluruh objek proyek."],
          ["USE book1;", "Mengaktifkan database book1 sehingga tabel atau objek yang dibuat setelahnya otomatis tersimpan di dalamnya."],
          ["CREATE TABLE staTem ( ... );", "Membuat tabel fisik baru bernama staTem dengan struktur kolom: Nama (VARCHAR(10)), kel (BOOL DEFAULT 1), dan stat (ENUM dengan pilihan 'Sendiri', 'Kawin', 'Cerai' DEFAULT 'Sendiri')."],
          ["Tipe Data BOOL & DEFAULT 1 (Kolom kel)", "Boolean yang di latar belakang disimpan sebagai TINYINT. Nilai DEFAULT 1 otomatis menganggap baris data sebagai 'Pria' jika kolom ini dikosongkan saat input."],
          ["Tipe Data ENUM & DEFAULT (Kolom stat)", "Tipe data enumerasi yang membatasi input hanya pada opsi daftar tetap. Opsi di luar itu akan ditolak. DEFAULT 'Sendiri' otomatis terisi jika data dikosongkan."],
          ["INSERT INTO staTem VALUES ( ... );", "Memasukkan baris data contoh baru ke tabel staTem. Penggunaan kata kunci DEFAULT di baris nilai akan memicu pengisian otomatis sesuai aturan default kolom (misal: kel=1, stat='Sendiri')."],
          ["DROP / CREATE VIEW v_staTem AS", "Menghapus view lama jika ada, lalu membuat view (tabel virtual) baru bernama v_staTem. Objek ini tidak memakan memori fisik harddisk melainkan hanya menyimpan rumus query real-time."],
          ["IF(kel = 1, 'Pria', 'Wanita') AS kelamin", "Fungsi kontrol alur di dalam View untuk mengonversi data biner angka 1 menjadi teks 'Pria' dan angka 0 menjadi teks 'Wanita' pada kolom bentukan baru."],
          ["Logika Pohon Keputusan (Nested IF View)", "Aturan klasifikasi bersarang pada View: 1) Jika stat='Kawin' menjadi 'Menikah'. 2) Jika Pria (kel=1) dan stat='Sendiri' menjadi 'Bujangan', stat='Cerai' menjadi 'Duda'. 3) Jika Wanita (kel=0) dan stat='Sendiri' menjadi 'Perawan', stat='Cerai' menjadi 'Janda'."],
          ["DELIMITER // dan DELIMITER ;", "Mengubah pembatas statement SQL dari perintah standar (;) menjadi (//) sementara waktu, agar tanda semicolon (;) di dalam tubuh blok program tidak memotong proses pembuatan prosedur."],
          ["CREATE PROCEDURE daftar ()", "Membuat fungsi/prosedur tersimpan tanpa parameter bernama daftar yang di dalamnya berisi perintah query SELECT untuk menampilkan data lengkap dari tabel virtual v_staTem."],
          ["Parameter (jns_kel VARCHAR(6)) & COUNT(*)", "Membuat prosedur dengan parameter input berupa teks jenis kelamin. Menggunakan fungsi agregat COUNT(*) dan klausa GROUP BY kel untuk menghitung jumlah total warga per gender."],
          ["Parameter (ket_warga VARCHAR(8))", "Prosedur dengan parameter input untuk menyaring data warga berdasarkan kolom jadian 'keterangan' (seperti 'Bujangan' atau 'Menikah') yang bersumber langsung dari data View."],
          ["UPDATE staTem SET ... WHERE Nama = ...", "Perintah untuk mengubah isi data biner gender (kel) berdasarkan parameter target_nama. Klausa WHERE berfungsi sebagai pengaman krusial agar perubahan data tidak menimpa seluruh baris tabel."],
          ["DELETE FROM staTem WHERE Nama = ...", "Perintah untuk menghapus baris data warga secara spesifik dari tabel staTem berdasarkan parameter nama yang dilemparkan pengguna."],
          ["CALL daftar(); (Hasil Awal)", "Menampilkan 6 baris data bawaan awal (Irfan s/d Salsabila) lengkap dengan hasil konversi kolom otomatis seperti Bujangan, Perawan, Janda, dan Menikah."],
          ["CALL ins_staTeman('Asri', 1, 'Sendiri');", "Menambahkan data warga baru bernama Asri. Prosedur langsung memanggil fungsi daftar dan menampilkan data Asri terupdate dengan status 'Bujangan'."],
          ["CALL ins_staTeman('Damayanti', 0, 'Kawin');", "Menambahkan data warga baru bernama Damayanti. Tabel langsung menampilkan data terupdate dengan status otomatis 'Menikah'."],
          ["CALL daftar_jumlah_keterangan('Bujangan');", "Membuka ringkasan agregat baru. Menampilkan kategori status 'Bujangan' beserta hasil perhitungan jumlah totalnya yaitu angka 2 (Irfan dan Asri)."],
          ["CALL daftar_jumlah_keterangan('Menikah');", "Membuka ringkasan agregat baru. Menampilkan kategori status 'Menikah' beserta hasil perhitungan jumlah totalnya yaitu angka 2 (Riyan dan Damayanti)."],
          ["CALL hapus_warga('Damayanti');", "Menghapus data warga Damayanti dari tabel. Layar otomatis menampilkan hasil tabel bersih terbaru yang sudah tidak memuat nama Damayanti."],
          ["CALL update_warga('Asri', 0, 'Kawin');", "Mengubah data Asri (gender ditimpa ke 0 dan status ke 'Kawin'). Hasilnya, kolom keterangan pada baris Asri otomatis berubah instan dari 'Bujangan' menjadi 'Menikah'."]
        ]
      },
      "language": "sql",
      "codeTitle": "LATIHAN 04",
      "code": `
-- ========================================================
-- 1. INISIALISASI DATABASE & TABEL UTAMA
-- ========================================================
DROP DATABASE IF EXISTS book1; 
CREATE DATABASE book1;
USE book1;

CREATE TABLE staTem (
    Nama VARCHAR(10),
    kel BOOL DEFAULT 1,                                         # 1 untuk Pria, 0 untuk Wanita
    stat ENUM('Sendiri', 'Kawin', 'Cerai') DEFAULT 'Sendiri'    # Pilihan data terbatas
);

INSERT INTO staTem VALUES 
('Irfan', DEFAULT, DEFAULT),
('Riyan', DEFAULT, 'Kawin'),
('Rio', DEFAULT, 'Cerai'),
('Nida', 0, DEFAULT),
('Ghefira', 0, DEFAULT),
('Salsabila', 0, 'Cerai');


-- ========================================================
-- 2. MEMBUAT VIEW UTAMA (NAMA, KELAMIN, STAT, KETERANGAN)
-- ========================================================
DROP VIEW IF EXISTS v_staTem;
CREATE VIEW v_staTem AS
SELECT 
    Nama,     
    IF(kel = 1, 'Pria', 'Wanita') AS kelamin,     
    stat,     
    IF(kel = 1,        
        IF(stat = 'Sendiri', 'Bujangan', 			
            IF(stat = 'Kawin', 'Menikah', 'Duda')        
        ),       
        IF(stat = 'Sendiri', 'Perawan',        
            IF(stat = 'Kawin', 'Menikah', 'Janda')       
        ) 
    ) AS keterangan  
FROM staTem;


-- ========================================================
-- 3. MEMBUAT SEMUA STORED PROCEDURE
-- ========================================================


DROP PROCEDURE IF EXISTS daftar;
DELIMITER //
CREATE PROCEDURE daftar ()
BEGIN 
	SELECT Nama, kelamin, stat, keterangan FROM v_staTem;
END//
DELIMITER ;



DROP PROCEDURE IF EXISTS daftar_jumlah_kel;
DELIMITER //
CREATE PROCEDURE daftar_jumlah_kel (
	jns_kel VARCHAR(6)
)
BEGIN 
	SELECT IF(kel = 1, 'Pria', 'Wanita') AS kelamin,
		   COUNT(*) AS jumlah
	FROM staTem
    WHERE IF(kel = 1, 'Pria', 'Wanita') = jns_kel
    GROUP BY kel;
END//
DELIMITER ;



DROP PROCEDURE IF EXISTS daftar_jumlah_keterangan;
DELIMITER //
CREATE PROCEDURE daftar_jumlah_keterangan(
     ket_warga VARCHAR(8)
)
BEGIN
      SELECT keterangan,
             COUNT(keterangan) AS Jumlah
      FROM   v_staTem                    
      WHERE  keterangan = ket_warga
      GROUP BY keterangan;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS ins_staTeman;
DELIMITER //
CREATE PROCEDURE ins_staTeman(
	sp_nama VARCHAR(10),
    sp_kel BOOL,
    sp_stat VARCHAR(7)
)
BEGIN
	INSERT INTO staTem VALUES (sp_nama, sp_kel, sp_stat);
    CALL daftar(); 
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS ubah_gender_warga;
DELIMITER //
CREATE PROCEDURE ubah_gender_warga(
	target_nama VARCHAR(10),
    gender_baru BOOL
)
BEGIN
	UPDATE staTem 
    SET kel = gender_baru 
    WHERE Nama = target_nama;
    CALL daftar(); 
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS update_warga;
DELIMITER //
CREATE PROCEDURE update_warga(
	target_nama VARCHAR(10),
    gender_baru BOOL,
    stat_baru VARCHAR(7)
)
BEGIN
	UPDATE staTem 
    SET kel = gender_baru,
        stat = stat_baru
    WHERE Nama = target_nama;
    CALL daftar();
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS hapus_warga;
DELIMITER //
CREATE PROCEDURE hapus_warga (
    target_nama VARCHAR(10)
)
BEGIN 
    DELETE FROM staTem WHERE Nama = target_nama;
    CALL daftar(); -- Otomatis menampilkan tabel terbaru setelah dihapus
END//
DELIMITER ;


CALL daftar();


CALL ins_staTeman('Asri', 1, 'Sendiri');
CALL ins_staTeman('Damayanti', 0, 'Kawin');

CALL daftar_jumlah_keterangan('Bujangan');
CALL daftar_jumlah_keterangan('Menikah');

CALL hapus_warga('Damayanti');
CALL update_warga('Asri', 0, 'Kawin');`
    },
    {
      "id": "mysql-workbench-23-latihan-02-lampu-lalu-lintas",
      "title": "TUGAS 01 ",
      "description": "TUGAS 01 MULAI UWAAW",
      "table": {
        "columns": ["Sintaks / Perintah", "Keterangan / Logika Penggunaan"],
      "rows": [
        ["DROP DATABASE IF EXISTS Kalkulator;", "Menghapus database bernama Kalkulator secara permanen dari server jika sudah pernah ada, untuk memastikan skrip dapat dijalankan ulang dari kondisi bersih."],
        ["CREATE DATABASE Kalkulator;", "Membuat database baru bernama Kalkulator sebagai ruang penyimpanan utama proyek kalkulator."],
        ["USE Kalkulator;", "Mengaktifkan database Kalkulator agar seluruh operasi pembuatan tabel, fungsi, dan prosedur tersimpan di dalamnya."],
        ["DROP TABLE IF EXISTS SimpleKalkulator;", "Menghapus tabel lama bernama SimpleKalkulator jika sudah ada sebelumnya agar tidak terjadi bentrokan struktur data."],
        ["CREATE TABLE SimpleKalkulator ( ... );", "Membuat tabel fisik untuk mencatat riwayat perhitungan dengan kolom: Nilai_A (INT), Operator (VARCHAR(10)), Nilai_B (INT), dan Hasil (DECIMAL(10,2)) demi akurasi angka desimal."],
        ["DELIMITER // dan DELIMITER ;", "Mengubah pembatas perintah standar (;) menjadi (//) sementara waktu agar tanda titik koma di dalam tubuh program (BEGIN...END) tidak menghentikan proses kompilasi fungsi/prosedur."],
        ["CREATE FUNCTION hitungKalkulator ( ... )", "Membuat fungsi mandiri bernama hitungKalkulator yang menerima input Nilai A, Operator, dan Nilai B, serta wajib mengembalikan satu nilai angka bertipe desimal (RETURNS DECIMAL)."],
        ["RETURNS ... DETERMINISTIC", "Deklarasi yang menjamin bahwa fungsi akan selalu menghasilkan output yang sama jika diberikan nilai input yang sama (wajib di MySQL untuk fungsi pengolahan data konstan)."],
        ["Nested IF (Badan Fungsi)", "Logika kalkulasi bertingkat: 1) Jika 'KALI' lakukan perkalian. 2) Jika 'BAGI' cek jika Nilai B adalah 0 maka hasilkan 0 (mencegah error division by zero), jika bukan lakukan pembagian. 3) Jika 'TAMBAH' lakukan penjumlahan. 4) Jika 'KURANG' lakukan pengurangan."],
        ["CREATE PROCEDURE kalkulatorLengkap ( ... )", "Membuat prosedur tersimpan bernama kalkulatorLengkap yang menerima 3 parameter input untuk memproses dan mengotomatisasi pencatatan kalkulasi."],
        ["INSERT INTO ... VALUES ( ... )", "Bagian inti prosedur yang memasukkan data angka, nama operator, sekaligus memanggil fungsi 'hitungKalkulator' secara real-time untuk mengisi kolom Hasil secara otomatis."],
        ["CALL kalkulatorLengkap(5, 'KALI', 5);", "Mengeksekusi perhitungan perkalian 5 x 5. Prosedur otomatis mencatat data ke tabel dan menghasilkan nilai 25.00 pada kolom Hasil."],
        ["CALL kalkulatorLengkap(10, 'BAGI', 4);", "Mengeksekusi perhitungan pembagian 10 / 4. Prosedur otomatis mencatat data dan menghasilkan nilai desimal presisi yaitu 2.50."],
        ["CALL kalkulatorLengkap(20, 'KURANG', 7);", "Mengeksekusi perhitungan pengurangan 20 - 7. Prosedur otomatis mencatat data dan menghasilkan nilai 13.00."],
        ["SELECT * FROM SimpleKalkulator;", "Menampilkan seluruh baris riwayat data kalkulasi yang telah diproses oleh prosedur ke layar dalam bentuk tabel."]
      ]
    },
    "language": "sql",
    "codeTitle": "TUGAS 01",
    "code": "DROP DATABASE IF EXISTS Kalkulator; \nCREATE DATABASE Kalkulator;\nUSE Kalkulator;\n\nDROP TABLE IF EXISTS SimpleKalkulator; \n\nCREATE TABLE SimpleKalkulator (\n    Nilai_A INT,\n    Operator VARCHAR(10),\n    Nilai_B INT,\n    Hasil DECIMAL(10,2)\n);\n\nDELIMITER //\nDROP FUNCTION IF EXISTS hitungKalkulator //\nCREATE FUNCTION hitungKalkulator(\n    f_nilaiA INT,\n    f_Operator VARCHAR(10),\n    f_nilaiB INT\n)\nRETURNS DECIMAL(10,2) DETERMINISTIC\nBEGIN\n    RETURN \n    IF(f_Operator = 'KALI', \n       f_nilaiA * f_nilaiB,\n    IF(f_Operator = 'BAGI', \n       IF(f_nilaiB = 0, 0, f_nilaiA / f_nilaiB),\n    IF(f_Operator = 'TAMBAH', \n       f_nilaiA + f_nilaiB,\n    IF(f_Operator = 'KURANG', \n       f_nilaiA - f_nilaiB, \n       0))));\nEND//\nDELIMITER ;\n\nDELIMITER //\nDROP PROCEDURE IF EXISTS kalkulatorLengkap //\nCREATE PROCEDURE kalkulatorLengkap(\n    sp_nilaiA INT,\n    sp_operator VARCHAR(10),\n    sp_nilaiB INT\n)\nBEGIN\n    INSERT INTO SimpleKalkulator (\n        Nilai_A, \n        Operator, \n        Nilai_B, \n        Hasil\n    )\n    VALUES (\n        sp_nilaiA, \n        sp_operator, \n        sp_nilaiB, \n        hitungKalkulator(\n            sp_nilaiA, \n            sp_operator, \n            sp_nilaiB\n        )\n    );\nEND //\nDELIMITER ;\n\nCALL kalkulatorLengkap(5, 'KALI', 5);\nCALL kalkulatorLengkap(10, 'BAGI', 4);\nCALL kalkulatorLengkap(20, 'KURANG', 7);\n\nSELECT * FROM SimpleKalkulator;"
    },
        {
      "id": "mysql-workbench-24-latihan-02-lampu-lalu-lintas",
      "title": "TUGAS 02 ",
      "description": "TUGAS 01 MULAI UWAAW",
      "table": {
        "columns": ["Sintaks / Perintah", "Keterangan / Logika Penggunaan"],
      "rows": [
        ["CREATE DATABASE IF NOT EXISTS db_asn;", "Membuat database baru bernama db_asn jika belum ada, sebagai wadah utama penyimpanan data Aparatur Sipil Negara."],
        ["USE db_asn;", "Mengaktifkan database db_asn agar seluruh operasi pembuatan tabel dan prosedur tersimpan di dalamnya."],
        ["CREATE TABLE pns ( ... );", "Membuat tabel fisik pns dengan kolom nip (PRIMARY KEY), nama, tanggal_lahir, tanggal_pns (tipe DATE set tanggal 1), jenis_kelamin (ENUM), dan no_urut."],
        ["INSERT INTO pns ( ... ) VALUES ( ... )", "Memasukkan 5 baris data contoh PNS lengkap dengan kombinasi NIP 18 digit yang mencerminkan tanggal lahir, TMT PNS, kode gender, dan nomor urut."],
        ["CREATE PROCEDURE TampilkanDataPNS()", "Membuat prosedur tersimpan untuk mengekstrak dan memformat data mentah NIP menjadi informasi siap baca tanpa parameter input."],
        ["STR_TO_DATE(LEFT(nip, 8), '%Y%m%d')", "Fungsi ekstraksi pada prosedur untuk mengambil 8 digit pertama NIP dan mengonversinya menjadi tipe data DATE (Tanggal Lahir asli)."],
        ["DATE_FORMAT( ... , '%W, %d %M %Y')", "Mengubah tampilan visual tanggal lahir hasil ekstraksi menjadi format teks lengkap, contohnya: nama hari, tanggal, nama bulan, dan tahun."],
        ["CONCAT(MID(nip, 9, 6), '01')", "Memotong 6 digit NIP dari posisi ke-9 (tahun dan bulan pengangkatan) lalu menyatukannya dengan teks '01' agar membentuk format tanggal yang valid."],
        ["IF(MID(nip, 15, 1) = '1', 'Pria', 'Wanita')", "Fungsi logika untuk memeriksa digit ke-15 NIP. Jika bernilai '1' maka otomatis tampil 'Pria', jika tidak (bernilai '2') maka tampil 'Wanita'."],
        ["RIGHT(nip, 3) AS 'No.Urut'", "Mengambil 3 digit terakhir dari NIP untuk memunculkan nomor urut PNS secara rapi."],
        ["CREATE PROCEDURE EditPNS( ... )", "Membuat prosedur dengan parameter input_nip dan input_nama yang berfungsi untuk mengotomatisasi proses penambahan atau pembaruan data."],
        ["INSERT INTO ... ON DUPLICATE KEY UPDATE", "Menggunakan pola *upsert*. Jika NIP baru dimasukkan maka akan disimpan sebagai baris baru, tetapi jika NIP sudah ada, sistem otomatis mengupdate nama PNS tersebut."],
        ["SELECT CONCAT( ... ) AS Status", "Menghasilkan pesan teks notifikasi dinamis real-time di layar yang mengonfirmasi bahwa proses simpan atau edit data PNS telah berhasil."],
        ["CALL TampilkanDataPNS();", "Mengeksekusi prosedur untuk menampilkan hasil konversi dan pemformatan data 5 PNS secara terstruktur di layar."]
      ]
    },
    "language": "sql",
    "codeTitle": "TUGAS 02",
    "code": "CREATE DATABASE IF NOT EXISTS db_asn;\nUSE db_asn;\n\nCREATE TABLE pns (\n    nip VARCHAR(18) NOT NULL PRIMARY KEY,\n    nama VARCHAR(150) NOT NULL,\n    tanggal_lahir DATE NOT NULL,\n    tanggal_pns DATE NOT NULL,\n    jenis_kelamin ENUM('Pria', 'Wanita') NOT NULL,\n    no_urut VARCHAR(3) NOT NULL\n);\n\nINSERT INTO pns (\n    nip, \n    nama, \n    tanggal_lahir, \n    tanggal_pns, \n    jenis_kelamin, \n    no_urut\n) \nVALUES\n('197209172005011002', 'Mohamad Septiawan', '1972-09-17', '2005-01-01', 'Pria', '002'),\n('198201312021012006', 'Damayanti', '1982-01-31', '2021-01-01', 'Wanita', '006'),\n('200901202023071003', 'Mohamad Naufal Dzakiy', '2009-01-20', '2023-07-01', 'Pria', '003'),\n('201406142024111002', 'Mohamad Tsaniy Atila Dzaka', '2014-06-14', '2024-11-01', 'Pria', '002'),\n('201511142025082002', 'Nabila Tsalsa Nuraisyah', '2015-11-14', '2025-08-01', 'Wanita', '002');\n\nDELIMITER //\nCREATE PROCEDURE TampilkanDataPNS()\nBEGIN\n    SELECT \n        nip AS 'NIP',\n        nama AS 'Nama',\n        DATE_FORMAT(\n            STR_TO_DATE(LEFT(nip, 8), '%Y%m%d'), \n            '%W, %d %M %Y'\n        ) AS 'Tanggal Lahir',\n        DATE_FORMAT(\n            STR_TO_DATE(\n                CONCAT(MID(nip, 9, 6), '01'), \n                '%Y%m%d'\n            ), \n            '%M %Y'\n        ) AS 'Tanggal PNS',\n        IF(MID(nip, 15, 1) = '1', 'Pria', 'Wanita') AS 'Jenis Kelamin',\n        RIGHT(nip, 3) AS 'No.Urut'\n    FROM pns;\nEND //\nDELIMITER ;\n\nDELIMITER //\nCREATE PROCEDURE EditPNS(\n    IN input_nip VARCHAR(18),\n    IN input_nama VARCHAR(150)\n)\nBEGIN\n    INSERT INTO pns (nip, nama) \n    VALUES (input_nip, input_nama)\n    ON DUPLICATE KEY UPDATE nama = input_nama;\n    \n    SELECT CONCAT(\n        'Data PNS dengan NIP ',\n        input_nip, \n        ' berhasil disimpan/diupdate!'\n    ) AS Status;\nEND //\nDELIMITER ;\n\nCALL TampilkanDataPNS();"    },


  ]
}

const MySQLWorkbench = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default MySQLWorkbench