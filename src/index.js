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

        // when project button is clicked, display all items related to project
        const projButtons = document.querySelectorAll('.project-button');
        const projArray = Array.from(projButtons);

        projArray.forEach((project) => {
            project.addEventListener('click', () => {
                displayProject(todo, project.dataset.projectid);
                addTaskEventListeners();
            })
        })

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
        addTaskEventListeners();
    } else if (formType === 'itemEdit') {
        const projectID = formInputs.dataset.projectid;
        const itemID = formInputs.dataset.itemid;

        const project = todo.projects[projectID];
        const item = project.items[itemID];
        
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const date = document.querySelector('#date').value;

        item.title = title;
        item.description = desc;
        item.dueDate = date;
        
        const dialog = document.querySelector('dialog');
        dialog.close();

        displayProject(todo, projectID);
        addTaskEventListeners();
    }
})

function addTaskEventListeners() {
    addEditEventListener();
    addDeleteEventListener();
    addInfoEventListener();
}

function addEditEventListener() {
    const editButtons = document.querySelectorAll('.edit-project-item');

    editButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const todoItemContainer = button.closest('li');
            const projectID = todoItemContainer.dataset.projectid;
            const itemID = todoItemContainer.dataset.itemid;

            const itemObj = todo.projects[projectID].items[itemID];
            showItemDialog(itemObj);
        })
    })
}

function addDeleteEventListener() {
    const deleteButtons = document.querySelectorAll('.delete-project-item');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const todoItemContainer = button.closest('li');
            const projectID = todoItemContainer.dataset.projectid;
            const itemID = todoItemContainer.dataset.itemid;

            const project = todo.projects[projectID];
            project.removeItem(itemID);
            displayProject(todo, projectID);
            addTaskEventListeners();
        })
    })
}

function addInfoEventListener() {
    const infoButtons = document.querySelectorAll('.info-project-item');

    infoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const todoItemContainer = button.closest('li');
            const projectID = todoItemContainer.dataset.projectid;
            const itemID = todoItemContainer.dataset.itemid;

            const itemObj = todo.projects[projectID].items[itemID];
            const item = document.querySelector(`[data-itemid='${itemID}']`);
            const itemDesc = item.nextElementSibling;

            itemDesc.innerText = itemObj.description;
            button.disabled = true;
        })
    })
}