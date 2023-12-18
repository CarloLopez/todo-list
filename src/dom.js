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

    const items = Object.values(project.items);
    items.sort((a, b) => a.priority - b.priority);

    displayHeader(project);
    displayProjectItems(items);
}

function displayAgenda(todo, filter=null) {
    const items = [];
    
    const allProjects = todo.projects;
    for (let projectID in allProjects) {
        let project = allProjects[projectID];
        for (let itemID in project.items) {
            let item = project.items[itemID];
            if (filter) {
                if (filter === 'incomplete') {
                    if (!item.completed) {
                        items.push(item);
                    }
                } else {
                    if (item.completed) {
                        items.push(item);
                    }
                }
            } else {
                items.push(item);
            }
        }
    }

    displayHeader();
    displayProjectItems(items);
}

function displayHeader(project=null) {
    const title = document.querySelector('.main-container-title');
    const addItemButton = document.querySelector('.add-project-item');
    if (project) {
        title.innerText = project.title;
        addItemButton.setAttribute('data-projectID', project.id);
    } else {
        const page = document.querySelector('section');
        const filter = page.dataset.filter;

        if (filter) {
            title.innerText = filter.charAt(0).toUpperCase() + filter.slice(1);
        } else {
            title.innerText = 'All Tasks';
        }
    }
}

function displayProjectItems(items) {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';

    for (let task of items) {
        const extendedTask = document.createElement('div');
        extendedTask.classList.add('project-item');

        const taskContainer = document.createElement('li');
        taskContainer.classList.add('project-item-base');
        taskContainer.setAttribute('data-itemID', task.id);
        taskContainer.setAttribute('data-projectID', task.projectid);

        const checkBox = document.createElement('input');
        checkBox.classList.add('checkbox');
        checkBox.setAttribute('type', 'checkbox');
        if (task.completed) {
            checkBox.checked = true;
            checkBox.disabled = true;
        }

        const actions = document.createElement('div');
        actions.appendChild(createButton('edit', 'edit-project-item'));
        actions.appendChild(createButton('delete', 'delete-project-item'));
        actions.appendChild(createButton('info', 'info-project-item'));

        taskContainer.appendChild(checkBox);
        taskContainer.appendChild(createDiv(task.title, 'task-title'));
        taskContainer.appendChild(actions);

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

    const page = document.querySelector('section');
    const pageType = page.dataset.page;

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

        if (pageType === 'agenda') {
            const project = createInput('project', 'text', 'Project Name');
            formInputs.appendChild(project);
        }

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

export {showItemDialog, showProjectDialog, refreshSidebar, displayProject, displayAgenda};