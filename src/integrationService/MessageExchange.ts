import MessageUtils from "../telegram/bot-logic/utils/MessageUtils";

class MessageExchange {

	public sendMessageTg(message: string) {
		MessageUtils.sendDmMessage(process.env.CHAT_ID ?? 'null', message)
	}

}

export default new MessageExchange()