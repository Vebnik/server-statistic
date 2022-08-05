"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler_1 = __importDefault(require("./EventHandler"));
var ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
var StartApp = /** @class */ (function () {
    function StartApp() {
    }
    StartApp.prototype.login = function (client) {
        var _this = this;
        client.login(process.env.TOKEN)
            .then(function () {
            _this.onInteraction(client);
            _this.onMessage(client);
        })
            .catch(function (err) { return ErrorHandler_1.default.startError(err); });
        client.on('ready', function () {
            return console.log("App started at ".concat(new Date().toISOString()));
        });
    };
    StartApp.prototype.onInteraction = function (client) {
        client.on('interactionCreate', function (interaction) {
            if (interaction.isCommand()) {
                EventHandler_1.default.interacionCommand(interaction, client)
                    .catch(function (err) { return ErrorHandler_1.default.interactionError(err); });
                return;
            }
            console.log('not found handler interaction');
        });
    };
    StartApp.prototype.onMessage = function (client) {
        client.on('messageCreate', function (message) {
            return EventHandler_1.default.message(message, client);
        });
    };
    return StartApp;
}());
exports.default = new StartApp();
