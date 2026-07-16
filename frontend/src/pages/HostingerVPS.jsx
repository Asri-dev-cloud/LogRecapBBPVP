import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "I",
  "slug": "hostinger-vps",
  "title": "Hostinger VPS",
  "shortTitle": "VPS",
  "route": "/hostinger-vps",
  "icon": "Server",
  "summary": "Order VPS, SSH, Nginx, deploy app, domain, dan SSL.",
  "accent": "from-pink-400 via-yellow-300 to-lime-300"
}

const material = {
  "title": "Hostinger VPS",
  "subtitle": "VPS memberi server pribadi untuk menjalankan aplikasi, database, reverse proxy, dan domain sendiri.",
  "overview": [
    "VPS adalah virtual private server: resource server virtual yang bisa dikonfigurasi seperti komputer Linux jarak jauh.",
    "Untuk deploy app React, biasanya hasil build dilayani oleh Nginx atau app Node.js di belakang reverse proxy.",
    "Alur umum: order VPS, pilih OS, SSH, install stack, deploy, pasang domain, lalu aktifkan SSL."
  ],
  "sections": [
    {
      "title": "Apa Itu VPS",
      "description": "VPS berada di tengah antara shared hosting dan dedicated server. Anda mendapat kontrol root, tetapi tetap berada di infrastruktur virtual.",
      "points": [
        "Kelebihan VPS: kontrol penuh, bisa install package, bisa menjalankan Node.js, Nginx, MySQL, dan service lain.",
        "Tanggung jawab VPS: update security, firewall, backup, monitoring, dan konfigurasi server.",
        "Untuk aplikasi frontend React, VPS dapat menyajikan folder dist sebagai static site.",
        "Untuk backend Node.js, gunakan process manager seperti PM2 agar aplikasi tetap hidup setelah terminal ditutup."
      ],
      "id": "hostinger-vps-1-apa-itu-vps"
    },
    {
      "title": "Order dan Setup OS",
      "description": "Langkah awal adalah memilih paket, lokasi server, OS, dan kredensial root atau SSH key.",
      "points": [
        "Pilih paket sesuai kebutuhan CPU, RAM, storage, dan traffic aplikasi.",
        "Pilih lokasi server paling dekat dengan mayoritas user.",
        "Pilih OS umum seperti Ubuntu LTS karena dokumentasi dan package-nya luas.",
        "Simpan IP server, username, password sementara, dan konfigurasi SSH key dengan aman.",
        "Setelah VPS aktif, lakukan update package sebelum install stack aplikasi."
      ],
      "id": "hostinger-vps-2-order-dan-setup-os"
    },
    {
      "title": "Akses SSH Pertama dan Hardening Dasar",
      "description": "SSH dipakai untuk mengelola server dari terminal. Setelah login pertama, lakukan beberapa konfigurasi dasar keamanan.",
      "points": [
        "Login memakai ssh root@IP_SERVER atau Putty jika dari Windows.",
        "Jalankan apt update dan apt upgrade agar package server terbaru.",
        "Buat user non-root, beri akses sudo, lalu gunakan user tersebut untuk pekerjaan harian.",
        "Aktifkan firewall UFW dan izinkan OpenSSH, HTTP, dan HTTPS.",
        "Pertimbangkan SSH key dan nonaktifkan password login setelah key benar-benar berjalan."
      ],
      "language": "bash",
      "codeTitle": "SSH Pertama",
      "code": "\nssh root@203.0.113.10\n\napt update\napt upgrade -y\nadduser deploy\nusermod -aG sudo deploy\n\nufw allow OpenSSH\nufw allow 'Nginx Full'\nufw enable",
      "id": "hostinger-vps-3-akses-ssh-pertama-dan-hardening-dasar"
    },
    {
      "title": "Install Node.js, Nginx, dan PM2",
      "description": "Node.js menjalankan backend atau tooling build. Nginx melayani static file dan reverse proxy. PM2 menjaga proses Node tetap berjalan.",
      "points": [
        "Install Node.js versi LTS yang sesuai kebutuhan aplikasi.",
        "Install Nginx untuk melayani domain dan static file.",
        "Install PM2 global jika menjalankan backend Node.js.",
        "Pastikan port yang dipakai app Node tidak langsung dibuka publik jika Nginx menjadi reverse proxy.",
        "Cek status service dengan systemctl status nginx dan pm2 status."
      ],
      "language": "bash",
      "codeTitle": "Install Stack",
      "code": "\nsudo apt update\nsudo apt install -y nginx\n\n# contoh install Node via NodeSource dapat disesuaikan versi LTS\nnode -v\nnpm -v\n\nsudo npm install -g pm2",
      "id": "hostinger-vps-4-install-node-js-nginx-dan-pm2"
    },
    {
      "title": "Deploy App React",
      "description": "Aplikasi React dibuild menjadi file static di folder dist. Folder ini dapat disalin ke VPS dan dilayani Nginx.",
      "points": [
        "Di lokal, jalankan npm run build untuk membuat folder dist.",
        "Upload dist ke server memakai scp, rsync, Git, atau pipeline CI/CD.",
        "Letakkan hasil build di /var/www/nama-domain atau folder deploy yang jelas.",
        "Buat server block Nginx yang mengarah ke folder dist.",
        "Untuk React Router, tambahkan fallback try_files ke /index.html agar route client-side tidak 404."
      ],
      "language": "nginx",
      "codeTitle": "Nginx Static React",
      "code": "\nserver {\n  listen 80;\n  server_name example.com www.example.com;\n\n  root /var/www/logbook/dist;\n  index index.html;\n\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}",
      "id": "hostinger-vps-5-deploy-app-react"
    },
    {
      "title": "Domain dan SSL",
      "description": "Domain mengarahkan user ke IP VPS. SSL membuat koneksi HTTPS aman dan dipercaya browser.",
      "points": [
        "Tambahkan A record domain ke IP VPS. Untuk www, tambahkan CNAME ke domain utama atau A record ke IP yang sama.",
        "Tunggu propagasi DNS. Cek dengan ping, nslookup, atau DNS checker.",
        "Setelah domain mengarah ke VPS, install Certbot untuk membuat SSL Let's Encrypt.",
        "Pastikan Nginx server_name sudah benar sebelum menjalankan Certbot.",
        "Aktifkan auto-renewal dan cek dengan certbot renew --dry-run."
      ],
      "language": "bash",
      "codeTitle": "SSL Certbot",
      "code": "\nsudo apt install -y certbot python3-certbot-nginx\nsudo certbot --nginx -d example.com -d www.example.com\nsudo certbot renew --dry-run",
      "id": "hostinger-vps-6-domain-dan-ssl"
    }
  ]
}

const HostingerVPS = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default HostingerVPS
