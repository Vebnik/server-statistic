import * as cp from 'child_process'
import * as path from "path";


const createMainThread = () => {

	console.log('Trying to start main process')

	const module = path.join('src', 'index.js')
	const mainWorker = cp.fork(module)

	mainWorker.on('exit', (code, signal) => {

		console.log(`mainWorker stopped\nCode ${code}\nSignal ${signal}`)

		try {
			createMainThread()
		} catch (err) {
			console.log(err)
		}
	})

};createMainThread()