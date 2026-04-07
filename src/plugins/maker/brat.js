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
const { Sticker } = require('wa-sticker-formatter')

async function handler(m, plug) {
    const {
        sock,      
        text,
        prefix,
        command,
        pushname,
        reaction, 
        config
    } = plug

    if (!text) {
        return m.reply(`_⚠️ Format:_\n\n_Contoh:_ *${prefix + command} hallo*`)
    }

    await reaction(m.chat, '🕐', m)

    try {
        const url = `${config.RestApi.api}/api/maker/brat?apikey=${encodeURIComponent(config.RestApi.mikochan)}&text=${encodeURIComponent(text)}`

        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        })

        const buffer = Buffer.from(res.data)

        if (!buffer || buffer.length < 500) {
            return m.reply('❌ Gagal ambil gambar dari API.')
        }

        const sticker = new Sticker(buffer, {
            pack: config.settings.packname,
            author: config.ownername || pushname,
            type: 'full',
            quality: 100
        })

        const out = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: out
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error saat membuat sticker brat.')
    }
}

handler.command = ["brat"]

module.exports = handler