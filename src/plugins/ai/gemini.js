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
    return m.reply(`_⚠️ Mau tanya apa sama Gemini?_\n\n_Contoh:_ *${prefix + command} halo*`)
  }
  reaction(m.chat, '🕐', m.key)
  try {
    const url = `https://api.nexray.web.id/ai/gemini?text=${encodeURIComponent(text)}`
    const response = await axios.get(url)
    const res = response.data
    
    if (res.status !== true || !res.result) {
      return m.reply('❌ Maaf, layanan Gemini AI sedang tidak tersedia.')
    }
    await sock.sendMessage(m.chat, {
      text: res.result
    }, { quoted: m })
    
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Terjadi kesalahan saat menghubungi server Gemini AI.')
  }
}

handler.command = ["gemini", "googleai"]

module.exports = handler