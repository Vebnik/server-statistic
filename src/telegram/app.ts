import {Telegraf} from "telegraf";
import StartApp from "./bot-logic/StartApp";

const client: Telegraf = new Telegraf(
	process.env.TOKEN_TG
		? process.env.TOKEN_TG
		: 'null'
)

StartApp.launchApp(client)
