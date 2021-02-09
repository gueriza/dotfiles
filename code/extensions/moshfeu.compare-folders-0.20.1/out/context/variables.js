"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
var VARIABLES;
(function (VARIABLES) {
    VARIABLES["WORKSPACE_HAS_ONE_FOLDER"] = "workspaceHasOneFolder";
})(VARIABLES || (VARIABLES = {}));
class ContextVariable {
    constructor(key) {
        this.key = key;
    }
    set(value) {
        vscode_1.commands.executeCommand('setContext', this.key, value);
    }
}
exports.default = {
    [VARIABLES.WORKSPACE_HAS_ONE_FOLDER]: new ContextVariable(VARIABLES.WORKSPACE_HAS_ONE_FOLDER)
};
//# sourceMappingURL=variables.js.map