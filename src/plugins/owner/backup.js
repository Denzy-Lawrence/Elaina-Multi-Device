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
const fs = require('fs')
const { execSync } = require('child_process')

async function handler(m, plug) {
  const {
    sock,
    isCreator,
    reaction
  } = plug

  if (!isCreator) return m.reply('❌ Fitur ini khusus Owner bot.')

  reaction(m.chat, '🕐', m.key)

  try {
    const tmpDir = "../temp" 
    if (fs.existsSync(tmpDir)) {
      const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"))
      for (let file of files) {
        fs.unlinkSync(`${tmpDir}/${file}`)
      }
    }

    await m.reply("Processing Backup Script . .")
    const name = `New-Script` 
    const exclude = ["node_modules", "Auth", "package-lock.json", "yarn.lock", ".npm", ".cache", ".git", "session"]
    const filesToZip = fs.readdirSync(".").filter(f => !exclude.includes(f) && f !== "")

    if (!filesToZip.length) return m.reply("Tidak ada file yang dapat di-backup.") 
    
    execSync(`zip -r ${name}.zip ${filesToZip.join(" ")}`)
    await sock.sendMessage(m.sender, {
      document: fs.readFileSync(`./${name}.zip`),
      fileName: `${name}.zip`,
      mimetype: "application/zip"
    }, { quoted: m })
    
    fs.unlinkSync(`./${name}.zip`)
    if (m.chat !== m.sender) {
        m.reply("✅ Script bot berhasil dikirim ke private chat.")
    }

  } catch (err) {
    console.error("Backup Error:", err)
    m.reply("⚠️ Terjadi kesalahan saat melakukan backup. Pastikan server kamu mendukung perintah 'zip'.")
  }
}

handler.command = ["backupsc", "bck", "backup"]

module.exports = handler