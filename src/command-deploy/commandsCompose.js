"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
var discord_js_1 = require("discord.js");
var commandList_1 = require("./commandList");
exports.commands = new discord_js_1.SlashCommandBuilder().setName('server').setDescription('Server drive commands')
    .addSubcommand(function (opt) { return (0, commandList_1.stats)(opt); })
    .addSubcommand(function (opt) { return (0, commandList_1.reboot)(opt); })
    .addSubcommand(function (opt) { return (0, commandList_1.deployCommands)(opt); })
    .addSubcommand(function (opt) { return (0, commandList_1.exec)(opt); })
    .addSubcommand(function (opt) { return (0, commandList_1.getChildProcess)(opt); });
