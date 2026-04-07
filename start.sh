#!/bin/bash

# code untuk install Semua dependencies dan langsung  npm install dan npm start di gabung, tinggal ketik [ chmod +x start.sh ] lalu ketik [ ./start.sh ]

echo "🛠️  Memeriksa dependencies..."

# Cek apakah node_modules ada, kalo gak ada install semua
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules belum ada, otw  menginstall semua package..."
    npm install
else
    echo "✅ Semua dependencies sudah terinstall."
fi

# Jalankan bot
echo "🚀 Menjalankan Elaina Multi Device..."
node index.js