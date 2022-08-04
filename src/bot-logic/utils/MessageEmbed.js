"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var MessageEmbed = /** @class */ (function () {
    function MessageEmbed() {
    }
    MessageEmbed.prototype.statsEmbed = function (data) {
        var embed = {
            title: "Server Stats \uD83D\uDDA5\uFE0F",
            description: "",
            color: 0xfea500,
            fields: [
                {
                    "name": "\u2796 CPU",
                    "value": "```css\nBrand: ".concat(data.cpu.brand, "\nSpeed: ").concat(data.cpu.speed, "\nVoltage: ").concat(data.cpu.voltage || 'no info', "\nVirtualization: ").concat(data.cpu.virtualization, "\n```")
                },
                {
                    "name": "\u2796 MEMORY",
                    "value": "```css\nTotal: ".concat((data.memory.total / 1024 / 1024).toFixed(), " Mb\nFree: ").concat((data.memory.free / 1024 / 1024).toFixed(), " Mb\nUsed: ").concat((data.memory.used / 1024 / 1024).toFixed(), " Mb\n```")
                },
                {
                    "name": "\u2796 OS",
                    "value": "```css\nPlatform: ".concat(data.os.platform, "\nArch: x64\nKernel: ").concat(data.os.kernel, "\nHostname: ").concat(data.os.hostname, "\nRemoteSession: ").concat(data.os.remoteSession, "\n```")
                },
                {
                    "name": "\u2796 NETWORK",
                    "value": "```css\nIface: ".concat(data.network.map(function (el) { return el.iface; }).join('|'), ", Ethernet\nIp4: ").concat(data.network.map(function (el) { return el.ip4; }).join('|'), "\n```")
                }
            ]
        };
        return new discord_js_1.EmbedBuilder(embed);
    };
    return MessageEmbed;
}());
exports.default = new MessageEmbed();
//# sourceMappingURL=MessageEmbed.js.map