"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
var Contexts;
(function (Contexts) {
    Contexts["IN_DIFF_VIEW"] = "inDiffView";
})(Contexts || (Contexts = {}));
let diffEditor;
function setDiffEditor(editor) {
    diffEditor = editor;
    setDiffContext();
}
exports.setDiffEditor = setDiffEditor;
function setDiffContext() {
    // https://github.com/Microsoft/vscode/issues/10471#issuecomment-239764839
    return vscode_1.commands.executeCommand('setContext', Contexts.IN_DIFF_VIEW, true);
}
exports.setDiffContext = setDiffContext;
function clearDiffContext() {
    // https://github.com/Microsoft/vscode/issues/10471#issuecomment-239764839
    return vscode_1.commands.executeCommand('setContext', Contexts.IN_DIFF_VIEW, false);
}
exports.clearDiffContext = clearDiffContext;
function editorChanged(currentEditor) {
    console.log(JSON.stringify(vscode_1.window.activeTextEditor).length);
    console.log(JSON.stringify(diffEditor));
    if (JSON.stringify(vscode_1.window.activeTextEditor) === JSON.stringify(diffEditor)) {
        setDiffContext();
    }
    else {
        clearDiffContext();
    }
}
function initContextCleaner() {
    return [
        vscode_1.window.onDidChangeActiveTextEditor(editorChanged),
    ];
}
exports.initContextCleaner = initContextCleaner;
//# sourceMappingURL=context.js.map