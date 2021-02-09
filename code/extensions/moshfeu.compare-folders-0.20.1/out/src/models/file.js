"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const logger_1 = require("../services/logger");
class File extends vscode_1.TreeItem {
    constructor(label, type, collapsibleState, command, children, resourceUri) {
        var _a;
        super(label, collapsibleState);
        this.label = label;
        this.type = type;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.children = children;
        this.resourceUri = resourceUri;
        this.iconPath = this.hasIcon ? {
            light: path_1.join(__filename, '..', '..', '..', 'resources', 'light', `${this.type}.svg`),
            dark: path_1.join(__filename, '..', '..', '..', 'resources', 'dark', `${this.type}.svg`),
        } : undefined;
        this.contextValue = this.type;
        try {
            this.tooltip = this.label;
            this.resourceUri = this.resourceUri || (this.hasIcon ?
                undefined :
                vscode_1.Uri.parse((_a = this.command) === null || _a === void 0 ? void 0 : _a.arguments[0][0]));
        }
        catch (error) {
            logger_1.log(`can't set resourceUri: ${error}`);
        }
    }
    get hasIcon() {
        return ['open', 'empty', 'root'].includes(this.type);
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map