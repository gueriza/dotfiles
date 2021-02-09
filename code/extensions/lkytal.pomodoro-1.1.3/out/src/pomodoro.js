"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const pomodoroStatus_1 = require("./pomodoroStatus");
const timer_1 = require("./timer");
class Pomodoro {
    constructor(workTime = 25 * 60, pauseTime = 5 * 60) {
        this.workTime = workTime;
        this.pauseTime = pauseTime;
        this.workTime = Math.floor(this.workTime);
        this.pauseTime = Math.floor(this.pauseTime);
        this._timer = new timer_1.default();
        this.status = pomodoroStatus_1.default.None;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get timer() {
        return this._timer;
    }
    // private methods
    done() {
        this.stop();
        this.status = pomodoroStatus_1.default.Done;
    }
    resetTimer(status) {
        if (status === pomodoroStatus_1.default.Work) {
            this.timer.reset(this.workTime);
        }
        if (status === pomodoroStatus_1.default.Rest) {
            this.timer.reset(this.pauseTime);
        }
    }
    // public methods
    start(status = pomodoroStatus_1.default.Work) {
        if (status === pomodoroStatus_1.default.Work || status === pomodoroStatus_1.default.Rest) {
            if (this.status !== pomodoroStatus_1.default.Paused) {
                this.resetTimer(status);
            }
            this.status = status;
            this._timer.start(() => {
                // stop the timer if no second left
                if (this.timer.currentTime <= 0) {
                    if (this.status === pomodoroStatus_1.default.Work) {
                        vscode_1.window.showInformationMessage("Work done! Take a break.");
                        this.start(pomodoroStatus_1.default.Rest);
                    }
                    else if (this.status === pomodoroStatus_1.default.Rest) {
                        vscode_1.window.showInformationMessage("Pause is over.");
                        this.done();
                    }
                }
                if (this.onTick) {
                    this.onTick();
                }
            });
        }
        else {
            console.error("Start timer error");
        }
    }
    pause() {
        this.stop();
        this.status = pomodoroStatus_1.default.Paused;
    }
    reset() {
        this.stop();
        this.status = pomodoroStatus_1.default.None;
        this._timer.currentTime = this.workTime;
    }
    stop() {
        this._timer.stop();
    }
    dispose() {
        this.stop();
        this.status = pomodoroStatus_1.default.None;
    }
}
exports.default = Pomodoro;
//# sourceMappingURL=pomodoro.js.map