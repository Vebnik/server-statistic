"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalProcessStore = /** @class */ (function () {
    function GlobalProcessStore() {
        // @ts-ignore
        this.childProcessStore = new Map();
    }
    GlobalProcessStore.prototype.setNewProcess = function (key, value) {
        this.childProcessStore.set(key, value);
    };
    GlobalProcessStore.prototype.deleteProcess = function (key) {
        var _a;
        (_a = this.childProcessStore) === null || _a === void 0 ? void 0 : _a.delete(key);
    };
    GlobalProcessStore.prototype.getAllProcess = function () {
        var keys = this.childProcessStore.keys();
        var values = this.childProcessStore.values();
        var ArrayKeys = Array.from(keys);
        return {
            keys: Array.from(keys),
            values: Array.from(values).map(function (el, i) { return "".concat(ArrayKeys[i], " ").concat(String(el.eventNames().toString())); })
        };
    };
    return GlobalProcessStore;
}());
exports.default = new GlobalProcessStore();
