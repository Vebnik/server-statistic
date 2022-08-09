import {Client, CommandInteraction} from "discord.js";
import si from 'systeminformation'
import * as cp from 'child_process'
import MessageEmbed from "../utils/MessageEmbed";
import {ServerStats} from "../interface/ServerCommand";
import UserModel from "../../database/UserModel";

//TODO Краш при попытке отправить эмбед с приветствие Lebowski - запоздалый stdout

const parsProcess = (str: string): string => {
	try {
		return str.split('\n')
			.filter(el => el.includes('python'))[0]
			.replace(/( )+/gmi, ' ').split(' ')[3]
	} catch {
		return ''
	}
}

const parsAllProcess = async (str: string): Promise<string> => {
	return str.split('\n')
		.filter(el => el)
		.map(el => {
			const parsStr = el.replace(/( )+/gmi, ' ').split(' ')
			return `${parsStr[3]} ${parsStr.at(-1)} `
		})
		.join('\n')
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

		await interaction
			.editReply({embeds: [MessageEmbed.execEmbed('Exec success')]})

	} catch (err) {
		console.error(err)
	}
}

const getRecentLog = async (interaction: CommandInteraction) => {
	const User = await UserModel.getUserModel()
	const allLog = await User.findAll()

	const parsLog = allLog.slice(-30).map(el => {
		//@ts-ignore
		const { id, username, interaction } = el?.dataValues
		return `${id} ${username} ${JSON.parse(interaction)?.option[0]?.name || 'No Data'} ${JSON.parse(interaction)?.option[0]?.options[0]?.value || 'No Data'}`
	})

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
			case 'get_logger': CommandServer.getLogger(interaction).catch()
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

		// code smell
		const restartApp = () => {

			console.log('Start restarting')

			try {
				checkProcess().then(async pid => {

					if (pid) {
						await stopCommand()
						createChildProcess('python3 ../Bot_Lebowski/bot.py', interaction).catch()
						return
					}

					await createChildProcess('python3 ../Bot_Lebowski/bot.py', interaction).catch()
				})
			} catch {}
		}

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

			setInterval(() => restartApp(), 6*3600*1000)
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

		try {
			const process: cp.ChildProcess = await cp.exec('ps -la')

			process.stdout?.on('data',  async chunk => {
				const data = await parsAllProcess(chunk.toString())
				const embed = MessageEmbed.execEmbed(data)

				await interaction.editReply({embeds: [embed]})
			})

			await interaction.editReply({embeds: [MessageEmbed.execEmbed('Exec success')]})
		} catch {
			await interaction.editReply({embeds: [MessageEmbed.execEmbed('Error exec <@324889109355298829>')]})
		}

	}

	private static async getLogger(interaction: CommandInteraction) {
		await getRecentLog(interaction)
	}
}

export default new CommandServer()