import * as cp from 'child_process'
import {ProcessStore} from "../interface/ServerCommand";


class GlobalProcessStore {

	//TODO Добавить удаление процесса и его остановку
	//TODO Так же сделать автоподстановку для запуска бота славы

	// @ts-ignore
	private childProcessStore: Map<string, cp.ChildProcess>
		= new Map<number | undefined, cp.ChildProcess>()

	public setNewProcess(key: string, value: cp.ChildProcess) {
		this.childProcessStore.set(key, value)
	}

	public async deleteProcess(key: string) {

		if (!this.childProcessStore?.has(key))
			return

		this.childProcessStore.get(key).kill()
		await this.childProcessStore?.delete(key)
	}

	public getAllProcess(): ProcessStore {

		const keys: IterableIterator<string> = this.childProcessStore.keys()
		const values: IterableIterator<cp.ChildProcess> = this.childProcessStore.values()
		const ArrayKeys = Array.from(keys)

		return {
			keys: Array.from(keys),
			values: Array.from(values).map((el, i) => `${ArrayKeys[i]} ${String(el.eventNames().toString())}`)
		}
	}

}

export default new GlobalProcessStore()