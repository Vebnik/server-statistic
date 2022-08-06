import {SlashCommandBuilder} from 'discord.js'
import {stats, stopProcess, deployCommands, exec, getChildProcess, getLogger} from './commandList'

export const commands = new SlashCommandBuilder().setName('server').setDescription('Server drive commands')
	.addSubcommand(opt => stats(opt))
	.addSubcommand(opt => stopProcess(opt))
	.addSubcommand(opt => deployCommands(opt))
	.addSubcommand(opt => exec(opt))
	.addSubcommand(opt => getChildProcess(opt))
	.addSubcommand(opt => getLogger(opt))