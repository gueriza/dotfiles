"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContext = void 0;
const vscode_1 = require("vscode");
exports.setContext = (key, value) => {
    vscode_1.commands.executeCommand('setContext', key, value);
};
//# sourceMappingURL=global.js.map