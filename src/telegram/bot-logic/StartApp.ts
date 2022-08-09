import {Context ,Telegraf} from "telegraf";
import {Update} from "typegram";
import EventHandler from "./EventHandler";
import MessageUtils from "./utils/MessageUtils";


class StartApp {

	public launchApp(client: Telegraf) {

		client.launch().then(() => {
			this.onMessage(client)
			this.onCommand(client)
			StartApp.onLaunch(client)
			}).catch(err => console.error(err))
	}

	private onMessage(client: Telegraf) {

		client.on('message', (context: Context<Update>) => {
			EventHandler.messageEvent(context)
		})
	}

	private onCommand(client: Telegraf) {

		client.command(['start', 'server'], (context: Context<Update>) => {
			EventHandler.commandEvent(context)
		})
	}

	private static onLaunch(client: Telegraf) {

		MessageUtils.globalClient = client

		console.log(`App ${client.botInfo?.username}\nStarted at ${new Date().toISOString()}`)
	}
}

export default new StartApp()