"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageUtils = /** @class */ (function () {
    function MessageUtils() {
        this.globalClient = {};
    }
    MessageUtils.prototype.sendDmMessage = function (chatId, message) {
        this.globalClient.telegram.sendMessage(chatId, message)
            .catch(function (err) { return console.error(err); });
    };
    return MessageUtils;
}());
exports.default = new MessageUtils();
