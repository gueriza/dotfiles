"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEPERATOR = exports.globalState = void 0;
const logger_1 = require("./logger");
class GlobalState {
    constructor() {
        this.KEY = 'compareFolders.paths';
        this.clear = () => {
            var _a;
            (_a = this.globalState) === null || _a === void 0 ? void 0 : _a.update(this.KEY, []);
        };
    }
    init(context) {
        this.globalState = context.globalState;
    }
    updatePaths(path1, path2) {
        try {
            if (!this.globalState) {
                throw new Error(`globalState hasn't been initilized`);
            }
            const newPath = `${path1}${exports.SEPERATOR}${path2}`;
            const currentPaths = this.getPaths();
            const newPaths = [newPath, ...currentPaths.filter(path => path !== newPath)];
            this.globalState.update(this.KEY, newPaths);
        }
        catch (error) {
            logger_1.log(error);
        }
    }
    getPaths() {
        if (!this.globalState) {
            throw new Error(`globalState hasn't been initilized`);
        }
        return this.globalState.get(this.KEY, []);
    }
}
exports.globalState = new GlobalState();
exports.SEPERATOR = '↔';
//# sourceMappingURL=globalState.js.map