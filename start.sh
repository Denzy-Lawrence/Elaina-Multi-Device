#!/bin/bash

# code untuk install Semua dependencies dan langsung  npm install dan npm start di gabung, tinggal ketik [ chmod +x start.sh ] lalu ketik [ ./start.sh ]

echo "🔍 Detecting environment..."

# Detect environment
if [[ -d "/data/data/com.termux" ]]; then
    ENV="termux"
elif [[ -n "$PTERODACTYL_CONTAINER_ID" ]]; then
    ENV="pterodactyl"
else
    ENV="vps"
fi

echo "📦 Environment: $ENV"

# CHECK & INSTALL FFMPEG
echo "🎬 Checking ffmpeg..."

if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️ ffmpeg not found, installing..."

    if [[ "$ENV" == "termux" ]]; then
        pkg update -y
        pkg install ffmpeg -y
    elif [[ "$ENV" == "vps" || "$ENV" == "pterodactyl" ]]; then
        apt update -y
        apt install ffmpeg -y
    fi

    # cek lagi
    if ! command -v ffmpeg &> /dev/null; then
        echo "❌ Gagal install ffmpeg"
        exit 1
    else
        echo "✅ ffmpeg berhasil diinstall"
    fi
else
    echo "✅ ffmpeg sudah terinstall"
fi

# TERMUX ONLY: REMOVE PROBLEMATIC MODULE
if [[ "$ENV" == "termux" ]]; then
    echo "⚠️ Cleaning unsupported modules for Termux..."

    BAD_MODULES=("wa-sticker-formatter" "sharp" "puppeteer" "canvas" "playwright")

    for mod in "${BAD_MODULES[@]}"; do
        if grep -q "\"$mod\"" package.json 2>/dev/null; then
            echo "❌ Removing $mod from project..."
            npm uninstall $mod
        fi

        if [ -d "node_modules/$mod" ]; then
            echo "🗑️ Deleting folder node_modules/$mod"
            rm -rf "node_modules/$mod"
        fi
    done
fi

# INSTALL DEPENDENCIES
echo "🔎 Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "📦 node_modules tidak ditemukan → install semua"
else
    echo "📦 node_modules ada → cek & install yang kurang"
fi

npm install --omit=optional

# HANDLE ERROR INSTALL
if [ $? -ne 0 ]; then
    echo "❌ npm install gagal!"

    if [[ "$ENV" == "termux" ]]; then
        echo "🧹 Retry dengan cleanup tambahan..."

        rm -rf node_modules/sharp
        npm uninstall wa-sticker-formatter 2>/dev/null

        npm install --omit=optional

        if [ $? -ne 0 ]; then
            echo "💀 Install tetap gagal di Termux"
            exit 1
        fi
    else
        echo "💀 Install gagal di VPS/Pterodactyl"
        exit 1
    fi
fi

# RUN BOT
echo "🚀 Menjalankan Elaina Multi Device..."
node index.js
