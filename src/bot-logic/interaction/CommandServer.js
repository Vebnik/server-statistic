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
var CommandServer = /** @class */ (function () {
    function CommandServer() {
    }
    CommandServer.prototype.handler = function (client, interaction) {
        var _a = interaction.options.data[0], name = _a.name, options = _a.options;
        switch (name) {
            case 'stats':
                this.stats(interaction);
                break;
            case 'deploy':
                this.deploy(interaction);
                break;
            case 'reboot':
                this.reboot(interaction);
                break;
            case 'exec':
                this.exec(interaction);
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, name, type, process_1, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!interaction.options.data[0].options)
                            return [2 /*return*/, console.log('interaction options empty')];
                        _a = interaction.options.data[0].options[0], value = _a.value, name = _a.name, type = _a.type;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (typeof value !== "string")
                            return [2 /*return*/, console.log('Value is not string')];
                        process_1 = cp.exec(value);
                        if (!process_1.stdout)
                            return [2 /*return*/, console.log('Null stdout')];
                        process_1.stdout.on('data', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
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
                        process_1.stdout.on('error', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
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
                        process_1.stderr.on('data', function (chunk) { return __awaiter(_this, void 0, void 0, function () {
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
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommandServer.prototype.reboot = function (interaction) {
        console.log(interaction);
    };
    CommandServer.prototype.deploy = function (interaction) {
        console.log(interaction);
    };
    return CommandServer;
}());
exports.default = new CommandServer();
