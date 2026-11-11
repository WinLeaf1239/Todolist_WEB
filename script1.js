
let tasks = []

let input_task = document.getElementById('input_work');
let button_add_task = document.getElementById('add_work');

let commonDiv = document.getElementById('Only_Tasks');

let currentContentMode = null;//
let currentEditMode = null;//



function createTask(){

    let task = {
        id: Math.random(),
        text: input_task.value
    }

    tasks.push(task)

    let taskDiv = document.createElement('div'); // основной див
    commonDiv.append(taskDiv);

    let contentMode = document.createElement('div'); //див положительного варианта(статики)
    taskDiv.append(contentMode);

    let taskText = document.createElement('p');
    taskText.innerText = task.text;
    contentMode.append(taskText);



    createDeleteButton(contentMode, taskDiv, task.id)
    createEditButton(contentMode, taskDiv,task)
}

function addTaskText(){
    if (currentEditMode) {//
        cancelEditMode(currentContentMode, currentEditMode);//
    }//

    createTask();
    input_task.value = '';

}

function createDeleteButton(contentMode, task, id){
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    contentMode.append(deleteButton)

    deleteButton.addEventListener('click', function(){ //не можем готовую функцию с параметром сюда передать
        deleteTask(task, id)
    })
}

function deleteTask(task, id){
    task.remove();
    tasks = tasks.filter(task => task.id !== id)
}

function createEditButton(contentMode, taskDiv, task){
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    contentMode.append(editButton)

    editButton.addEventListener('click' , function(){
        if (currentEditMode) {
            cancelEditMode(currentContentMode, currentEditMode);
        }
        
        contentMode.style.display = 'none';
        createEditWindow(taskDiv, task, contentMode)
    })
}

function createEditWindow(taskDiv, task, contentMode){
    let editMode = document.createElement('div');
    taskDiv.append(editMode);

    currentContentMode = contentMode;//
    currentEditMode = editMode;//

    let editInput = document.createElement('input');
    editInput.value = task.text;
    editMode.append(editInput);

    createSaveButton(editMode);
    createCancelButton(editMode, contentMode);


}


function createSaveButton(editMode){
    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    editMode.append(saveButton)
}

function createCancelButton(editMode, contentMode){
    let cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    editMode.append(cancelButton)

    cancelButton.addEventListener('click' , function(){
        cancelEditMode(contentMode, editMode)
        
    })
    // cancelEditMode(contentMode, editMode)
}

function cancelEditMode(contentMode, editMode){
    contentMode.style.display = 'block';
    editMode.remove();

    currentContentMode = null;//
    currentEditMode = null;//



}

button_add_task.addEventListener('click' , addTaskText);
