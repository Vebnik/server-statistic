import {SlashCommandBuilder} from 'discord.js'
import {stats, reboot, deployCommands} from './commandList'

export const commands = new SlashCommandBuilder().setName('server').setDescription('Server drive commands')
	.addSubcommand(opt => stats(opt))
	.addSubcommand(opt => reboot(opt))
	.addSubcommand(opt => deployCommands(opt))