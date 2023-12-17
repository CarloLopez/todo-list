class TodoList {
    constructor() {
        this.projects = {};
    }

    generateProjectID() {
        return Math.random().toString(36).substring(2);
    }

    addProject(title) {
        let projectID;
        do {
            projectID = this.generateProjectID();
        } while (projectID in this.projects);

        const project = new Project(projectID, title);
        this.projects[projectID] = project;
    }
}

class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.items = {};
    }

    get length() {
        return Object.keys(this.items).length;
    }

    generateItemID() {
        return Math.random().toString(36).substring(2);
    }

    addItem(title, description, dueDate) {
        let itemID;
        do {
            itemID = this.generateItemID();
        } while (itemID in this.items);
        
        const priority = this.length;
        const item = new ProjectItem(itemID, title, description, dueDate, priority);
        this.items[itemID] = item;
    }

    removeItem(id) {
        delete this.items[id];
    }
}

class ProjectItem {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export {TodoList, Project, ProjectItem};