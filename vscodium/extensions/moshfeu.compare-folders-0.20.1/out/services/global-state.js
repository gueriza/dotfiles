"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEPERATOR = exports.globalState = void 0;
const lodash_1 = require("lodash");
class GlobalState {
    constructor() {
        this.KEY = 'compareFolders.paths';
        this.clear = () => {
            var _a;
            (_a = this.globalState) === null || _a === void 0 ? void 0 : _a.update(this.KEY, new Set());
        };
    }
    init(context) {
        this.globalState = context.globalState;
    }
    updatePaths(path1, path2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.globalState) {
                throw new Error(`globalState hasn't been initilized`);
            }
            const currentPaths = this.getPaths();
            currentPaths.add(`${path1}${exports.SEPERATOR}${path2}`);
            yield this.globalState.update(this.KEY, currentPaths);
        });
    }
    getPaths() {
        if (!this.globalState) {
            throw new Error(`globalState hasn't been initilized`);
        }
        const stateFromStorage = this.globalState.get(this.KEY, new Set());
        return lodash_1.isEmpty(stateFromStorage) ? new Set() : stateFromStorage;
    }
}
exports.globalState = new GlobalState();
exports.SEPERATOR = '↔';
//# sourceMappingURL=global-state.js.map