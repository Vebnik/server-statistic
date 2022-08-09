import {client} from "../telegram/app";

class MessageExchange {

	public sendMessageTg(message: string) {
		client.telegram.sendMessage(process.env.CHAT_ID ?? 'null', message)
			.catch(err => console.error(err))
	}

}

export default new MessageExchange()