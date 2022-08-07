import * as cp from 'child_process'
import * as path from "path";


const createMainThread = () => {

	const module = path.join('src', 'index.js')
	const mainWorker = cp.fork(module)

	mainWorker.on('exit', (code, signal) => {

		console.log(`mainWorker stopped\nCode ${code}\n Signal ${signal}`)
		console.log('Trying to start process')

		try {
			createMainThread()
		} catch (err) {
			console.log(err)
		}
	})

};createMainThread()