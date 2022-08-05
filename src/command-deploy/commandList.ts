import {SlashCommandSubcommandBuilder} from 'discord.js'


const stats = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('stats')
		.setDescription('Get full server statistic')

const reboot = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('reboot')
		.setDescription('Reboot server and startup all process')

const deployCommands = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('deploy')
		.setDescription('Deploy commands to current server')

const exec = (opt: SlashCommandSubcommandBuilder) =>
	opt.setName('exec')
		.setDescription('exec commands')
		.addStringOption(opt => opt
			.setName('commands')
			.setDescription('Terminal command')
			.setRequired(true))

export {
	stats,
	reboot,
	deployCommands,
	exec
}


