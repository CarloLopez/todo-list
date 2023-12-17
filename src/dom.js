function refreshSidebar(todo) {
    const sidebarProjects = document.querySelector('.sidebar-projects');
    for (const projectID in todo.projects) {
        const button = document.createElement('button');
        button.innerText = todo.projects[projectID].title;

        // when project button is clicked, display all items related to project
        button.addEventListener('click', () => {
            displayProjectItems(projectID);
        });

        sidebarProjects.appendChild(button);
    }
}

function displayProjectItems(projectID) {
    //TODO
}

// display a dialog to add a new project
function showProjectDialog() {
    const dialogForm = document.querySelector('.dialog-form');
    dialogForm.innerHTML = '';
    
    const projectName = createInput('projName', 'text', 'Project Name');
    const submitButton = createSubmitButton('project', dialogForm);

    dialogForm.appendChild(projectName);
    dialogForm.appendChild(submitButton);

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

function createSubmitButton(type, form) {
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Add');
    submitButton.id = 'submitButton';

    return submitButton;
}

export {showProjectDialog, refreshSidebar};