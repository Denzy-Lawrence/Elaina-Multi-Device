/*──────────────────────────────────────
  GitHub   : https://github.com/flying-panties
  Telegram : https://t.me/pantatbegetar
  Channel : https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04
  Group : https://chat.whatsapp.com/Lv5UCEtBDL9BUyoh9VA2kl?mode=gi_t
  Api : https://api.nexray.web.id
  
{ Di Sponsi Oleh Rest Api api.nexray.web.id }
{ JANGAN LUPA HIDUPIN STAR REPOSITORY NYA YA 🌟 🤩 }
──────────────────────────────────────*/
const config = require('./src/config/settings');
const fs = require("fs");
const axios = require("axios")
const path = require('path');
const FormData = require("form-data"); // modul
const form = new FormData();           
// const { Sticker } = require('wa-sticker-formatter') gak support di termux ada sharp nya kalo gak pake termux hilangin aja // itu nya
const chalk = require("chalk");
const util = require("util");
const os = require('os');
const moment = require("moment-timezone");
const { exec, spawn, execSync } = require('child_process');
//==================================//
const { default: WAConnection, makeWAMessage, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptionsuseSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WAlanggxyzet, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header, downloadMediaMessage } = require("@denzy-official/baileys");

//==================================//

const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, tanggal, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, toIDR, capital } = require('./src/lib/myfunction');
const {
imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, exifAvatar, addExif, writeExifWebp
} = require('./src/lib/exif');

//==================================//

const { LoadDataBase } = require('./src/handler/message');
const owners = JSON.parse(fs.readFileSync("./src/database/owner.json"))
const premium = JSON.parse(fs.readFileSync("./src/database/premium.json"))

//==================================//

const dbPrem = './src/database/premium.json';
if (!fs.existsSync(dbPrem)) fs.writeFileSync(dbPrem, '[]');
let prem = JSON.parse(fs.readFileSync(dbPrem));
const toMs = d => d * 24 * 60 * 60 * 1000;
global.isPrem = jid => {
  prem = JSON.parse(fs.readFileSync(dbPrem));
  const u = prem.find(v => v.jid === jid);
  if (!u) return false;
  if (Date.now() > u.expired) {
    prem = prem.filter(v => v.jid !== jid);
    fs.writeFileSync(dbPrem, JSON.stringify(prem, null, 2));
    return false;
  }
  return true;
};

//==================================//

function isSameUser(jid1, jid2) {
    if (!jid1 || !jid2) return false;
    const isLid = (jid) => jid.endsWith('@lid');
    const normalizedJid1 = jid1.replace('@lid', '@s.whatsapp.net');
    const normalizedJid2 = jid2.replace('@lid', '@s.whatsapp.net');
    return areJidsSameUser(normalizedJid1, normalizedJid2);
}

//==================================//

module.exports = sock = async (sock, m, chatUpdate, store) => {
	try {
await LoadDataBase(sock, m)
await LoadDataBase(sock, m)
const botNumber = await sock.decodeJid(sock.user.id)
		const body = ((m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'reactionMessage') ? m.message.reactionMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'interactiveResponseMessage'  && m.quoted) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || '') :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '') || '';
const budy = typeof m.text === 'string' ? m.text : '';
const buffer64base = `${config.owner}@s.whatsapp.net`

const multiPrefix = [".", "!", "#", ".", "$", "/"]; 
const prefix = multiPrefix.find(p => body.startsWith(p)) || ""; 
const isCmd = typeof body === 'string' && body.length > 0 && multiPrefix.some(p => body.startsWith(p));
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : body.trim().split(/ +/).slice(1);
const getQuoted = (m.quoted || m) 
const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
const isPremium = premium.includes(m.sender)
const owners = Array.isArray(config.owner)
    ? config.owner.map(v => v + "@s.whatsapp.net")
    : [];
const isCreator = [config.botNumber + "@s.whatsapp.net", ...owners].includes(m.sender) || m.isDeveloper === true;
const pushname = m.pushName || "No Name";
const isNumber = m.sender.split('@')[0];
const text = q = args.join(' ')
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime); 
const from = m.key.remoteJid;
 
//==================================//

if (isCmd) {
      const time = new Date().toLocaleTimeString("id-ID", { hour12: false });
      const line = chalk.gray("│");
      const who = `${chalk.yellow(pushname)} ${chalk.gray("(" + m.sender + ")")}`;
      const place = m.isGroup ? chalk.magenta("Group: " + m.groupName) : chalk.green("Private");

      console.log(
        chalk.gray("╭────────────────────────────────"),
        `\n${line} ${chalk.cyan("🕒")} ${time}`,
        `\n${line} ${chalk.cyan("💬")} ${chalk.green(budy || m.mtype)}`,
        `\n${line} ${chalk.cyan("👤")} ${who}`,
        `\n${line} ${chalk.cyan("📞")} ${isNumber}`,
        `\n${line} ${chalk.cyan("🏷️")} ${place}`,
        `\n${chalk.gray("╰────────────────────────────────")}\n`
      );
    }

//==================================//
    
const time2 = moment.tz("Asia/Jakarta").format("HH:mm:ss");
let ucapanWaktu = "Selamat Malam ";
if (time2 < "05:00:00") {
ucapanWaktu = "Selamat Pagi ";
} else if (time2 < "11:00:00") {
ucapanWaktu = "Selamat Pagi ";
} else if (time2 < "15:00:00") {
ucapanWaktu = "Selamat Siang ";
} else if (time2 < "18:00:00") {
ucapanWaktu = "Selamat Sore ";
} else if (time2 < "19:00:00") {
ucapanWaktu = "Selamat Petang ";
}    
//==================================//     
//========[ Function Plugin ]========//
function loadPlugins(dir) {
    let plugins = []

    const files = fs.readdirSync(dir)

    for (let file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            plugins = plugins.concat(loadPlugins(filePath))
        } else if (file.endsWith('.js')) {
            delete require.cache[require.resolve(filePath)]
            plugins.push(require(filePath))
        }
    }

    return plugins
}

async function runPlugins(command, m, extra) {
    const plugins = loadPlugins(path.resolve(__dirname, './src/plugins'))

    for (let plugin of plugins) {
        if (!plugin || !plugin.command) continue

        if (plugin.command.includes(command.toLowerCase())) {
            if (typeof plugin !== 'function') continue

            await plugin(m, extra)
            return true 
        }
    }

    return false 
}       
        
        const reaction = async (jidss, emoji) => {
            sock.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key 
                } 
            })
        };        
        
const executed = await runPlugins(command, m, {
    proto,
    generateWAMessageFromContent,
    sock,
    quoted,
    mime,
    sleep,
    text,
    prefix,
    command, 
    pushname,
    reaction, 
    mime, 
    config, 
    isCreator, 
    isPremium, 
    getBuffer, 
    tanggal, 
    os
})

if (executed) return  
//==================================//       
//==================================//

switch (command) {


default:
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(config.message.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}}
//==================================//        
if (budy.startsWith('=>')) {
if (!isCreator) return m.reply(config.message.owner)
try {
let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}}
//==================================//
if (m.text.startsWith('$')) {
  if (!isCreator) return m.reply(config.message.owner)
  exec(m.text.slice(2), (e, out) =>
    sock.sendMessage(m.chat, { text: util.format(e ? e : out) }, { quoted: m })
  );
}}

//==================================//

} catch (err) {
console.log(err)
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white("[•] Update"), chalk.white(`${__filename}\n`))
delete require.cache[file]
require(file)
})
