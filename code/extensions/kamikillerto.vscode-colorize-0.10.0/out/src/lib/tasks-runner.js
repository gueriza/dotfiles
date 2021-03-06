"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TasksRunner {
    constructor() {
        this._currentTask = null;
    }
    /**
     * Add a task to run.
     * Pushing a new task will cancel the execution of the previous
     *
     * @param {Generator} IterableIterator<any>
     * @returns
     * @memberOf TasksRunner
     */
    run(f) {
        if (this._currentTask) {
            this._currentTask.return();
        }
        this._currentTask = f();
        this._run();
        return this; // for chaining fun!
    }
    /**
     * Cancel the currently running task
     *
     * @memberOf TasksRunner
     */
    stop() {
        if (this._currentTask) {
            this._currentTask.return();
        }
    }
    _run() {
        const it = this._currentTask;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        function run(args) {
            try {
                const result = it.next(args); // deal with errors in generators
                if (result.done) {
                    return result.value;
                }
                else {
                    return Promise.resolve(result.value).then(run);
                }
            }
            catch (error) {
                // do something
            }
        }
        run();
    }
}
exports.default = TasksRunner;
//# sourceMappingURL=tasks-runner.js.map