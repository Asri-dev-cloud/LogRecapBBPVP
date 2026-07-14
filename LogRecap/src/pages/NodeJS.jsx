import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "D",
  "slug": "nodejs",
  "title": "Node JS & JS Dasar",
  "shortTitle": "Node JS",
  "route": "/nodejs",
  "icon": "SquareTerminal",
  "summary": "Node.js, npm, CLI, dan pondasi JavaScript.",
  "accent": "from-lime-400 via-emerald-300 to-cyan-300"
}

const material = {
  "title": "Node JS & JS Dasar",
  "subtitle": "Node.js membuat JavaScript bisa berjalan di luar browser. Materi ini menghubungkan instalasi Node, npm, CLI, mekanisme eksekusi, sampai dasar-dasar bahasa JavaScript: variabel, tipe data, operator, kondisional, looping, array, function, dan object.",
  "overview": [
    "Node.js sering dipakai untuk backend, tooling frontend, build system, script otomatisasi, dan package manager.",
    "npm adalah package manager bawaan Node untuk mengelola dependency dan script proyek.",
    "Sebelum React atau Tailwind, memahami JavaScript dasar akan membuat debugging jauh lebih mudah."
  ],
  "sections": [
    {
      "title": "Apa Itu Node.js",
      "description": "Node.js adalah sebuah runtime (tempat untuk mengeksekusi kode program) JavaScript yang menggunakan engine V8 JavaScript milik Google Chrome. Di browser, JavaScript hanya bisa berjalan di dalam browser itu sendiri. Node.js melepaskan JavaScript dari browser sehingga bisa berjalan langsung di atas sistem operasi.",
      "points": [
        "Di browser, JavaScript berinteraksi dengan DOM. Di Node.js, JavaScript berinteraksi dengan file system, network, process, dan package.",
        "Node.js cocok untuk API server, real-time app, CLI tool, automation script, dan development tooling.",
        "Ekosistem npm menyediakan ribuan package seperti Vite, Express, React Router, Tailwind, dan ESLint.",
        "Node memakai event loop sehingga efisien untuk banyak operasi I/O seperti request HTTP dan baca tulis file."
      ],
      "id": "nodejs-1-apa-itu-node-js"
    },
    {
      "title": "Karakteristik dan Fitur Node.js",
      "description": "Beberapa karakteristik inilah yang membuat Node.js populer untuk berbagai jenis aplikasi, mulai dari API sederhana sampai aplikasi realtime.",
      "points": [
        "Asynchronous & Event Driven: proses berjalan berdasarkan event, tidak harus menunggu satu proses selesai untuk memulai proses lain.",
        "Non Blocking: operasi I/O (baca file, request network) tidak menghentikan eksekusi kode lain.",
        "Single Threaded: Node.js berjalan pada satu thread utama namun tetap efisien berkat event loop.",
        "Cross Platform: dapat berjalan di Windows, macOS, maupun Linux.",
        "NPM: memiliki ekosistem package manager terbesar untuk JavaScript.",
        "Cocok digunakan untuk: Single Page App, Realtime App, API, dan Micro Services.",
        "Fitur bawaan Node.js: File System, Http & Https, REPL, Console, dan Kriptografi."
      ],
      "id": "nodejs-2-karakteristik-dan-fitur"
    },
    {
      "title": "Cara Install Node.js",
      "description": "Instalasi dapat dilakukan lewat installer resmi dari nodejs.org atau version manager seperti nvm. Untuk belajar, installer LTS paling mudah; untuk proyek dengan banyak versi, gunakan nvm.",
      "points": [
        "Unduh installer di https://nodejs.org/en/download, pilih versi LTS agar lebih stabil.",
        "Windows: jalankan setup wizard, pastikan opsi npm package manager dan Add to PATH tercentang, lalu klik Next hingga selesai.",
        "Windows dengan nvm-windows: install nvm, jalankan nvm install lts, lalu nvm use versi-yang-dipilih.",
        "macOS: gunakan installer LTS, Homebrew, atau nvm. Untuk developer aktif, nvm memudahkan pindah versi.",
        "Linux: gunakan NodeSource, package manager distro, atau nvm sesuai kebutuhan.",
        "Setelah install, restart terminal lalu cek instalasi dengan node -v dan npm -v."
      ],
      "language": "bash",
      "codeTitle": "Cek Instalasi",
      "code": "\nnode -v\nnpm -v\n\n# contoh dengan nvm\nnvm install --lts\nnvm use --lts",
      "id": "nodejs-3-cara-install-node-js"
    },
    {
      "title": "Tools dan Command Line",
      "description": "Tools dasar yang dipakai selama belajar Node.js adalah sistem operasi (Windows/macOS/Linux), text editor seperti Visual Studio Code, dan browser seperti Chrome. Command line dipakai setiap hari untuk berpindah folder, membuat file, dan menjalankan script.",
      "points": [
        "pwd: menampilkan path direktori kerja saat ini.",
        "cd <directory>: berpindah ke direktori tertentu, cd .. untuk naik ke folder induk.",
        "ls / ls -la: menampilkan isi direktori, -la juga menampilkan file tersembunyi.",
        "mkdir <directory>: membuat direktori baru.",
        "cat <file>: menampilkan isi file, less <file> untuk menampilkan dengan pagination.",
        "rm <file> / rm -r <directory>: menghapus file atau folder.",
        "mv <file-old> <file-new>: mengganti nama atau memindahkan file, cp untuk menyalin.",
        "touch <file>: membuat file baru atau memperbarui waktu modifikasi file.",
        "find <dir> -name \"<file>\": mencari file di dalam direktori."
      ],
      "id": "nodejs-4-tools-dan-command-line"
    },
    {
      "title": "NPM dan package.json",
      "description": "NPM (Node Package Manager) adalah pengelola paket yang membantu pengembang menemukan, menginstal, memperbarui, dan menghapus paket-paket (library, framework) seperti React, Express, atau MySQL yang dibutuhkan dalam proyek Node.js. Setiap proyek Node.js memiliki file package.json yang berisi deskripsi proyek tersebut.",
      "points": [
        "npm init atau npm init -y: membuat file package.json pada proyek.",
        "npm install <package-name>: memasang dan mendaftarkan package pada package.json.",
        "npm install -D <package-name>: memasang package sebagai devDependency.",
        "npm run-script <command> (atau npm run): menjalankan perintah yang ada pada objek scripts di package.json.",
        "npm uninstall <package-name>: menghapus package dari package.json.",
        "npm version: melihat versi package yang tersedia secara global atau lokal.",
        "Struktur package.json berisi informasi proyek (name, version, description, main), scripts, keywords, serta author dan license."
      ],
      "language": "bash",
      "codeTitle": "Perintah NPM Umum",
      "code": "\nnpm init -y\nnpm install express\nnpm install -D nodemon\nnpm run dev\nnpx create-vite my-app --template react",
      "id": "nodejs-5-npm-dan-package-json"
    },
    {
      "title": "Struktur Project",
      "description": "Proyek JavaScript modern umumnya memiliki struktur folder yang konsisten agar mudah dikelola.",
      "points": [
        "src/: folder utama yang berisi semua kode sumber JavaScript, biasanya ada components/ dan pages/ di dalamnya.",
        "public/: folder yang berisi file statis seperti index.html.",
        "index.js: titik masuk utama aplikasi.",
        "package.json: file yang berisi informasi proyek, dependensi, dan script.",
        "README.md: file yang menjelaskan proyek dan cara menjalankannya."
      ],
      "id": "nodejs-6-struktur-project"
    },
    {
      "title": "Mekanisme Eksekusi Node.js",
      "description": "Ada dua cara utama untuk menjalankan kode JavaScript menggunakan Node.js: lewat REPL secara interaktif, atau menjalankan file JavaScript secara langsung.",
      "points": [
        "REPL (Read - Eval - Print - Loop): menuliskan kode JavaScript langsung di command line dengan mengetikkan 'node', lalu setiap baris kode langsung dievaluasi dan hasilnya ditampilkan.",
        "Eksekusi File JavaScript: menuliskan kode dalam sebuah file .js kemudian menjalankannya dengan perintah 'node nama_file.js'.",
        "process.argv adalah properti Node.js yang menyimpan array argumen baris perintah saat program dijalankan, misalnya 'node nama.js NamaKamu'.",
        "Pada contoh tersebut, process.argv[0] berisi path node, process.argv[1] berisi path file, dan process.argv[2] berisi argumen tambahan yaitu 'NamaKamu'.",
        "Di browser, kode JavaScript disimpan dalam HTML dan langsung dijalankan oleh browser saat halaman dimuat."
      ],
      "language": "javascript",
      "codeTitle": "Contoh Eksekusi File & process.argv",
      "code": "\n// latihan-01.js\nconsole.log(\"Hello world!\")\n\n// latihan-02.js\n// dijalankan dengan: node latihan-02.js NamaKamu\nconst nama = process.argv[2]\nconsole.log(\"Selamat Datang, \" + nama)",
      "id": "nodejs-7-mekanisme-eksekusi"
    },
    {
      "title": "Perintah Menjalankan Aplikasi",
      "description": "Selain 'node nama_file.js', ada beberapa perintah lain yang umum dipakai saat mengembangkan aplikasi Node.js.",
      "points": [
        "node nama_file.js: mengeksekusi file JavaScript secara langsung.",
        "npm start: memanggil script yang telah didefinisikan dalam package.json, biasanya untuk menjalankan aplikasi dalam mode produksi.",
        "npm run dev: memanggil script yang telah didefinisikan dalam package.json, biasanya untuk menjalankan aplikasi dalam mode pengembangan.",
        "nodemon nama_file.js: memantau perubahan file dalam proyek dan otomatis merestart aplikasi setiap ada perubahan. Perlu diinstal terlebih dahulu dengan npm install nodemon."
      ],
      "language": "bash",
      "codeTitle": "Perintah Menjalankan Aplikasi",
      "code": "\nnode nama_file.js\nnpm start\nnpm run dev\n\n# perlu diinstal dulu: npm install nodemon\nnodemon nama_file.js",
      "id": "nodejs-8-perintah-menjalankan-aplikasi"
    },
    {
      "title": "Komentar dan Variabel",
      "description": "Komentar dipakai untuk memberi catatan pada kode tanpa memengaruhi eksekusi program. Variabel dipakai untuk menyimpan nilai yang bisa dipakai ulang di dalam program.",
      "points": [
        "Komentar satu baris menggunakan //, komentar banyak baris menggunakan /* ... */.",
        "var: nilainya dapat diganti, dapat dideklarasi ulang, umum dipakai pada JavaScript versi lama, dan tidak terikat block scope.",
        "let: nilainya dapat diganti namun tidak boleh dideklarasi ulang pada scope yang sama, merupakan penyempurnaan dari var yang mengatasi masalah scope.",
        "const: nilai atau tipe datanya tidak dapat diganti setelah didefinisikan, cocok dipakai untuk array dan object.",
        "Identifier adalah nama unik untuk mengidentifikasi sebuah variabel: penulisannya case sensitive, diawali huruf, dan dapat menggunakan huruf, angka, underscore, serta tanda dollar.",
        "Assignment (memberi nilai ke variabel) dilakukan dengan simbol sama dengan (=)."
      ],
      "language": "javascript",
      "codeTitle": "Komentar dan Variabel",
      "code": "\n// Komentar satu baris\nlet x = 5 // Mendeklarasi x, memberi nilai x dengan angka 5\n\n/*\nKomentar banyak baris\nMendeklarasi x, memberi nilai x dengan angka 5\n*/\nlet y = 5\n\nvar namaLama = \"John Doe\"\nvar namaLama = 0 // var boleh dideklarasi ulang\n\nlet umur = 10\n{\n  let umur = 2\n  // di sini umur dibaca 2\n}\n// di sini umur dibaca 10\n\nconst namaDepan = \"Okti\"\n// namaDepan = \"Ria\" -> error, const tidak bisa diubah",
      "id": "nodejs-9-komentar-dan-variabel"
    },
    {
      "title": "Scope Variabel",
      "description": "Scope menentukan di area mana sebuah variabel bisa diakses di dalam program.",
      "points": [
        "Local scope: variabel yang didefinisikan di dalam block { } tidak dapat diakses dari luar block tersebut, kecuali dideklarasikan dengan var.",
        "Function scope: variabel yang didefinisikan di dalam suatu fungsi tidak dapat diakses dari luar fungsi tersebut.",
        "Global scope: variabel yang dideklarasikan di luar fungsi dapat diakses secara global dari mana saja dalam program."
      ],
      "language": "javascript",
      "codeTitle": "Scope Variabel",
      "code": "\n{\n  let x = 2\n}\n// x tidak dapat digunakan di sini\n\nfunction myFunction() {\n  let carName = \"Volvo\" // Function Scope\n}\n\nlet globalVar = \"saya bisa diakses di mana saja\" // Global Scope",
      "id": "nodejs-10-scope-variabel"
    },
    {
      "title": "Operator",
      "description": "Operator dipakai untuk melakukan operasi terhadap nilai dan variabel, mulai dari perhitungan matematika sampai perbandingan logika.",
      "points": [
        "Arithmetic: + - * / % ** ++ -- untuk operasi matematika.",
        "Assignment: = += -= *= /= %= **= untuk memberi atau memperbarui nilai variabel.",
        "Comparison: == === != !== > < >= <= untuk membandingkan dua nilai. Biasakan === dan !== agar tidak terjadi konversi tipe otomatis.",
        "String: + dan += juga dipakai untuk menggabungkan (concatenate) string.",
        "Logical: && (dan), || (atau), ! (negasi) untuk menggabungkan kondisi logika, serta ?? untuk nullish coalescing.",
        "Type: typeof untuk mengembalikan tipe data sebuah variabel, instanceof untuk mengecek apakah objek merupakan instance dari tipe tertentu.",
        "Ternary: kondisi ? nilaiJikaBenar : nilaiJikaSalah, cara singkat menulis if-else."
      ],
      "language": "javascript",
      "codeTitle": "Variabel dan Operator",
      "code": "\nconst studentName = 'Alya'\nlet score = 85\nconst isPassed = score >= 75\n\nscore = score + 5\n\nconsole.log(studentName, score, isPassed)\nconsole.log(typeof score) // \"number\"",
      "id": "nodejs-11-operator"
    },
    {
      "title": "Tipe Data",
      "description": "JavaScript memiliki beberapa tipe data primitive dan reference yang perlu dipahami sebelum masuk ke struktur data yang lebih kompleks.",
      "points": [
        "String: kumpulan karakter teks, contoh let lastName = \"Johnson\".",
        "Number: angka desimal maupun bulat, contoh let weight = 70.00.",
        "Bigint: angka yang sangat besar, contoh let x = BigInt(\"123456789012345678901234567890\").",
        "Boolean: hanya bernilai true atau false, contoh hasil dari (x == y).",
        "Array: daftar data berurutan, contoh const cars = [\"Saab\", \"Volvo\", \"BMW\"].",
        "Undefined: nilai variabel yang belum diisi, atau sengaja diisi undefined.",
        "Object: data key-value, contoh const person = { firstName: \"John\", lastName: \"Doe\", age: 50 }.",
        "String juga bisa ditulis dengan tanda kutip tunggal, kutip ganda, atau backtick (template literal) yang mendukung interpolasi variabel."
      ],
      "language": "javascript",
      "codeTitle": "Tipe Data dan String",
      "code": "\nlet text1 = 'John Doe'\nlet text2 = \"John Doe\"\n\nlet nama = \"John\"\nlet hallo = `He's often called ${nama}`\n\nlet escapeText = \"We are the so-called \\\"Vikings\\\". \"",
      "id": "nodejs-12-tipe-data"
    },
    {
      "title": "String Method",
      "description": "String di JavaScript memiliki banyak method bawaan untuk memanipulasi teks tanpa perlu menulis logika manual.",
      "points": [
        "length: mendapatkan panjang string.",
        "charAt(index): mengambil satu karakter pada posisi tertentu.",
        "slice(start, end) dan substring(start, end): mengambil sebagian string.",
        "toUpperCase() dan toLowerCase(): mengubah huruf menjadi kapital atau kecil semua.",
        "concat(): menggabungkan dua string atau lebih.",
        "trim(): menghapus spasi di awal dan akhir string.",
        "split(separator): memecah string menjadi array berdasarkan pemisah tertentu.",
        "replace(cari, ganti): mengganti bagian string dengan teks lain."
      ],
      "language": "javascript",
      "codeTitle": "String Method",
      "code": "\nlet text = \" hello world! \"\n\nlet length = text.length\nlet text1 = text.charAt(0)\nlet text2 = text.slice(2, 3)\nlet text3 = text.substring(2, 3)\nlet text4 = text.toUpperCase()\nlet text5 = text.toLowerCase()\nlet text6 = text1.concat(\" \", text2)\nlet text7 = text.trim()\nlet text8 = text.split(\" \")\nlet text9 = text.replace(\"world\", \"dunia\")",
      "id": "nodejs-13-string-method"
    },
    {
      "title": "Date (Tanggal dan Waktu)",
      "description": "Objek Date di JavaScript dipakai untuk bekerja dengan tanggal dan waktu, mulai dari mengambil tanggal hari ini sampai mengekstrak jam, menit, dan detik.",
      "points": [
        "new Date(): membuat objek tanggal baru berisi waktu saat ini.",
        "getFullYear(): menghasilkan tahun dalam 4 digit.",
        "getMonth(): menghasilkan bulan dalam rentang 0-11 (0 = Januari).",
        "getDate(): menghasilkan tanggal dalam rentang 1-31.",
        "getDay(): menghasilkan hari dalam rentang 0-6 (0 = Minggu).",
        "getHours(), getMinutes(), getSeconds(): menghasilkan jam (0-23), menit (0-59), dan detik (0-59)."
      ],
      "language": "javascript",
      "codeTitle": "Date",
      "code": "\nconst date = new Date()\n\ndate.getFullYear()\ndate.getMonth()\ndate.getDate()\ndate.getDay()\ndate.getHours()\ndate.getMinutes()\ndate.getSeconds()",
      "id": "nodejs-14-date"
    },
    {
      "title": "Kondisional: if, if-else, switch",
      "description": "Kondisional dipakai untuk menjalankan blok kode tertentu berdasarkan sebuah kondisi.",
      "points": [
        "if: mengeksekusi kode dalam block jika kondisinya terpenuhi.",
        "if-else: mengeksekusi kode dalam block if jika kondisi terpenuhi, dan block else jika kondisi tidak terpenuhi.",
        "if-else if-else: dipakai untuk mengecek beberapa kondisi secara berurutan.",
        "switch-case: alternatif dari if-else berantai, cocok untuk mengecek satu variabel terhadap banyak kemungkinan nilai, jangan lupa menambahkan break di setiap case."
      ],
      "language": "javascript",
      "codeTitle": "Kondisional",
      "code": "\nlet hour = 18\nlet greeting\n\nif (hour < 18) {\n  greeting = \"Good day\"\n} else {\n  greeting = \"Good evening\"\n}\n\nlet day\nswitch (new Date().getDay()) {\n  case 0:\n    day = \"Sunday\"\n    break\n  case 1:\n    day = \"Monday\"\n    break\n  default:\n    day = \"Other day\"\n}",
      "id": "nodejs-15-kondisional"
    },
    {
      "title": "Looping: for, while, do-while",
      "description": "Looping (perulangan) dipakai untuk menjalankan kode yang sama berulang kali tanpa harus menulis ulang kodenya.",
      "points": [
        "for: perulangan dengan format for (inisialisasi; kondisi; increment), cocok jika jumlah perulangan sudah diketahui.",
        "while: perulangan yang mengecek kondisi terlebih dahulu sebelum menjalankan blok kode, cocok jika jumlah perulangan belum pasti.",
        "do-while: perulangan yang menjalankan blok kode terlebih dahulu minimal satu kali, baru kemudian mengecek kondisinya.",
        "Looping sering dikombinasikan dengan kondisional, misalnya untuk mengecek bilangan ganjil/genap atau kelipatan tertentu di setiap perulangan."
      ],
      "language": "javascript",
      "codeTitle": "Looping",
      "code": "\nlet text = \"\"\nfor (let i = 0; i < 5; i++) {\n  text += i + \" \"\n}\n\ntext = \"\"\nlet i = 0\nwhile (i < 5) {\n  text += i + \" \"\n  i++\n}\n\ntext = \"\"\ni = 0\ndo {\n  text += i + \" \"\n  i++\n} while (i < 5)",
      "id": "nodejs-16-looping"
    },
    {
      "title": "Array dan Array Method",
      "description": "Array menyimpan daftar data berurutan dan bisa diakses berdasarkan index (dimulai dari 0). Array memiliki banyak method bawaan untuk menambah, menghapus, atau mengolah datanya.",
      "points": [
        "Array dapat dibuat dengan literal [ ], atau dengan menambahkan elemen satu per satu lewat index.",
        "Elemen array diakses dan diubah menggunakan index, contoh cars[0].",
        "length: mendapatkan jumlah elemen dalam array.",
        "toString() dan join(pemisah): mengubah array menjadi string.",
        "push() dan pop(): menambah atau menghapus elemen di akhir array.",
        "unshift() dan shift(): menambah atau menghapus elemen di awal array.",
        "concat(): menggabungkan dua array atau lebih.",
        "slice(start, end): mengambil sebagian array tanpa mengubah array asli.",
        "splice(index, jumlahHapus, ...tambahan): menghapus dan/atau menyisipkan elemen pada posisi tertentu."
      ],
      "language": "javascript",
      "codeTitle": "Array dan Array Method",
      "code": "\nconst fruits = [\"Banana\", \"Orange\", \"Apple\", \"Mango\"]\n\nlet size = fruits.length\nlet fruits1 = fruits.toString()\nlet fruits2 = fruits.join(\" - \")\nlet fruits3 = fruits.pop()\nfruits.push(\"Kiwi\")\nlet fruits5 = fruits.shift()\nfruits.unshift(\"Lemon\")\nfruits.slice(1, 2)\nfruits.splice(2, 1, \"Cherry\", \"Strawberry\")",
      "id": "nodejs-17-array"
    },
    {
      "title": "Function, Kondisional, dan Looping dalam Praktik",
      "description": "Konsep function, array, object, kondisional, dan looping menjadi pondasi hampir semua aplikasi JavaScript, termasuk React component dan proses data dari API.",
      "points": [
        "Function membungkus instruksi agar bisa dipakai ulang dan dapat menerima parameter, dipanggil dengan namaFunction(argumen).",
        "Function dapat mengembalikan nilai menggunakan kata kunci return.",
        "Array, object, kondisional, dan looping sering dipakai bersamaan, misalnya melakukan looping pada array of object lalu memfilternya dengan kondisional.",
        "Pola ini banyak dipakai saat memproses data dari API sebelum ditampilkan ke UI."
      ],
      "language": "javascript",
      "codeTitle": "JS Dasar: Function + Array + Object + Looping",
      "code": "\nconst topics = [\n  { title: 'HTML', done: true },\n  { title: 'React', done: false },\n]\n\nfunction countCompleted(items) {\n  let total = 0\n\n  for (const item of items) {\n    if (item.done) {\n      total += 1\n    }\n  }\n\n  return total\n}\n\nconsole.log(countCompleted(topics))",
      "id": "nodejs-18-function-praktik"
    },
    {
      "title": "Object: Properti, Method, dan Constructor",
      "description": "Object menyimpan data dalam bentuk key-value dan cocok untuk merepresentasikan entitas seperti user, produk, atau materi. Object juga bisa memiliki method (fungsi di dalam object) dan dibuat lewat constructor.",
      "points": [
        "Object literal dibuat langsung dengan kurung kurawal, contoh const person = { firstName: \"John\", age: 50 }.",
        "Mengakses properti object bisa dengan dot notation (person.firstName), bracket notation (person[\"firstName\"]), atau lewat variabel (person[x]).",
        "Object method adalah fungsi yang disimpan sebagai properti object, biasanya menggunakan kata kunci this untuk mengakses properti lain dalam object yang sama.",
        "Object constructor adalah fungsi yang dipakai sebagai cetakan (blueprint) untuk membuat banyak object dengan struktur yang sama, dipanggil dengan kata kunci new.",
        "Properti baru dapat ditambahkan ke sebuah object kapan saja, misalnya okti.nationality = \"Indonesia\"."
      ],
      "language": "javascript",
      "codeTitle": "Object",
      "code": "\nconst person = {\n  firstName: \"John\",\n  lastName: \"Doe\",\n  id: 5566,\n  fullName: function () {\n    return this.firstName + \" \" + this.lastName\n  }\n}\n\nconst name = person.fullName()\n\nfunction Person(first, last, age) {\n  this.firstName = first\n  this.lastName = last\n  this.age = age\n}\n\nconst okti = new Person(\"Johnny\", \"Rally\", 22)\nokti.nationality = \"Indonesia\"",
      "id": "nodejs-19-object"
    }
  ]
}

const NodeJS = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default NodeJS