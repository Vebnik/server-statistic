"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler_1 = __importDefault(require("./EventHandler"));
var StartApp = /** @class */ (function () {
    function StartApp() {
    }
    StartApp.prototype.launchApp = function (client) {
        var _this = this;
        client.launch().then(function () {
            _this.onMessage(client);
            _this.onCommand(client);
            StartApp.onLaunch(client);
        }).catch(function (err) { return console.error(err); });
    };
    StartApp.prototype.onMessage = function (client) {
        client.on('message', function (context) {
            EventHandler_1.default.messageEvent(context);
        });
    };
    StartApp.prototype.onCommand = function (client) {
        client.command(['start', 'server'], function (context) {
            EventHandler_1.default.commandEvent(context);
        });
    };
    StartApp.onLaunch = function (client) {
        var _a;
        console.log("\n\t\t\tApp ".concat((_a = client.botInfo) === null || _a === void 0 ? void 0 : _a.username, "\n\t\t\tStarted at ").concat(new Date().toISOString(), "\n\t\t"));
    };
    return StartApp;
}());
exports.default = new StartApp();
