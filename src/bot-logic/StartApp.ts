import {Client, CommandInteraction, Interaction, Message} from "discord.js";
import EventHandler from "./EventHandler";
import ErrorHandler from './utils/ErrorHandler'

class StartApp {

	public login(client: Client) {
		client.login(process.env.TOKEN)
			.then(() => {
				this.onInteraction(client)
				this.onMessage(client)
			})
			.catch(err => ErrorHandler.startError(err))
	}

	private onInteraction(client: Client) {
		client.on('interactionCreate', interaction => {

			if (interaction.isCommand())
				EventHandler.interacionCommand(interaction, client)
					.catch(err => ErrorHandler.interactionError(err))

			if (!interaction.isCommand())
				console.log('not found handler interaction')
		})
	}

	private onMessage(client: Client) {
		client.on('messageCreate', (message: Message) =>
			EventHandler.message(message, client))
	}

}

export default new StartApp()