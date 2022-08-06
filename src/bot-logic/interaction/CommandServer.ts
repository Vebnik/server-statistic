import {Client, CommandInteraction} from "discord.js";
import si from 'systeminformation'
import * as cp from 'child_process'
import MessageEmbed from "../utils/MessageEmbed";
import {ServerStats} from "../interface/ServerCommand";
import GlobalProcessStore from "./GlobalProcessStore";
import UserModel from "../../database/UserModel";

//TODO Переписать getProcess для получения инфы через exec('ps -la') с логикой парса как в parsProcess

const parsProcess = (str: string): string => {
	try {
		return str.split('\n')
			.filter(el => el.includes('python'))[0]
			.replace(/( )+/gmi, ' ').split(' ')[3]
	} catch {
		return ''
	}
}

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

const getRecentLog = async (interaction: CommandInteraction) => {
	const User = await UserModel.getUserModel()
	const allLog = await User.findAll()

	const parsLog = allLog.map(el =>
		`${el?.dataValues?.id} ${el?.dataValues?.username} ${JSON.parse(el?.dataValues?.interaction)?.option[0]?.name || 'No Data'} ${JSON.parse(el?.dataValues?.interaction)?.option[0]?.options[0]?.value || 'No Data'}`)

	await interaction.editReply({embeds: [MessageEmbed.execEmbed(parsLog.join('\n'))]})
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
			case 'get_logger': this.getLogger(interaction).catch()
				break
			case 'deploy': this.deploy(interaction).catch()
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

	private async deploy(interaction: CommandInteraction) {

		const checkProcess = async (): Promise<string> => {
			return new Promise(async resolve => {
				const process = await cp.exec('ps -la')
				process.stdout?.on('data', chunk => resolve(parsProcess(chunk.toString())))
			})
		}

		const startCommand = () => {
			checkProcess().then(pid => { pid
				? interaction.editReply({embeds: [MessageEmbed.execEmbed('Process already exist')]})
				: createChildProcess('python3 ../Bot_Lebowski/bot.py', interaction).catch()
			})
		}

		const stopCommand = () => {
			checkProcess().then(pid => { pid
				? createChildProcess(`kill ${pid}`, interaction)
				: interaction.editReply({embeds: [MessageEmbed.execEmbed('Process not found')]})
			})
		}

		const gitCommand = () => {
			createChildProcess('cd ../Bot_Lebowski && git pull', interaction).catch()
		}

		const permission: Array<string> = ['531958734495154176', '324889109355298829']

		if(!permission.includes(interaction.user.id))
			return interaction.editReply({embeds: [MessageEmbed.execEmbed('You have not cum')]})

		if (!interaction.options?.data[0]?.options?.length)
			return interaction.editReply({embeds: [MessageEmbed.execEmbed('interaction options empty')]})

		const { value, name, type } = interaction.options.data[0].options[0]

		switch (value) {
			case 'git': gitCommand()
				break
			case 'start': startCommand()
				break
			case 'stop': stopCommand()
				break
		}

	}

	private async getProcess(interaction: CommandInteraction) {

		const data = GlobalProcessStore.getAllProcess().values.join('\n')
		const embed = MessageEmbed.execEmbed(data)

		await interaction
			.editReply({embeds: [embed]})
	}

	private async getLogger(interaction: CommandInteraction) {
		await getRecentLog(interaction)
	}
}

export default new CommandServer()