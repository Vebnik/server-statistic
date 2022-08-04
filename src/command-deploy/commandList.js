"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommands = exports.reboot = exports.stats = void 0;
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
//# sourceMappingURL=commandList.js.map