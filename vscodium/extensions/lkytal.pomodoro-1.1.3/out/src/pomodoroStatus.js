"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PomodoroStatus;
(function (PomodoroStatus) {
    PomodoroStatus[PomodoroStatus["None"] = 0] = "None";
    PomodoroStatus[PomodoroStatus["Work"] = 1] = "Work";
    PomodoroStatus[PomodoroStatus["Rest"] = 2] = "Rest";
    PomodoroStatus[PomodoroStatus["Paused"] = 3] = "Paused";
    PomodoroStatus[PomodoroStatus["Break"] = 4] = "Break";
    PomodoroStatus[PomodoroStatus["Done"] = 5] = "Done";
})(PomodoroStatus || (PomodoroStatus = {}));
exports.default = PomodoroStatus;
//# sourceMappingURL=pomodoroStatus.js.map