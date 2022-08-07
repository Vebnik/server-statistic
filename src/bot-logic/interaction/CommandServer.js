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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var systeminformation_1 = __importDefault(require("systeminformation"));
var cp = __importStar(require("child_process"));
var MessageEmbed_1 = __importDefault(require("../utils/MessageEmbed"));
var UserModel_1 = __importDefault(require("../../database/UserModel"));
//TODO Переписать getProcess для получения инфы через exec('ps -la') с логикой парса как в parsProcess
var parsProcess = function (str) {
    try {
        return str.split('\n')
            .filter(function (el) { return el.includes('python'); })[0]
            .replace(/( )+/gmi, ' ').split(' ')[3];
    }
    catch (_a) {
        return '';
    }
};
var parsAllProcess = function (str) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, str.split('\n')
                .filter(function (el) { return el; })
                .map(function (el) {
                var parsStr = el.replace(/( )+/gmi, ' ').split(' ');
                return "".concat(parsStr[3], " ").concat(parsStr.at(-1), " ");
            })
                .join('\n')];
    });
}); };
var getSystemStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, systeminformation_1.default.cpu()];
            case 1:
                _a.cpu = _b.sent();
                return [4 /*yield*/, systeminformation_1.default.mem()];
            case 2:
                _a.memory = _b.sent();
                return [4 /*yield*/, systeminformation_1.default.osInfo()];
            case 3:
                _a.os = _b.sent();
                return [4 /*yield*/, systeminformation_1.default.networkInterfaces()];
            case 4: return [2 /*return*/, (_a.network = _b.sent(),
                    _a)];
        }
    });
}); };
var createChildProcess = function (value, interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var process_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, cp.exec(value)];
            case 1:
                process_1 = _a.sent();
                if (!process_1.stdout)
                    return [2 /*return*/, console.log('Null stdout')];
                process_1.stdout.on('data', function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, interaction
                                    .editReply({ embeds: [MessageEmbed_1.default.execEmbed(chunk.toString())] })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                process_1.stdout.on('error', function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, interaction
                                    .editReply({ embeds: [MessageEmbed_1.default.execEmbed(chunk.toString())] })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // @ts-ignore
                process_1.stderr.on('data', function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, interaction
                                    .editReply({ embeds: [MessageEmbed_1.default.execEmbed(chunk.toString())] })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, interaction
                        .editReply({ embeds: [MessageEmbed_1.default.execEmbed('Exec success')] })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getRecentLog = function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var User, allLog, parsLog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.getUserModel()];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.findAll()];
            case 2:
                allLog = _a.sent();
                parsLog = allLog.map(function (el) { var _a, _b, _c, _d, _e, _f, _g, _h, _j; return "".concat((_a = el === null || el === void 0 ? void 0 : el.dataValues) === null || _a === void 0 ? void 0 : _a.id, " ").concat((_b = el === null || el === void 0 ? void 0 : el.dataValues) === null || _b === void 0 ? void 0 : _b.username, " ").concat(((_e = (_d = JSON.parse((_c = el === null || el === void 0 ? void 0 : el.dataValues) === null || _c === void 0 ? void 0 : _c.interaction)) === null || _d === void 0 ? void 0 : _d.option[0]) === null || _e === void 0 ? void 0 : _e.name) || 'No Data', " ").concat(((_j = (_h = (_g = JSON.parse((_f = el === null || el === void 0 ? void 0 : el.dataValues) === null || _f === void 0 ? void 0 : _f.interaction)) === null || _g === void 0 ? void 0 : _g.option[0]) === null || _h === void 0 ? void 0 : _h.options[0]) === null || _j === void 0 ? void 0 : _j.value) || 'No Data'); });
                return [4 /*yield*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed(parsLog.join('\n'))] })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var CommandServer = /** @class */ (function () {
    function CommandServer() {
    }
    CommandServer.prototype.handler = function (client, interaction) {
        var _a = interaction.options.data[0], name = _a.name, options = _a.options;
        switch (name) {
            case 'stats':
                this.stats(interaction);
                break;
            case 'exec':
                this.exec(interaction).catch();
                break;
            case 'get_process':
                this.getProcess(interaction).catch();
                break;
            case 'get_logger':
                CommandServer.getLogger(interaction).catch();
                break;
            case 'deploy':
                this.deploy(interaction).catch();
                break;
            default:
                break;
        }
    };
    CommandServer.prototype.stats = function (interaction) {
        var _this = this;
        getSystemStats().then(function (fullStat) { return __awaiter(_this, void 0, void 0, function () {
            var embed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        embed = MessageEmbed_1.default.statsEmbed(fullStat);
                        return [4 /*yield*/, interaction.editReply({ embeds: [embed] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    CommandServer.prototype.exec = function (interaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, value, name, type;
            return __generator(this, function (_e) {
                if (!((_c = (_b = (_a = interaction.options) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.length))
                    return [2 /*return*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('interaction options empty')] })];
                if (interaction.user.id !== '324889109355298829')
                    return [2 /*return*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('Давай так, ты не будешь писать сюда всякую каку.\nНадеюсь ты понял меня =)')] })];
                _d = interaction.options.data[0].options[0], value = _d.value, name = _d.name, type = _d.type;
                if (typeof value !== "string")
                    return [2 /*return*/, console.log('Value is not string')];
                createChildProcess(value, interaction)
                    .catch(function (err) { return console.error(err); });
                return [2 /*return*/];
            });
        });
    };
    CommandServer.prototype.deploy = function (interaction) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var checkProcess, startCommand, stopCommand, gitCommand, permission, _d, value, name, type;
            var _this = this;
            return __generator(this, function (_e) {
                checkProcess = function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var process;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, cp.exec('ps -la')];
                                        case 1:
                                            process = _b.sent();
                                            (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (chunk) { return resolve(parsProcess(chunk.toString())); });
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    });
                }); };
                startCommand = function () {
                    checkProcess().then(function (pid) {
                        pid
                            ? interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('Process already exist')] })
                            : createChildProcess('python3 ../Bot_Lebowski/bot.py', interaction).catch();
                    });
                };
                stopCommand = function () {
                    checkProcess().then(function (pid) {
                        pid
                            ? createChildProcess("kill ".concat(pid), interaction)
                            : interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('Process not found')] });
                    });
                };
                gitCommand = function () {
                    createChildProcess('cd ../Bot_Lebowski && git pull', interaction).catch();
                };
                permission = ['531958734495154176', '324889109355298829'];
                if (!permission.includes(interaction.user.id))
                    return [2 /*return*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('You have not cum')] })];
                if (!((_c = (_b = (_a = interaction.options) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.length))
                    return [2 /*return*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('interaction options empty')] })];
                _d = interaction.options.data[0].options[0], value = _d.value, name = _d.name, type = _d.type;
                switch (value) {
                    case 'git':
                        gitCommand();
                        break;
                    case 'start':
                        startCommand();
                        break;
                    case 'stop':
                        stopCommand();
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    CommandServer.prototype.getProcess = function (interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var process_2, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, cp.exec('ps -la')];
                    case 1:
                        process_2 = _c.sent();
                        (_a = process_2.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                            var data, embed;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, parsAllProcess(chunk.toString())];
                                    case 1:
                                        data = _a.sent();
                                        embed = MessageEmbed_1.default.execEmbed(data);
                                        return [4 /*yield*/, interaction.editReply({ embeds: [embed] })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('Exec success')] })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _b = _c.sent();
                        return [4 /*yield*/, interaction.editReply({ embeds: [MessageEmbed_1.default.execEmbed('Error exec <@324889109355298829>')] })];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CommandServer.getLogger = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRecentLog(interaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommandServer;
}());
exports.default = new CommandServer();
