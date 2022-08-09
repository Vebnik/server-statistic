import {CommandInteraction,} from "discord.js";
import UserModel from "../../../database/UserModel";
import ErrorHandler from "./ErrorHandler";

export interface InteractionPars {
	type: string
	client: string
	createdAt: Date
	id: string
	channel: string | null
	guildId: string | null
	option: object
}

class InteractionLogger {

	public async logger(interaction: CommandInteraction) {

		const User = await UserModel.getUserModel()

		User.create({
			username: interaction.user.username,
			interaction: JSON.stringify(InteractionLogger.parsInteractionInfo(interaction), null, 2)
		})
			.then(() => console.log('Logged interaction'))
			.catch(err => ErrorHandler.interactionError(err))
	}

	private static parsInteractionInfo(interaction: CommandInteraction): InteractionPars {
		return {
			type: interaction.type.toString(),
			client: interaction.applicationId,
			createdAt: interaction.createdAt,
			id: interaction.id,
			channel: interaction.channelId,
			guildId: interaction.guildId,
			option: interaction.options.data
		}
	}

}

export default new InteractionLogger()