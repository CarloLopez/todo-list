import 'normalize.css';
import './style.css';

'use strict';

// container for individual todo items
class Project {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    addItem(title, description, dueDate) {
        const priority = this.items.length + 1;
        const item = new ProjectItem(title, description, dueDate, priority);
        this.items.push(item);
    }

    removeItem(index) {
        this.items.splice(index, 1);
        // decrement subsequent project items' priority
        for (let i = index; i < this.items.length; i++) {
            this.items[i].priority--;
        }
    }
}

class ProjectItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class TodoList {
    constructor() {
        this.projects = [];
    }

    addProject(title) {
        const project = new Project(title);
        this.projects.push(project);
    }
}

const main = new TodoList;