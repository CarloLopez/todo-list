function refreshSidebar(todo) {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    for (const projectID in todo.projects) {
        const button = document.createElement('button');
        button.innerText = todo.projects[projectID].title;

        // when project button is clicked, display all items related to project
        button.addEventListener('click', () => {
            displayProject(todo, projectID);
        });

        sidebarProjects.appendChild(button);
    }
}

function displayProject(todo, projectID) {
    const project = todo.projects[projectID];
    const sortedItems = sortItems(project.items);

    displayProjectHeader(project);
    displayProjectItems(sortedItems);

    // display Items
}

function displayProjectHeader(project) {
    const projectTitle = document.querySelector('.main-container-title');
    projectTitle.innerText = project.title;

    const addItemButton = document.querySelector('.add-project-item');
    addItemButton.setAttribute('data-projectID', project.id);
}

function sortItems(obj) {
    const dataArray = Object.entries(obj);
    dataArray.sort((a, b) => a[1].priority - b[1].priority);
    return dataArray;
}

function displayProjectItems(items) {
    // TODO
}

function showItemDialog() {
    const formInputs = document.querySelector('.form-inputs');
    formInputs.setAttribute('data-type', 'projectItem');
    formInputs.innerHTML = '';

    const title = createInput('title', 'text', 'Title');
    const description = createInput('desc', 'text', 'Description');
    const date = createInput('date', 'date', 'Date');

    formInputs.appendChild(title);
    formInputs.appendChild(description);
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

function createInput(id, type, text=null) {
    let label;
    label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = text;

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', id);
    input.id = id;

    const inputContainer = document.createElement('div');
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
}

export {showItemDialog, showProjectDialog, refreshSidebar, displayProject};