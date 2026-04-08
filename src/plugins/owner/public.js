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

async function handler(m, plug) {
  const {
    sock,
    isCreator,
    config,
    reaction
  } = plug

  if (!isCreator) return m.reply(config.message.owner)
  reaction(m.chat, '🕐', m.key)
  try {
    sock.public = true
    if (global.db && global.db.settings) {
      global.db.settings.isPublic = true
    }
    m.reply("Berhasil mengganti ke mode *Public* (Semua orang bisa akses)")
    
  } catch (e) {
    console.error(e)
    m.reply("⚠️ Terjadi kesalahan saat mengubah mode.")
  }
}

handler.command = ["public"]

module.exports = handler