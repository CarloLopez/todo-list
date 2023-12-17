function refreshSidebar(todo) {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    sidebarProjects.innerHTML = '';

    for (const projectID in todo.projects) {
        const button = document.createElement('button');
        const project = todo.projects[projectID];
        button.innerText = project.title;
        button.classList.add('project-button');
        button.setAttribute('data-projectID', project.id);

        sidebarProjects.appendChild(button);
    }
}

function displayProject(todo, projectID) {
    const project = todo.projects[projectID];
    const sortedItems = sortItems(project.items);

    displayProjectHeader(project);
    displayProjectItems(project, sortedItems);

}

function sortItems(obj) {
    const dataArray = Object.entries(obj);
    dataArray.sort((a, b) => a[1].priority - b[1].priority);
    return dataArray;
}

function displayProjectHeader(project) {
    const projectTitle = document.querySelector('.main-container-title');
    projectTitle.innerText = project.title;

    const addItemButton = document.querySelector('.add-project-item');
    addItemButton.setAttribute('data-projectID', project.id);
}

function displayProjectItems(project, items) {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';

    for (let item of items) {
        const task = item[1];
        const taskContainer = document.createElement('li');
        taskContainer.classList.add('project-item-base');
        taskContainer.setAttribute('data-itemID', task.id);
        taskContainer.setAttribute('data-projectID', project.id);

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');

        const actions = document.createElement('div');
        actions.appendChild(createButton('edit', 'edit-project-item'));
        actions.appendChild(createButton('delete', 'delete-project-item'));
        actions.appendChild(createButton('info', 'info-project-item'));

        taskContainer.appendChild(checkBox);
        taskContainer.appendChild(createDiv(task.title, 'task-title'));
        taskContainer.appendChild(actions);

        const extendedTask = document.createElement('div');
        extendedTask.classList.add('project-item');

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('project-item-desc');
        
        extendedTask.appendChild(taskContainer);
        extendedTask.appendChild(descriptionContainer);

        mainContainer.appendChild(extendedTask);
    }
}

function showItemDialog(itemObj=null) {
    const formInputs = document.querySelector('.form-inputs');
    formInputs.innerHTML = '';

    let title;
    let desc;
    let date;

    if (itemObj) {
        title = createInput('title', 'text', 'Title', itemObj.title);
        desc = createInput('desc', 'text', 'Description', itemObj.description);
        date = createInput('date', 'date', 'Date', itemObj.dueDate);

        formInputs.setAttribute('data-type', 'itemEdit');
        formInputs.setAttribute('data-projectID', itemObj.projectid);
        formInputs.setAttribute('data-itemID', itemObj.id);
    } else {
        title = createInput('title', 'text', 'Title');
        desc = createInput('desc', 'text', 'Description');
        date = createInput('date', 'date', 'Date');

        formInputs.setAttribute('data-type', 'projectItem');
    }

    formInputs.appendChild(title);
    formInputs.appendChild(desc);
    formInputs.appendChild(date);

    const dialog = document.querySelector('dialog');
    dialog.showModal();
}

// display a dialog to add a new project
function showProjectDialog() {
    const formInputs = document.querySelector('.form-inputs');
    formInputs.setAttribute('data-type', 'project');
    formInputs.innerHTML = '';

    const projectName = createInput('projName', 'text', 'Project Name');

    formInputs.appendChild(projectName);

    const dialog = document.querySelector('dialog');
    dialog.showModal();
}

function createInput(id, type, text, val=null) {
    let label;
    label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = text;

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', id);
    input.id = id;
    if (val) {
        input.value = val;
    }

    const inputContainer = document.createElement('div');
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
}

function createDiv(innerText, classString) {
    const divContainer = document.createElement('div');
    divContainer.innerText = innerText;
    divContainer.classList.add(classString);
    return divContainer;
}

function createButton(innerText, classString) {
    const button = document.createElement('button');
    button.innerText = innerText;
    button.classList.add(classString);
    return button;
}

export {showItemDialog, showProjectDialog, refreshSidebar, displayProject};