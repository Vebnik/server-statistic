"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.startError = function (err) {
        console.error(err.rawError);
    };
    ErrorHandler.prototype.interactionError = function (err) {
        console.log(err);
    };
    return ErrorHandler;
}());
exports.default = new ErrorHandler();
