"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildProcess = exports.exec = exports.deployCommands = exports.reboot = exports.stats = void 0;
var execChoices = [
    { name: 'Start Lebowski', value: 'python3 ../Bot_Lebowski/bot.py' },
    { name: 'Get current dir list', value: 'ls' },
];
var stats = function (opt) {
    return opt.setName('stats')
        .setDescription('Get full server statistic');
};
exports.stats = stats;
var reboot = function (opt) {
    return opt.setName('reboot')
        .setDescription('Reboot server and startup all process');
};
exports.reboot = reboot;
var deployCommands = function (opt) {
    return opt.setName('deploy')
        .setDescription('Deploy commands to current server');
};
exports.deployCommands = deployCommands;
var getChildProcess = function (opt) {
    return opt.setName('get_process')
        .setDescription('Show all child process');
};
exports.getChildProcess = getChildProcess;
var exec = function (opt) {
    return opt.setName('exec')
        .setDescription('exec commands')
        .addStringOption(function (opt) { return opt
        .setName('commands')
        .setDescription('Terminal command')
        .setRequired(false); });
};
exports.exec = exec;
