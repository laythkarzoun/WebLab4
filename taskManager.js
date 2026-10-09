export class Task {
    constructor(id, title, completed = false) {
        Object.defineProperty(this, 'id', {
            value: id,
            writable: false,
            configurable: false,
            enumerable: true
        });

        this.title = title;
        this.completed = completed;
    }

    toggle() {
        return new Task(this.id, this.title, !this.completed);
    }
}

export class TaskManager {
    constructor(tasks = []) {
        this.tasks = [...tasks];
    }

    setTasks(newTasks) {
        this.tasks = [...newTasks];
    }

    addTask(newTask) {
        this.tasks = [...this.tasks, newTask];
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    toggleTask(taskId) {
        this.tasks = this.tasks.map(task => {
            if (task.id === taskId) {
                return task.toggle();
            }
            return task;
        });
    }
}