"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const tree_builder_1 = require("../../services/tree-builder");
const file_1 = require("../../models/file");
const vscode_1 = require("vscode");
const commands_1 = require("../../constants/commands");
suite('Extension Test Suite', () => {
    test('Generate tree with one file', () => {
        const paths = [['/base/path/to/rootFolder/index.html', '/base/path/to/rootFolder1/index.html']];
        const basePath = '/base/path/to/rootFolder';
        assert.deepEqual(tree_builder_1.build(paths, basePath).tree, {
            'index.html': [
                paths[0],
                'index.html'
            ]
        });
    });
    test('Generate tree with deep hierarchy', () => {
        const paths = [['/base/path/to/rootFolder/folder1/folder2/index.html', '/base/path/to/rootFolder1/folder1/folder2/index.html']];
        const basePath = '/base/path/to/rootFolder';
        assert.deepEqual(tree_builder_1.build(paths, basePath).tree, {
            folder1: {
                folder2: {
                    'index.html': [
                        paths[0],
                        'folder1/folder2/index.html'
                    ]
                }
            }
        });
    });
    test('Generte list of TreeView\'s', () => {
        const paths = [['/base/path/to/rootFolder/folder1/folder2/index.html', '/base/path/to/rootFolder1/folder1/folder2/index.html']];
        const basePath = '/base/path/to/rootFolder';
        const { treeItems } = tree_builder_1.build(paths, basePath);
        assert.deepEqual(treeItems, [
            new file_1.File('folder1', vscode_1.TreeItemCollapsibleState.Collapsed, 'folder', undefined, [
                new file_1.File('folder2', vscode_1.TreeItemCollapsibleState.Collapsed, 'folder', undefined, [
                    new file_1.File('index.html', vscode_1.TreeItemCollapsibleState.None, 'file', {
                        title: 'index.html',
                        command: commands_1.COMPARE_FILES,
                        arguments: [paths[0], 'folder1/folder2/index.html']
                    })
                ])
            ])
        ]);
    });
});
//# sourceMappingURL=tree-builder.test.js.map