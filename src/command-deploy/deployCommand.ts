import {DiscordAPIError, REST} from '@discordjs/rest'
import {Routes} from "discord-api-types/v9";
import {commands} from './commandsCompose'
import argv from 'minimist'


const rest = new REST({ version: '9' })
	// @ts-ignore
	.setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started deploy (/) commands.');

		await rest.put(
			// @ts-ignore
			Routes.applicationGuildCommands(process.env.APP_ID, argv(process.argv).g.replace(/'/gmi, '')),
			{ body: [commands] },
		)

		console.log('Successfully deployed (/) commands');
		// @ts-ignore
	} catch (err: DiscordAPIError) {
		console.error(err.rawError);
	}
})();