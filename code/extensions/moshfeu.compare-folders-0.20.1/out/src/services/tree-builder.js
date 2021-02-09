"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const set_1 = __importDefault(require("lodash/set"));
const commands_1 = require("../constants/commands");
const file_1 = require("../models/file");
function build(paths, basePath) {
    const tree = {};
    paths.forEach(path => {
        const relativePath = path[0].replace(`${basePath}/`, '');
        const segments = relativePath.split('/');
        set_1.default(tree, segments, [path, relativePath]);
    });
    const treeItems = createHierarchy(tree);
    return { tree, treeItems };
}
exports.build = build;
function createHierarchy(src) {
    let children = [];
    for (const key in src) {
        const childrenOrFileData = src[key];
        if (Array.isArray(childrenOrFileData)) {
            const [paths, title] = childrenOrFileData;
            children.push(new file_1.File(key, vscode_1.TreeItemCollapsibleState.None, 'file', {
                title: key,
                command: commands_1.COMPARE_FILES,
                arguments: [paths, title]
            }));
        }
        else {
            children.push(new file_1.File(key, vscode_1.TreeItemCollapsibleState.Collapsed, 'folder', undefined, createHierarchy(childrenOrFileData)));
        }
    }
    return children;
}
//# sourceMappingURL=tree-builder.js.map