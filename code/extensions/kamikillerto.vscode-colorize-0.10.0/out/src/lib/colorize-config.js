"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorizeConfig = void 0;
const array_1 = require("./util/array");
const vscode_1 = require("vscode");
const color_util_1 = require("./util/color-util");
function getColorizeConfig() {
    var _a;
    const configuration = vscode_1.workspace.getConfiguration('colorize', (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document);
    // remove duplicates (if duplicates)
    const colorizedVariables = Array.from(new Set(configuration.get('colorized_variables', []))); // [...new Set(array)] // works too
    const colorizedColors = Array.from(new Set(configuration.get('colorized_colors', []))); // [...new Set(array)] // works too
    const languages = configuration.get('languages', []);
    const inferedFilesToInclude = inferFilesToInclude(languages).map(extension => `**/*${extension}`);
    const filesToIncludes = Array.from(new Set(configuration.get('include', [])));
    const filesToExcludes = Array.from(new Set(configuration.get('exclude', [])));
    const searchVariables = configuration.get('enable_search_variables', false);
    return {
        languages,
        isHideCurrentLineDecorations: configuration.get('hide_current_line_decorations'),
        colorizedColors,
        colorizedVariables,
        filesToIncludes,
        filesToExcludes,
        inferedFilesToInclude,
        searchVariables,
        decorationFn: generateDecorationType(configuration.get('decoration_type'))
    };
}
exports.getColorizeConfig = getColorizeConfig;
function generateDecorationType(decorationType = 'background') {
    switch (decorationType) {
        case 'underline':
            return function (color) {
                return vscode_1.window.createTextEditorDecorationType({
                    borderWidth: '0 0 2px 0',
                    borderStyle: 'solid',
                    borderColor: color.toRgbString(),
                    rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed
                });
            };
        case 'background':
        default:
            return function (color) {
                return vscode_1.window.createTextEditorDecorationType({
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: color.toRgbString(),
                    backgroundColor: color.toRgbString(),
                    color: color_util_1.generateOptimalTextColor(color),
                    rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed
                });
            };
    }
}
function inferFilesToInclude(languagesConfig) {
    const filesExtensions = vscode_1.extensions.all.reduce((acc, extension) => {
        var _a, _b;
        if ((_b = (_a = extension.packageJSON) === null || _a === void 0 ? void 0 : _a.contributes) === null || _b === void 0 ? void 0 : _b.languages) {
            extension.packageJSON.contributes.languages.forEach(language => {
                if (languagesConfig.indexOf(language.id) !== -1 && language.extensions) {
                    acc = [
                        ...acc,
                        ...language.extensions
                    ];
                }
            });
        }
        return acc;
    }, []);
    return array_1.unique(filesExtensions.flat());
}
//# sourceMappingURL=colorize-config.js.map