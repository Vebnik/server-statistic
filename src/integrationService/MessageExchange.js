"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageUtils_1 = __importDefault(require("../telegram/bot-logic/utils/MessageUtils"));
var MessageExchange = /** @class */ (function () {
    function MessageExchange() {
    }
    MessageExchange.prototype.sendMessageTg = function (message) {
        var _a;
        MessageUtils_1.default.sendDmMessage((_a = process.env.CHAT_ID) !== null && _a !== void 0 ? _a : 'null', message);
    };
    return MessageExchange;
}());
exports.default = new MessageExchange();
