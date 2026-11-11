let input_task = document.getElementById('input_work');
let button_add_task = document.getElementById('add_work');
let only_tasks = document.getElementsByClassName('Only_Tasks')[0]


function placeholder(){
    console.log(input_task.value);
    let task = document.createElement('div');
    task.classList.add('tasks')
    only_tasks.append(task)

    let checkboxik = document.createElement('input')
    checkboxik.type = 'checkbox'
    task.append(checkboxik)

    let inputik = document.createElement('p')
    inputik.textContent = input_task.value
    task.append(inputik)

    let butoni = document.createElement('button')
    butoni.textContent = 'edit'
    task.append(butoni)
    
    let crbutoni = document.createElement('button')
    crbutoni.textContent = 'del'
    task.append(crbutoni)


    checkboxik.addEventListener('click', function(){
        inputik.classList.toggle('zach')
    })


    butoni.addEventListener('click', function(){
        let newInput = document.createElement('input')
        inputik.replaceWith(newInput)
        checkboxik.remove()
        crbutoni.remove()
        butoni.textContent = 'save'

        butoni.addEventListener('click', function(){
            newInput.remove()
            butoni.text = 'edit'
            
        })
    })



    input_task.value = ''
}


button_add_task.addEventListener('click' , placeholder)
