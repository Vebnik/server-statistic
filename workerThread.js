"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cp = __importStar(require("child_process"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
//@TODO Подумаьб над логикой для ТГ
// tg
var createTgThread = function () {
    console.log('Trying to start tg process');
    var module = path.join('src', 'telegram', 'app.js');
    var mainWorker = cp.fork(module);
    mainWorker.on('exit', function (code, signal) {
        console.log("tgWorker stopped\nCode ".concat(code, "\nSignal ").concat(signal));
        try {
            createTgThread();
        }
        catch (err) {
            console.log(err);
        }
    });
    mainWorker.on('error', function (err) {
        console.log("tgWorker stopped\nError ".concat(err));
        try {
            fs.writeFile("".concat(Date.now(), ".json"), JSON.stringify(err, null, 2), function () { return console.log('Logging error'); });
        }
        catch (err) {
            console.log(err);
        }
    });
};
createTgThread();
// discord
var createDiscordThread = function () {
    console.log('Trying to start discord process');
    var module = path.join('src', 'discord', 'app.js');
    var mainWorker = cp.fork(module);
    mainWorker.on('exit', function (code, signal) {
        try {
            //MessageExchange.sendMessageTg(`discordWorker stopped\nCode ${code}\nSignal ${signal}`)
            console.log("discordWorker stopped\nCode ".concat(code, "\nSignal ").concat(signal));
            createDiscordThread();
        }
        catch (err) {
            console.log(err);
        }
    });
    mainWorker.on('error', function (err) {
        console.log("discordWorker stopped\nError ".concat(err));
        try {
            fs.writeFile("".concat(Date.now(), ".json"), JSON.stringify(err, null, 2), function () { return console.log('Logging error'); });
        }
        catch (err) {
            console.log(err);
        }
    });
};
createDiscordThread();
