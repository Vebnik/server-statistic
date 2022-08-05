import {Client, CommandInteraction} from "discord.js";
import si from 'systeminformation'
import * as cp from 'child_process'
import MessageEmbed from "../utils/MessageEmbed";
import {ServerStats} from "../interface/ServerCommand";


const getSystemStats = async (): Promise<ServerStats> => ({
	cpu: await si.cpu(),
	memory: await si.mem(),
	os: await si.osInfo(),
	network: await si.networkInterfaces()
})


class CommandServer {

	public handler(client: Client, interaction: CommandInteraction) {

		const { name, options } = interaction.options.data[0]

		switch (name) {

			case 'stats': this.stats(interaction)
				break
			case 'deploy': this.deploy(interaction)
				break
			case 'reboot': this.reboot(interaction)
				break
			case 'exec': this.exec(interaction)
				break
			default:
				break;
		}
	}

	private stats(interaction: CommandInteraction) {
		getSystemStats().then(async fullStat => {
			const embed = MessageEmbed.statsEmbed(fullStat)
			await interaction.editReply({embeds: [embed]})
		})
	}


	private async exec(interaction: CommandInteraction) {

		if (!interaction.options.data[0].options)
			return console.log('interaction options empty')

		const { value, name, type } = interaction.options.data[0].options[0]

		try {
			if(typeof value !== "string")
				return console.log('Value is not string')

			const process: cp.ChildProcess = cp.exec(value)

			if (!process.stdout)
				return console.log('Null stdout')

			process.stdout.on('data', async chunk => {
				await interaction
					.editReply({embeds: [MessageEmbed.execEmbed(chunk.toString())]})
			})

			process.stdout.on('error', async chunk => {
				await interaction
					.editReply({embeds: [MessageEmbed.execEmbed(chunk.toString())]})
			})

			// @ts-ignore
			process.stderr.on('data', async chunk => {
				await interaction
					.editReply({embeds: [MessageEmbed.execEmbed(chunk.toString())]})
			})

			await interaction
				.editReply({embeds: [MessageEmbed.execEmbed('Exec success')]})

		} catch (err) {
			console.error(err)
		}
	}


	private reboot(interaction: CommandInteraction) {
		console.log(interaction)
	}

	private deploy(interaction: CommandInteraction) {
		console.log(interaction)
	}
}

export default new CommandServer()