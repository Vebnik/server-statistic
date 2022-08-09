import {Client, CommandInteraction, Message} from "discord.js";
import CommandServer from "./interaction/CommandServer";


class EventHandler {

	public async interacionCommand(interaction: CommandInteraction, client: Client) {

		await interaction.deferReply({ephemeral: true})

		switch (interaction.commandName) {

			case 'server': CommandServer.handler(client, interaction)
				break
			case 'guild': console.log('not command logic')
				break
			default:
				break
		}
	}

	public message(message: Message, client: Client) {
		// console.log(message)
		// console.log(client)
	}

}

export default new EventHandler()