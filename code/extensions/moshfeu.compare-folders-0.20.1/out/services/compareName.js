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
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIgnoredExtension = exports.validate = exports.compareName = void 0;
const lodash_1 = require("lodash");
const path = __importStar(require("path"));
const ui_1 = require("../utils/ui");
function extnameOnly(name) {
    return path.extname(name).replace('.', '');
}
function compareName(name1, name2, options) {
    if (options.ignoreCase) {
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();
    }
    if (options.ignoreExtension) {
        options.ignoreExtension.forEach((exts, index) => {
            if (exts.includes(extnameOnly(name1))) {
                name1 = identityExtension(name1, index);
            }
            if (exts.includes(extnameOnly(name2))) {
                name2 = identityExtension(name2, index);
            }
        });
    }
    return strcmp(name1, name2);
}
exports.compareName = compareName;
function validate(ignoreExtensionConfig) {
    if (!ignoreExtensionConfig) {
        return;
    }
    if (!Array.isArray(ignoreExtensionConfig)) {
        ui_1.showInfoMessageWithTimeout(`"ignoreExtension" settings should be array of paris.
    https://github.com/moshfeu/vscode-compare-folders#options-under-vscode-settings`);
    }
    const duplicates = lodash_1.flatten(ignoreExtensionConfig).filter(((s) => (v) => s.has(v) || !s.add(v))(new Set()));
    if (duplicates.length) {
        ui_1.showInfoMessageWithTimeout(`"ignoreExtension" settings contains duplicate extensions: ${duplicates.join(',')}`);
    }
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
//# sourceMappingURL=compareName.js.map