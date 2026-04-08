/*────────────────────────────────────
 ! GitHub  : https://github.com/flying-panties
 ───────────────────────────────
 ! Telegram : https://t.me/pantatbegetar
 ───────────────────────────────
 ! Channel : https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04
 ───────────────────────────────
 ! Group : https://chat.whatsapp.com/Lv5UCEtBDL9BUyoh9VA2kl?mode=gi_t
 ───────────────────────────────
 ! Api : https://api.nexray.web.id
  ───────────────────────────────
{ JANGAN LUPA HIDUPIN STAR REPOSITORY NYA YA 🌟 🤩 }
────────────────────────────────────*/
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { writeExifImg } = require('../../lib/exif')
const { tmpdir } = require('os')

async function handler(m, plug) {
  const {
    sock, text, prefix, command, pushname, reaction, config
  } = plug
  if (!text) return m.reply(`_⚠️ Format:_\n\n_Contoh:_ *${prefix + command} hallo*`)
  
  await reaction(m.chat, '🕐', m)
  try {
    const url = `${config.RestApi.api}/api/maker/brat?apikey=${encodeURIComponent(config.RestApi.mikochan)}&text=${encodeURIComponent(text)}`
    
    const res = await axios.get(url, { responseType: 'arraybuffer', headers: { 'User-Agent': 'Mozilla/5.0' } })
    const buffer = Buffer.from(res.data)
    if (!buffer || buffer.length < 500) return m.reply('❌ Gagal ambil gambar dari API.')
    const tmpFile = path.join(tmpdir(), `brat_${Date.now()}.jpg`)
        fs.writeFileSync(tmpFile, buffer)
        const outPath = await writeExifImg(fs.readFileSync(tmpFile), {
            packname: config.settings.packname,
            author: config.ownername || pushname
        })
        const sticker = fs.readFileSync(outPath)
        await sock.sendMessage(m.chat, { sticker }, { quoted: m })
        fs.unlinkSync(tmpFile)
        fs.unlinkSync(outPath)
    
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error saat membuat sticker brat.')
    }
}

handler.command = ["brat"]

module.exports = handler
