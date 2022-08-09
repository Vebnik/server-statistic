import * as cp from 'child_process'
import * as path from "path";
import * as fs from "fs";


const createMainThread = () => {

	console.log('Trying to start main process')

	const module = path.join('src', 'app.js')
	const mainWorker = cp.fork(module)

	mainWorker.on('exit', (code, signal) => {

		console.log(`mainWorker stopped\nCode ${code}\nSignal ${signal}`)

		try {
			createMainThread()
		} catch (err) {
			console.log(err)
		}
	})

	mainWorker.on('error', err => {

		console.log(`mainWorker stopped\nError ${err}`)

		try {
			fs.writeFile(`${Date.now()}.json`, JSON.stringify(err, null, 2), () => console.log('Logging error'))
		} catch (err) {
			console.log(err)
		}
	})

};createMainThread()