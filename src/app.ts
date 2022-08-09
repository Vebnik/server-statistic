import { Client, IntentsBitField } from 'discord.js'
import StartApp from "./bot-logic/StartApp";

const client: Client = new Client({
	intents:
		[
			IntentsBitField.Flags.DirectMessages,
			IntentsBitField.Flags.Guilds,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.GuildVoiceStates
		]
})

StartApp.login(client)