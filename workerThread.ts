import * as cp from 'child_process'
import * as path from "path";
import * as fs from "fs";

//@TODO Подумаьб над логикой для ТГ

// tg
const createTgThread = () => {

	console.log('Trying to start tg process')

	const module = path.join('src', 'telegram', 'app.js')
	const mainWorker = cp.fork(module)

	mainWorker.on('exit', (code, signal) => {

		console.log(`tgWorker stopped\nCode ${code}\nSignal ${signal}`)

		try {
			createTgThread()
		} catch (err) {
			console.log(err)
		}
	})

	mainWorker.on('error', err => {

		console.log(`tgWorker stopped\nError ${err}`)

		try {
			fs.writeFile(`${Date.now()}.json`, JSON.stringify(err, null, 2), () => console.log('Logging error'))
		} catch (err) {
			console.log(err)
		}
	})

};createTgThread()


// discord
const createDiscordThread = () => {

	console.log('Trying to start discord process')

	const module = path.join('src', 'discord', 'app.js')
	const mainWorker = cp.fork(module)

	mainWorker.on('exit', (code, signal) => {

		try {
			//MessageExchange.sendMessageTg(`discordWorker stopped\nCode ${code}\nSignal ${signal}`)
			console.log(`discordWorker stopped\nCode ${code}\nSignal ${signal}`)

			createDiscordThread()
		} catch (err) {
			console.log(err)
		}
	})

	mainWorker.on('error', err => {

		console.log(`discordWorker stopped\nError ${err}`)

		try {
			fs.writeFile(`${Date.now()}.json`, JSON.stringify(err, null, 2), () => console.log('Logging error'))
		} catch (err) {
			console.log(err)
		}
	})

};createDiscordThread()

