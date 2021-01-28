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
const assert = __importStar(require("assert"));
const treeBuilder_1 = require("../../services/treeBuilder");
const file_1 = require("../../models/file");
const vscode_1 = require("vscode");
const commands_1 = require("../../constants/commands");
const path = __importStar(require("path"));
suite('Extension Test Suite', () => {
    test('Generate tree with one file', () => {
        const paths = [['/base/path/to/rootFolder/index.html', '/base/path/to/rootFolder1/index.html']];
        const basePath = '/base/path/to/rootFolder';
        assert.deepEqual(treeBuilder_1.build(paths, basePath).tree, {
            'index.html': [
                paths[0],
                'index.html'
            ]
        });
    });
    test('Generate tree with deep hierarchy', () => {
        const paths = [['/base/path/to/rootFolder/folder1/folder2/index.html', '/base/path/to/rootFolder1/folder1/folder2/index.html']];
        const basePath = '/base/path/to/rootFolder';
        assert.deepEqual(treeBuilder_1.build(paths, basePath).tree, {
            folder1: {
                path: path.join(basePath, 'folder1'),
                folder2: {
                    path: path.join(basePath, 'folder1', 'folder2'),
                    'index.html': [
                        paths[0],
                        path.join('folder1/folder2/index.html')
                    ]
                }
            }
        });
    });
    test('Generte list of TreeView\'s', () => {
        const paths = [['/base/path/to/rootFolder/folder1/folder2/index.html', '/base/path/to/rootFolder1/folder1/folder2/index.html']];
        const basePath = '/base/path/to/rootFolder';
        const { treeItems } = treeBuilder_1.build(paths, basePath);
        assert.deepEqual(treeItems, [
            new file_1.File('folder1', 'folder', vscode_1.TreeItemCollapsibleState.Collapsed, undefined, [
                new file_1.File('folder2', 'folder', vscode_1.TreeItemCollapsibleState.Collapsed, undefined, [
                    new file_1.File('index.html', 'file', vscode_1.TreeItemCollapsibleState.None, {
                        title: 'index.html',
                        command: commands_1.COMPARE_FILES,
                        arguments: [paths[0], path.join('folder1/folder2/index.html')]
                    }, undefined, undefined)
                ], vscode_1.Uri.parse(path.join(basePath, 'folder1', 'folder2')))
            ], vscode_1.Uri.parse(path.join(basePath, 'folder1')))
        ]);
    });
});
//# sourceMappingURL=treeBuilder.test.js.map