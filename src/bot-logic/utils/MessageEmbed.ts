import {ServerStats} from "../interaction/CommandServer";
import {EmbedBuilder, EmbedData} from "discord.js";

class MessageEmbed {

	public statsEmbed(data: ServerStats): EmbedBuilder {

		const embed: EmbedData = {
			title: `Server Stats 🖥️`,
			description: "",
			color: 0xfea500,
			fields: [
				{
					"name": `➖ CPU`,
					"value": `\`\`\`css\nBrand: ${data.cpu.brand}\nSpeed: ${data.cpu.speed}\nVoltage: ${data.cpu.voltage || 'no info'}\nVirtualization: ${data.cpu.virtualization}\n\`\`\``
				},
				{
					"name": `➖ MEMORY`,
					"value": `\`\`\`css\nTotal: ${(data.memory.total/1024/1024).toFixed()} Mb\nFree: ${(data.memory.free/1024/1024).toFixed()} Mb\nUsed: ${(data.memory.used/1024/1024).toFixed()} Mb\n\`\`\``
				},
				{
					"name": `➖ OS`,
					"value": `\`\`\`css\nPlatform: ${data.os.platform}\nArch: x64\nKernel: ${data.os.kernel}\nHostname: ${data.os.hostname}\nRemoteSession: ${data.os.remoteSession}\n\`\`\``
				},
				{
					"name": `➖ NETWORK`,
					"value": `\`\`\`css\nIface: ${data.network.map(el => el.iface).join('|')}, Ethernet\nIp4: ${data.network.map(el => el.ip4).join('|')}\n\`\`\``
				}
			]
		}

		return new EmbedBuilder(embed)
	}

}

export default new MessageEmbed()