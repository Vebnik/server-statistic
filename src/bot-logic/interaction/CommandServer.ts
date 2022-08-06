import {Client, CommandInteraction} from "discord.js";
import si from 'systeminformation'
import * as cp from 'child_process'
import MessageEmbed from "../utils/MessageEmbed";
import {ServerStats} from "../interface/ServerCommand";
import GlobalProcessStore from "./GlobalProcessStore";
import globalProcessStore from "./GlobalProcessStore";



const getSystemStats = async (): Promise<ServerStats> => ({
	cpu: await si.cpu(),
	memory: await si.mem(),
	os: await si.osInfo(),
	network: await si.networkInterfaces()
})

const createChildProcess = async (value: string, interaction: CommandInteraction) => {
	try {

		const process: cp.ChildProcess = await cp.exec(value)

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

		GlobalProcessStore.setNewProcess(`${value} ${process.pid}`, process)

		await interaction
			.editReply({embeds: [MessageEmbed.execEmbed('Exec success')]})

	} catch (err) {
		console.error(err)
	}
}


class CommandServer {

	public handler(client: Client, interaction: CommandInteraction) {

		const { name, options } = interaction.options.data[0]

		switch (name) {

			case 'stats': this.stats(interaction)
				break
			case 'exec': this.exec(interaction).catch()
				break
			case 'get_process': this.getProcess(interaction).catch()
				break
			case 'stop_process': this.stopProcess(interaction).catch()
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

		if (!interaction.options?.data[0]?.options?.length)
			return interaction.editReply({embeds: [MessageEmbed.execEmbed('interaction options empty')]})

		if (interaction.user.id !== '324889109355298829')
			return interaction.editReply({embeds: [MessageEmbed.execEmbed('Давай так, ты не будешь писать сюда всякую каку.\nНадеюсь ты понял меня =)')]})

		const { value, name, type } = interaction.options.data[0].options[0]

		if(typeof value !== "string")
			return console.log('Value is not string')

		createChildProcess(value, interaction)
			.catch(err => console.error(err))
	}

	private async getProcess(interaction: CommandInteraction) {

		const data = globalProcessStore.getAllProcess().values.join('\n')
		const embed = MessageEmbed.execEmbed(data)

		await interaction
			.editReply({embeds: [embed]})
	}

	private async stopProcess(interaction: CommandInteraction) {

		if (!interaction.options?.data[0]?.options?.length)
			return interaction.editReply({embeds: [MessageEmbed.execEmbed('interaction options empty')]})

		const { value, name, type } = interaction.options.data[0].options[0]

		await globalProcessStore.deleteProcess(value)
			.then(async results => {
				await interaction
					.editReply({embeds: [MessageEmbed.execEmbed(results ? 'Exec success' : 'Not found pid')]})
			})

	}
}

export default new CommandServer()