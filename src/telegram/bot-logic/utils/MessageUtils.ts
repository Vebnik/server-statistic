import {Telegraf} from "telegraf";

class MessageUtils {

	public globalClient = {} as Telegraf

	public sendDmMessage(chatId: string, message: string) {
		this.globalClient.telegram.sendMessage(chatId, message)
			.catch(err => console.error(err))
	}

}

export default new MessageUtils()