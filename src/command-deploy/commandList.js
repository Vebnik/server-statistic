"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.deployCommands = exports.reboot = exports.stats = void 0;
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
var exec = function (opt) {
    return opt.setName('exec')
        .setDescription('exec commands')
        .addStringOption(function (opt) { return opt
        .setName('commands')
        .setDescription('Terminal command')
        .setRequired(true); });
};
exports.exec = exec;
