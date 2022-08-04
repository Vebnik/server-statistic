import {Client, CommandInteraction} from "discord.js";
import si, {Systeminformation} from 'systeminformation'
import MessageEmbed from "../utils/MessageEmbed";
import CpuData = Systeminformation.CpuData;
import MemData = Systeminformation.MemData;
import OsData = Systeminformation.OsData;
import NetworkInterfacesData = Systeminformation.NetworkInterfacesData;


export interface ServerStats {
	cpu: CpuData
	memory: MemData
	os: OsData
	network: Array<NetworkInterfacesData>
}

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
			case 'deploy': this.deploy()
				break
			case 'reboot': this.reboot()
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

	private deploy() {

	}

	private reboot() {

	}
}

export default new CommandServer()