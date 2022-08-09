"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var StartApp_1 = __importDefault(require("./bot-logic/StartApp"));
var client = new telegraf_1.Telegraf(process.env.TOKEN_TG
    ? process.env.TOKEN_TG
    : 'null');
StartApp_1.default.launchApp(client);
