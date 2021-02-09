"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.compareIgnoredExtension = exports.validate = exports.compareName = void 0;
const vscode_1 = require("vscode");
const lodash_1 = require("lodash");
const path = __importStar(require("path"));
const configuration_1 = require("./configuration");
function extnameOnly(name) {
    return path.extname(name).replace('.', '');
}
function compareName(name1, name2, options) {
    var _a;
    if (options.ignoreCase) {
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();
    }
    (_a = options.ignoreExtension) === null || _a === void 0 ? void 0 : _a.forEach((exts, index) => {
        if (exts.includes(extnameOnly(name1))) {
            name1 = identityExtension(name1, index);
        }
        if (exts.includes(extnameOnly(name2))) {
            name2 = identityExtension(name2, index);
        }
    });
    return strcmp(name1, name2);
}
exports.compareName = compareName;
function showValidation(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const moreInfo = 'More Info';
        const result = yield vscode_1.window.showErrorMessage(message, moreInfo);
        if (result === moreInfo) {
            vscode_1.env.openExternal(vscode_1.Uri.parse('https://github.com/moshfeu/vscode-compare-folders#options-under-vscode-settings'));
        }
    });
}
function validate() {
    const ignoreExtension = configuration_1.getConfiguration('ignoreExtension');
    if (!ignoreExtension) {
        return true;
    }
    if (!Array.isArray(ignoreExtension)) {
        showValidation(`"ignoreExtension" settings should be array of pairs.`);
        return false;
    }
    const duplicates = lodash_1.flatten(ignoreExtension).filter(((s) => (v) => s.has(v) || !s.add(v))(new Set()));
    if (duplicates.length) {
        showValidation(`"ignoreExtension" settings contains duplicate extensions: ${duplicates.join(',')}`);
        return false;
    }
    return true;
}
exports.validate = validate;
function identityExtension(name, id) {
    return path.basename(name).replace(path.extname(name), `.$ext${id}`);
}
function strcmp(str1, str2) {
    return str1 === str2 ? 0 : str1 > str2 ? 1 : -1;
}
function compareIgnoredExtension(file1, file2) {
    return path.extname(file1) !== path.extname(file2);
}
exports.compareIgnoredExtension = compareIgnoredExtension;
//# sourceMappingURL=ignoreExtensionTools.js.map