"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const pomodoroManager_1 = require("./pomodoroManager");
function activate(context) {
    const config = vscode.workspace.getConfiguration("pomodoro");
    const pomodoroManager = new pomodoroManager_1.default(config.workTime, config.pauseTime);
    // list of commands
    const startDisposable = vscode.commands.registerCommand("extension.startPomodoro", () => {
        pomodoroManager.start();
    });
    const stopDisposable = vscode.commands.registerCommand("extension.pausePomodoro", () => {
        pomodoroManager.pause();
    });
    const resetDisposable = vscode.commands.registerCommand("extension.resetPomodoro", () => {
        pomodoroManager.reset();
    });
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(pomodoroManager, startDisposable, stopDisposable, resetDisposable);
}
exports.activate = activate;
function deactivate() {
    console.log("pomodoro deactivate");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map