'use strict';

import 'normalize.css';
import './style.css';
import {TodoList, Project, ProjectItem} from './models.js';
import {showItemDialog, showProjectDialog, refreshSidebar, displayProject} from './dom.js';

const todo = new TodoList();

const newProjectButton = document.querySelector('.new-project');
newProjectButton.addEventListener('click', () => {
    showProjectDialog();
})

const addProjectItem = document.querySelector('.add-project-item');
addProjectItem.addEventListener('click', () => {
    const projectID = addProjectItem.dataset.projectid;
    const project = todo.projects[projectID];

    showItemDialog();
})

// add new project or project item based on data attribute of form
const dialogForm = document.querySelector('.dialog-form');
dialogForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formInputs = document.querySelector('.form-inputs');
    const formType = formInputs.dataset.type;

    if(formType === 'project') {
        const projName = document.querySelector('#projName').value;
        todo.addProject(projName);

        refreshSidebar(todo);

        const dialog = document.querySelector('dialog');
        dialog.close();
    } else if (formType === 'projectItem') {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const date = document.querySelector('#date').value;

        const addItemButton = document.querySelector('.add-project-item');
        const projectID = addItemButton.dataset.projectid;
        const project = todo.projects[projectID];
        project.addItem(title, desc, date);

        const dialog = document.querySelector('dialog');
        dialog.close();

        displayProject(todo, projectID);
    }
})