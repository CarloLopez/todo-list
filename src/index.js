'use strict';

import 'normalize.css';
import './style.css';
import {TodoList, Project, ProjectItem} from './models.js';
import {showProjectDialog, refreshSidebar} from './dom.js';

const todo = new TodoList();

const newProjectButton = document.querySelector('.new-project');
newProjectButton.addEventListener('click', () => {
    showProjectDialog();

    // add event listener to create a new project using addProject()
    const dialogForm = document.querySelector('.dialog-form');
    dialogForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const projName = document.querySelector('#projName').value;

        // call addProject()
        todo.addProject(projName);
        refreshSidebar(todo);

        const dialog = document.querySelector('dialog');
        dialog.close();
    })
});