import {SlashCommandSubcommandBuilder} from 'discord.js'
import {APIApplicationCommandOptionChoice} from "discord-api-types/v9";

const execChoices: APIApplicationCommandOptionChoice<string>[] = [
	{ name: 'Start Lebowski', value: 'python3 ../Bot_Lebowski/bot.py' },
	{ name: 'Get current dir list', value: 'ls' },
]


const stats = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('stats')
		.setDescription('Get full server statistic')

const reboot = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('reboot')
		.setDescription('Reboot server and startup all process')

const deployCommands = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('deploy')
		.setDescription('Deploy commands to current server')

const getChildProcess = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('get_process')
		.setDescription('Show all child process')

const exec = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('exec')
		.setDescription('exec commands')
		.addStringOption(opt => opt
			.setName('commands')
			.setDescription('Terminal command')
			.setRequired(false))


export {
	stats,
	reboot,
	deployCommands,
	exec,
	getChildProcess
}


