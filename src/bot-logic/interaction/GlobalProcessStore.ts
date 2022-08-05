import * as cp from 'child_process'
import {ProcessStore} from "../interface/ServerCommand";


class GlobalProcessStore {

	// @ts-ignore
	private childProcessStore: Map<string, cp.ChildProcess>
		= new Map<number | undefined, cp.ChildProcess>()

	public setNewProcess(key: string, value: cp.ChildProcess) {
		this.childProcessStore.set(key, value)
	}

	public deleteProcess(key: string) {
		this.childProcessStore?.delete(key)
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