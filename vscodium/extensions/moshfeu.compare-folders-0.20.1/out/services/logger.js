"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const vscode_1 = require("vscode");
const logger = vscode_1.window.createOutputChannel('Compare Folders');
function log(...data) {
    data.forEach(item => {
        if (typeof item === 'string') {
            logger.appendLine(item);
        }
        else {
            logger.appendLine(JSON.stringify(item, null, 2));
        }
    });
    console.log(...data);
}
exports.log = log;
//# sourceMappingURL=logger.js.map