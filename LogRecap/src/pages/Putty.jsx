import React from 'react'
import MaterialPage from './MaterialPage'

const topic = {
  "code": "J",
  "slug": "putty",
  "title": "Putty",
  "shortTitle": "Putty",
  "route": "/putty",
  "icon": "KeyRound",
  "summary": "SSH ke VPS dari Windows dan command dasar server.",
  "accent": "from-lime-300 via-cyan-300 to-pink-300"
}

const material = {
  "title": "Putty",
  "subtitle": "Putty adalah aplikasi SSH client populer di Windows untuk mengakses VPS melalui terminal.",
  "overview": [
    "SSH memungkinkan koneksi aman ke server Linux dari jarak jauh.",
    "Putty cocok untuk user Windows yang ingin mengakses VPS tanpa terminal bawaan atau saat memakai file key .ppk.",
    "Setelah connect, perintah yang dijalankan adalah command Linux di server, bukan command Windows lokal."
  ],
  "sections": [
    {
      "title": "Apa Itu Putty dan Kegunaannya",
      "description": "Putty membuka sesi terminal ke VPS. Dari sana, Anda dapat install package, edit file konfigurasi, restart service, dan deploy aplikasi.",
      "points": [
        "Putty mendukung protokol SSH, Telnet, dan serial, tetapi untuk VPS gunakan SSH.",
        "Port SSH default adalah 22, kecuali server dikonfigurasi berbeda.",
        "Host Name diisi IP server atau domain server.",
        "Session dapat disimpan agar koneksi berikutnya lebih cepat.",
        "Puttygen dipakai untuk membuat atau mengubah private key ke format .ppk."
      ],
      "id": "putty-1-apa-itu-putty-dan-kegunaannya"
    },
    {
      "title": "Install dan Konfigurasi Putty",
      "description": "Instalasi Putty sederhana. Yang penting adalah mengisi host, port, user, dan key bila login memakai SSH key.",
      "points": [
        "Install Putty dari sumber resmi atau package manager terpercaya.",
        "Buka Putty, isi Host Name dengan IP VPS, Port 22, Connection type SSH.",
        "Jika memakai username tertentu, Host Name bisa ditulis deploy@IP_SERVER.",
        "Untuk SSH key, masuk ke Connection > SSH > Auth > Credentials lalu pilih private key .ppk.",
        "Simpan session dengan nama seperti logbook-vps agar mudah dipakai ulang.",
        "Saat pertama connect, terima host key hanya jika fingerprint sesuai informasi server."
      ],
      "id": "putty-2-install-dan-konfigurasi-putty"
    },
    {
      "title": "Command Dasar Setelah Connect",
      "description": "Setelah berhasil login, gunakan command Linux untuk navigasi folder, mengelola file, dan install package.",
      "points": [
        "pwd melihat lokasi folder saat ini.",
        "ls -la melihat daftar file termasuk hidden file.",
        "cd nama-folder masuk ke folder, cd .. naik satu folder, cd ~ kembali ke home.",
        "mkdir membuat folder, touch membuat file kosong, nano mengedit file dari terminal.",
        "cp, mv, dan rm mengelola file. Hati-hati dengan rm karena menghapus permanen.",
        "apt update dan apt install digunakan di distro Ubuntu/Debian untuk mengelola package.",
        "systemctl status/restart nginx dipakai untuk mengecek dan restart service."
      ],
      "image": true,
      "imageLabel": "SISIPKAN GAMBAR: terminal Putty setelah login ke VPS.",
      "language": "bash",
      "codeTitle": "Command Linux Dasar",
      "code": "\npwd\nls -la\ncd /var/www\nmkdir logbook\nnano /etc/nginx/sites-available/logbook\n\nsudo apt update\nsudo apt install -y nginx\nsudo systemctl restart nginx",
      "id": "putty-3-command-dasar-setelah-connect"
    },
    {
      "title": "Upload File dan Deploy dari Windows",
      "description": "Putty fokus pada terminal. Untuk upload file, gunakan pscp, psftp, WinSCP, Git, atau pipeline deployment.",
      "points": [
        "pscp adalah command line tool dari keluarga Putty untuk menyalin file lewat SSH.",
        "WinSCP memberi antarmuka visual untuk upload dan download file.",
        "Git deploy cocok jika server bisa melakukan git pull dari repository.",
        "Untuk React static build, upload folder dist ke lokasi web server seperti /var/www/logbook.",
        "Pastikan permission folder mengizinkan Nginx membaca file."
      ],
      "language": "bash",
      "codeTitle": "Upload dengan pscp",
      "code": "\npscp -r dist deploy@203.0.113.10:/var/www/logbook\n\n# di server\nsudo chown -R www-data:www-data /var/www/logbook",
      "id": "putty-4-upload-file-dan-deploy-dari-windows"
    }
  ]
}

const Putty = () => {
  return <MaterialPage topic={topic} material={material} />
}

export default Putty
