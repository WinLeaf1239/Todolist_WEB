let tasks = []

let input_task = document.getElementById('input_work');
let button_add_task = document.getElementById('add_work');

let commonDiv = document.getElementById('Only_Tasks');

let currentContentMode = null;//
let currentEditMode = null;//



function createTask(){

    let task = {
        id: Math.random(),
        text: input_task.value,
        completed: false
    }

    tasks.push(task)

    let taskDiv = document.createElement('div'); // основной див
    commonDiv.append(taskDiv);

    let contentMode = document.createElement('div'); //див положительного варианта(статики)
    taskDiv.append(contentMode);

    let taskText = document.createElement('p');
    taskText.innerText = task.text;

    createCheckbox(contentMode, taskText, task);

    contentMode.append(taskText);



    createDeleteButton(contentMode, taskDiv, task.id)
    createEditButton(contentMode, taskDiv, task, taskText);
}

function createCheckbox(contentMode, taskText, task){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    contentMode.append(checkbox);

    checkbox.addEventListener('change', function(){
        task.completed = checkbox.checked;
        taskText.classList.toggle('zach');
    });
}


function addTaskText(){
    if (currentEditMode) {
        cancelEditMode(currentContentMode, currentEditMode);
    }

    createTask();
    input_task.value = '';

}

function createDeleteButton(contentMode, task, id){
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    contentMode.append(deleteButton)

    deleteButton.addEventListener('click', function(){
        deleteTask(task, id)
    })
}

function deleteTask(task, id){
    task.remove();
    tasks = tasks.filter(task => task.id !== id)
}

function createEditButton(contentMode, taskDiv, task, taskText){
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    contentMode.append(editButton)

    editButton.addEventListener('click' , function(){
        if (currentEditMode) {
            cancelEditMode(currentContentMode, currentEditMode);
        }
        
        contentMode.style.display = 'none';
        createEditWindow(taskDiv, task, contentMode, taskText);
    })
}

function createEditWindow(taskDiv, task, contentMode, taskText){
    let editMode = document.createElement('div');
    taskDiv.append(editMode);

    currentContentMode = contentMode;
    currentEditMode = editMode;

    let editInput = document.createElement('input');
    editInput.value = task.text;
    editMode.append(editInput);

    createSaveButton(editMode, contentMode, editInput, task, taskText);
    createCancelButton(editMode, contentMode);


}


function createSaveButton(editMode, contentMode, editInput, task, taskText){
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    editMode.append(saveButton)

    saveButton.addEventListener('click', function () {
        task.text = editInput.value;
        taskText.innerText = editInput.value;
        cancelEditMode(contentMode, editMode);
    });
}

function createCancelButton(editMode, contentMode){
    let cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    editMode.append(cancelButton)

    cancelButton.addEventListener('click' , function(){
        cancelEditMode(contentMode, editMode)
        
    })
}

function cancelEditMode(contentMode, editMode){
    contentMode.style.display = 'block';
    editMode.remove();

    currentContentMode = null;
    currentEditMode = null;

}


button_add_task.addEventListener('click' , addTaskText);
