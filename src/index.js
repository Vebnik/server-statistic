"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var StartApp_1 = __importDefault(require("./bot-logic/StartApp"));
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.DirectMessages,
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.GuildVoiceStates
    ]
});
StartApp_1.default.login(client);
//# sourceMappingURL=index.js.map