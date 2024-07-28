const TelegramApi = require('node-telegram-bot-api')

const key = '6735045030:AAG7iGITT3sqZxN-HxMmKvhCl_tUixwRTiQ'

const bot = new TelegramApi(key, {polling: true})

bot.on('message', message => {
    const text = message.text
    const chatId = message.chat.id
    bot.sendMessage(chatId, `Ты написал мне ${text}`)
})