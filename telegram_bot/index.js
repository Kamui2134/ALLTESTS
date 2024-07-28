const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const key = '6735045030:AAG7iGITT3sqZxN-HxMmKvhCl_tUixwRTiQ'

const bot = new TelegramApi(key, { polling: true })

const chats = {}

const startGame = async chatId => {
	await bot.sendMessage(
		chatId,
		'Сейчас я загадаю цифру от 0 до 9, вам нужно её угадать!'
	)
	const randomNumber = Math.floor(Math.random() * 10)
	chats[chatId] = randomNumber
	await bot.sendMessage(chatId, 'Удачи в отгадывании!', gameOptions)
}

const start = () => {
	bot.setMyCommands([
		{ command: '/start', description: 'Начало работы' },
		{ command: '/info', description: 'Описание для чего нужен бот' },
		{ command: '/game', description: 'Игра угадай число' },
	])

	bot.on('message', async message => {
		const text = message.text
		const chatId = message.chat.id
		switch (text) {
			case '/start':
				await bot.sendMessage(chatId, 'Я чат бот KAMUI')
				await bot.sendSticker(
					chatId,
					'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/9.webp'
				)
				break
			case '/info':
				await bot.sendMessage(
					chatId,
					'Я нужен для того, чтобы передразнивать тебя'
				)
				break
			case '/game':
				return startGame(chatId)
				break
			default:
				await bot.sendMessage(chatId, `Ты написал мне ${text}`)
				break
		}
	})

	bot.on('callback_query', async message => {
		const data = message.data
		const chatId = message.message.chat.id

		//
		await bot.editMessageReplyMarkup(
			{ inline_keyboard: [] },
			{
				chat_id: chatId,
				message_id: message.message.message_id,
			}
		)
		//

		if (data === '/again') {
			return startGame(chatId)
		}

		if (+data === chats[chatId]) {
			await bot.sendMessage(chatId, 'Вы выиграли!!!', againOptions)
		} else {
			await bot.sendMessage(
				chatId,
				`К сожалению это неверный ответ, бот загадал цифру ${chats[chatId]}`,
				againOptions
			)
		}
		delete chats[chatId]
	})
}

start()
