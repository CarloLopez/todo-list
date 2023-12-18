'use strict';

import 'normalize.css';
import './style.css';
import {TodoList} from './models.js';
import {
    showItemDialog, 
    showProjectDialog, 
    displaySidebar, 
    displayProject, 
    displayAgenda, 
} from './dom.js';

const todo = new TodoList();

const agendaButtonAll = document.querySelector('#all');
agendaButtonAll.addEventListener('click', () => {
    setAgendaEventListener();
});

const agendaButtonToday = document.querySelector('#incomplete');
agendaButtonToday.addEventListener('click', () => {
    setAgendaEventListener('incomplete');
});

const agendaButtonUpcoming = document.querySelector('#completed');
agendaButtonUpcoming.addEventListener('click', () => {
    setAgendaEventListener('completed');
});

function setAgendaEventListener(filter=null) {
    const page = document.querySelector('section');
    page.setAttribute('data-page', 'agenda');

    if (filter) {
        page.setAttribute('data-filter', filter);
        displayAgenda(todo, filter);
    } else {
        page.removeAttribute('data-filter');
        displayAgenda(todo);
    }
    
    addTaskEventListeners();
}

const newProjectButton = document.querySelector('.new-project');
newProjectButton.addEventListener('click', () => {
    showProjectDialog();
})

const addProjectItem = document.querySelector('.add-project-item');
addProjectItem.addEventListener('click', () => {
    showItemDialog();
})

// add new project or project item based on data attribute of form
const dialogForm = document.querySelector('.dialog-form');
dialogForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formInputs = document.querySelector('.form-inputs');
    const formType = formInputs.dataset.type;

    if (formType === 'project') {
        let projName = document.querySelector('#projName').value.toUpperCase();
        todo.addProject(projName);

        refreshSidebar();

        const dialog = document.querySelector('dialog');
        dialog.close();
    } 
    else if (formType === 'projectItem') {
        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value;
        const date = document.querySelector('#date').value;

        const page = document.querySelector('section');
        const pageType = page.dataset.page;

        let projectID;
        if (pageType === 'project') {
            const addItemButton = document.querySelector('.add-project-item');
            projectID = addItemButton.dataset.projectid;
        } else {
            const projectName = document.querySelector('#project').value;

            for (let project of Object.values(todo.projects)) {
                if (project.title.toLowerCase() === projectName.toLowerCase()) {
                    projectID = project.id;
                    break;
                }
            }

            if (!projectID) {
                projectID = todo.addProject(projectName);
                refreshSidebar();
            }
        }
        const project = todo.projects[projectID];
        project.addItem(title, desc, date);
        
        const dialog = document.querySelector('dialog');
        dialog.close();

        refreshTasks(projectID);
    } 
    else if (formType === 'itemEdit') {
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

        refreshTasks(projectID);
    }
})

function addProjectButtonListeners() {
    // when project button is clicked, display all items related to project
    const projButtons = document.querySelectorAll('.project-button');
    const projArray = Array.from(projButtons);

    projArray.forEach((projectButton) => {
        projectButton.addEventListener('click', () => {
            displayProject(todo, projectButton.dataset.projectid);

            // set data-attribute to page type in section as identifier
            const page = document.querySelector('section');
            page.setAttribute('data-page', 'project');
            page.setAttribute('data-projectid', projectButton.dataset.projectid);

            addTaskEventListeners();
        })
    })
}

function addDeleteProjectListeners() {
    const deleteButton = document.querySelectorAll('.delete-project');

    deleteButton.forEach((button) => {
        button.addEventListener('click', () => {
            const projectID = button.dataset.projectid;
            todo.deleteProject(projectID);

            refreshSidebar();

            const page = document.querySelector('section');
            const pageType = page.dataset.page;
            const pageProjectID = page.dataset.projectid;
    
            if (pageType === 'project' && pageProjectID !== projectID) {
                displayProject(todo, projectID);
            } else {
                displayAgenda(todo);
            }
            addTaskEventListeners();
        })
    })
}

function addTaskEventListeners() {
    addEditEventListener();
    addDeleteEventListener();
    addInfoEventListener();
    addCheckboxListener();
}

function addEditEventListener() {
    const editButtons = document.querySelectorAll('.edit-project-item');
    const page = document.querySelector('section');
    const pageType = page.dataset.page;

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

            refreshTasks(projectID);
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

function addCheckboxListener() {
    const checkBoxButtons = document.querySelectorAll('.checkbox');

    checkBoxButtons.forEach((button) => {
        if (!button.clicked) {
            button.addEventListener('click', () => {
                const todoItemContainer = button.closest('li');
                const projectID = todoItemContainer.dataset.projectid;
                const itemID = todoItemContainer.dataset.itemid;

                const itemObj = todo.projects[projectID].items[itemID];
                itemObj.completed = true;

                refreshTasks(projectID);
            })
        }
    })
}

function refreshSidebar() {
    displaySidebar(todo);
    addProjectButtonListeners();
    addDeleteProjectListeners();
}

function refreshTasks(projectID=null) {
    const page = document.querySelector('section');
    const pageType = page.dataset.page;
    const filter = page.dataset.filter;

    if (pageType === 'project') {
        displayProject(todo, projectID);
    } else {
        displayAgenda(todo, filter);
    }
    addTaskEventListeners();
}

const page = document.querySelector('section');
page.setAttribute('data-page', 'agenda');
displayAgenda(todo);