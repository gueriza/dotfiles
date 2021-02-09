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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showErrorMessage = exports.showDoneableInfo = exports.showInfoMessageWithTimeout = void 0;
const vscode_1 = require("vscode");
const logger_1 = require("../services/logger");
const os_1 = __importDefault(require("os"));
const package_json_1 = require("../../package.json");
function showInfoMessageWithTimeout(message, timeout = 3000) {
    const upTo = timeout / 10;
    vscode_1.window.withProgress({
        location: vscode_1.ProgressLocation.Notification,
        title: message,
        cancellable: true,
    }, (progress) => __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                progress.report({ increment: counter / upTo });
                if (++counter === upTo) {
                    clearInterval(interval);
                    resolve();
                }
            }, 10);
        });
    }));
}
exports.showInfoMessageWithTimeout = showInfoMessageWithTimeout;
function showDoneableInfo(title, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield vscode_1.window.withProgress({
            location: vscode_1.ProgressLocation.Notification,
            title,
        }, () => __awaiter(this, void 0, void 0, function* () { return callback(); }));
    });
}
exports.showDoneableInfo = showDoneableInfo;
function showErrorMessage(message, error) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield vscode_1.window.showErrorMessage(message, 'Report')) === 'Report') {
            try {
                const body = `**Original message**: ${message}

**System Info**
Extension version: ${package_json_1.version}
OS: ${os_1.default.platform()} ${os_1.default.release()}

**Stack**
${error.stack || error.message || error}
`;
                const url = `https://github.com/moshfeu/vscode-compare-folders/issues/new?title=[error] ${error.message || error}&body=${body}`;
                const uri = vscode_1.Uri.parse(url);
                vscode_1.env.openExternal(uri);
            }
            catch (error) {
                logger_1.log(error);
            }
        }
    });
}
exports.showErrorMessage = showErrorMessage;
//# sourceMappingURL=ui.js.map