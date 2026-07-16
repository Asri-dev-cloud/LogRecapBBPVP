import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "L",
  "slug": "backend-express",
  "title": "Backend Node.js & Express",
  "shortTitle": "Backend",
  "route": "/backend-express",
  "icon": "Server",
  "summary": "Membuat server API dengan Express, koneksi database DB.mjs, test_api.rest, dan setup WebStorm.",
  "accent": "from-purple-550 via-indigo-500 to-cyan-500"
}

const material = {
  "title": "Backend Node.js & Express",
  "subtitle": "Membangun API server yang andal dengan Express.js, mengelola koneksi database MySQL menggunakan ES Modules (.mjs), menguji endpoint secara interaktif dengan REST Client (.rest), dan memanfaatkan fitur WebStorm untuk mempercepat alur kerja development.",
  "overview": [
    "Express.js mempermudah pembuatan server routing, HTTP request handling, dan integrasi middleware.",
    "Menggunakan ES Modules (.mjs) memungkinkan sintaks import/export standar JavaScript modern langsung di Node.js.",
    "WebStorm menyediakan built-in REST Client dan fitur debugging terintegrasi untuk mempercepat testing server backend."
  ],
  "sections": [
    {
      "title": "1. Pengenalan Backend dengan Node.js & Express",
      "description": "Backend bertugas menerima request dari client (frontend), memproses logika bisnis, berinteraksi dengan database, dan mengembalikan response dalam format JSON. Express.js adalah framework minimalis terpopuler untuk Node.js untuk keperluan ini.",
      "points": [
        "Client-Server Architecture: Frontend bertindak sebagai client yang mengirim HTTP Request (GET, POST, PUT, DELETE) ke Backend Server.",
        "Express.js: Menyediakan abstraksi tipis di atas modul HTTP bawaan Node.js untuk memudahkan penulisan endpoint.",
        "REST API: Pendekatan standar komunikasi data menggunakan URL (Endpoint) dan status code HTTP (200 OK, 201 Created, 400 Bad Request, 500 Server Error).",
        "Middleware: Fungsi perantara yang memiliki akses ke object request (req), response (res), dan fungsi next(). Contoh: JSON parser, CORS, logger."
      ],
      "id": "backend-1-pengenalan"
    },
    {
      "title": "2. Membuat Koneksi Database (DB.mjs)",
      "description": "Dengan menggunakan ekstensi `.mjs`, kita memberi tahu Node.js untuk memperlakukan file tersebut sebagai ES Module sehingga kita bisa menggunakan sintaks `import` dan `export`. Di sini kita membuat file `DB.mjs` yang bertugas membuka pool connection ke MySQL database menggunakan library `mysql2/promise` secara asynchronous.",
      "points": [
        "Gunakan library mysql2/promise agar mendukung query berbasis Promise (async/await).",
        "Buat connection pool (mysql.createPool) agar koneksi ke database dapat digunakan kembali secara efisien tanpa perlu membuka/menutup koneksi setiap saat.",
        "Simpan kredensial database (host, user, password, db name) di file konfigurasi lingkungan (.env) demi keamanan.",
        "Gunakan export default agar pool connection ini bisa langsung di-import di file index.mjs atau file routing lainnya."
      ],
      "language": "javascript",
      "codeTitle": "DB.mjs",
      "code": "// DB.mjs\nimport mysql from 'mysql2/promise';\nimport dotenv from 'dotenv';\n\n// Load environment variables dari file .env\ndotenv.config();\n\n// Membuat pool koneksi ke MySQL database\nconst pool = mysql.createPool({\n  host: process.env.DB_HOST || 'localhost',\n  user: process.env.DB_USER || 'root',\n  password: process.env.DB_PASSWORD || '',\n  database: process.env.DB_NAME || 'logrecap_db',\n  port: parseInt(process.env.DB_PORT) || 3306,\n  waitForConnections: true,\n  connectionLimit: 10,     // Batas maksimal koneksi simulan\n  queueLimit: 0\n});\n\nexport default pool;",
      "id": "backend-2-db-mjs"
    },
    {
      "title": "3. Membuat Server Utama (index.mjs)",
      "description": "File `index.mjs` merupakan entry point (titik masuk) utama dari server backend kita. Di file ini, kita menginisialisasi Express, mendaftarkan middleware penting (seperti CORS dan JSON parser), mengimpor pool database `DB.mjs`, mendefinisikan route API, dan mendengarkan request pada port tertentu.",
      "points": [
        "Import express, cors, dan modul database (DB.mjs).",
        "Inisialisasi aplikasi Express: const app = express();",
        "Gunakan middleware cors() agar frontend dari domain/port lain bisa mengakses API ini.",
        "Gunakan express.json() agar server dapat membaca data bertipe JSON yang dikirim oleh client di dalam request body.",
        "Buat routing (GET/POST) untuk melakukan operasi database menggunakan async/await dan blok try-catch.",
        "Jalankan server dengan app.listen(PORT)."
      ],
      "language": "javascript",
      "codeTitle": "index.mjs",
      "code": "// index.mjs\nimport express from 'express';\nimport cors from 'cors';\nimport db from './DB.mjs';\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\n// Middleware\napp.use(cors());\napp.use(express.json()); // Parsing JSON request body\n\n// Route GET: Mengambil data logs\napp.get('/api/logs', async (req, res) => {\n  try {\n    const [rows] = await db.query('SELECT * FROM activity_logs ORDER BY created_at DESC');\n    res.status(200).json({\n      success: true,\n      data: rows\n    });\n  } catch (error) {\n    console.error('Database error:', error);\n    res.status(500).json({ success: false, message: 'Server error fetching logs' });\n  }\n});\n\n// Route POST: Menambah data log baru\napp.post('/api/logs', async (req, res) => {\n  const { userId, username, action, details } = req.body;\n  \n  if (!action || !username) {\n    return res.status(400).json({ success: false, message: 'Username and action are required' });\n  }\n\n  try {\n    const [result] = await db.query(\n      'INSERT INTO activity_logs (user_id, username, action, details) VALUES (?, ?, ?, ?)',\n      [userId || null, username, action, details || '']\n    );\n    \n    res.status(201).json({\n      success: true,\n      message: 'Log successfully added',\n      insertId: result.insertId\n    });\n  } catch (error) {\n    console.error('Database error:', error);\n    res.status(500).json({ success: false, message: 'Server error saving log' });\n  }\n});\n\n// Menjalankan server backend\napp.listen(PORT, () => {\n  console.log(`Server is running on http://localhost:${PORT}`);\n});",
      "id": "backend-3-index-mjs"
    },
    {
      "title": "4. Pengujian API (test_api.rest)",
      "description": "Untuk menguji endpoint API yang telah kita buat di `index.mjs`, kita tidak harus menggunakan aplikasi eksternal yang berat seperti Postman. Kita bisa menggunakan file berekstensi `.rest` atau `.http` (REST Client) langsung dari dalam text editor kita. Pendekatan ini berbasis teks murni (plain text) sehingga sangat mudah dibaca, dikelola, dan disimpan ke dalam sistem kontrol versi (Git).",
      "points": [
        "File REST client menggunakan format standar HTTP request.",
        "Gunakan pembatas triple hash (###) untuk memisahkan satu request dengan request lainnya dalam satu file.",
        "Kita bisa menentukan HTTP method, URL endpoint, request headers (seperti Content-Type), dan request body JSON.",
        "Menghemat memori RAM karena testing terintegrasi langsung di editor tanpa membuka aplikasi pihak ketiga."
      ],
      "language": "http",
      "codeTitle": "test_api.rest",
      "code": "### Variabel Konfigurasi Global\n@baseUrl = http://localhost:5000/api\n\n### Menguji Endpoint GET - Ambil Semua Log Aktivitas\nGET {{baseUrl}}/logs\nAccept: application/json\n\n###\n\n### Menguji Endpoint POST - Tambah Log Aktivitas Baru\nPOST {{baseUrl}}/logs\nContent-Type: application/json\n\n{\n  \"userId\": 1,\n  \"username\": \"harti\",\n  \"action\": \"LOGIN_SYSTEM\",\n  \"details\": \"User logged in from WebStorm IDE REST Client\"\n}\n\n###\n\n### Menguji Endpoint POST dengan Data yang Salah (Validasi Error)\nPOST {{baseUrl}}/logs\nContent-Type: application/json\n\n{\n  \"userId\": null,\n  \"username\": \"\",\n  \"action\": \"\",\n  \"details\": \"Ini harus menghasilkan error 400 Bad Request\"\n}",
      "id": "backend-4-test-api-rest"
    },
    {
      "title": "5. Integrasi & Alur Kerja WebStorm",
      "description": "WebStorm (buatan JetBrains) adalah salah satu IDE terbaik untuk pengembangan JavaScript dan Node.js karena memiliki integrasi perkakas yang sangat lengkap di dalamnya.",
      "points": [
        "Built-in REST Client: Saat Anda membuka file test_api.rest di WebStorm, Anda akan melihat tombol play hijau kecil di samping setiap request. Cukup klik tombol tersebut untuk mengeksekusi request dan melihat output HTTP response di panel bawah secara realtime.",
        "Node.js Run Configuration: Untuk menjalankan server (index.mjs), klik kanan file index.mjs lalu pilih 'Run index.mjs'. WebStorm akan secara otomatis membuat profil running Node.js untuk Anda.",
        "Support ES Modules: Jika WebStorm memunculkan warning terkait sintaks 'import'/'export', pastikan Node.js coding assistance aktif di Settings > Languages & Frameworks > Node.js.",
        "Database Client: WebStorm versi Professional memiliki Database tool window bawaan di sebelah kanan, sehingga Anda bisa query ke MySQL database langsung dari satu jendela IDE yang sama."
      ],
      "language": "bash",
      "codeTitle": "Cara Menjalankan Server lewat Terminal WebStorm",
      "code": "# Alternatif jika tidak memakai Run Configuration tombol GUI WebStorm:\nnode index.mjs\n\n# Atau gunakan mode watch otomatis (Node 18+) agar merestart jika ada perubahan file:\nnode --watch index.mjs",
      "id": "backend-5-webstorm"
    }
  ]
}

const BackendExpress = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default BackendExpress
