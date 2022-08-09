import {SlashCommandSubcommandBuilder} from 'discord.js'
import {APIApplicationCommandOptionChoice} from "discord-api-types/v9";

const execChoices: APIApplicationCommandOptionChoice<string>[] = [
	{ name: 'Start Lebowski', value: 'start' },
	{ name: 'Stop Lebowski', value: 'stop' },
	{ name: 'Deploy from GitHub', value: 'git' },
]


const stats = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('stats')
		.setDescription('Get full server statistic')

const stopProcess = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('stop_process')
		.setDescription('Kill target process')
		.addIntegerOption(opt => opt
			.setName('pid')
			.setDescription('process id')
			.setRequired(true))

const deployCommands = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('deploy')
		.setDescription('Deploy commands to current server')
		.addStringOption(opt => opt.setName('process')
			.addChoices(...execChoices).setDescription('Deploy bot').setRequired(true))

const getChildProcess = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('get_process')
		.setDescription('Show all child process')

const getLogger = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('get_logger')
		.setDescription('Show all recent log in logger')

const exec = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('exec')
		.setDescription('exec commands')
		.addStringOption(opt => opt
			.setName('commands')
			.setDescription('Terminal command')
			.setRequired(false))


export {
	stats,
	stopProcess,
	deployCommands,
	exec,
	getChildProcess,
	getLogger
}


