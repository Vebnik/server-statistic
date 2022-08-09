"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../telegram/app");
var MessageExchange = /** @class */ (function () {
    function MessageExchange() {
    }
    MessageExchange.prototype.sendMessageTg = function (message) {
        var _a;
        app_1.client.telegram.sendMessage((_a = process.env.CHAT_ID) !== null && _a !== void 0 ? _a : 'null', message)
            .catch(function (err) { return console.error(err); });
    };
    return MessageExchange;
}());
exports.default = new MessageExchange();
