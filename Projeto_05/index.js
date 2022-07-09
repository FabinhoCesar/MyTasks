const btnNewTask = document.querySelector('button')
const modal = document.querySelector('.modal-overlay')
const btnAdd = document.getElementById('add')
const btnCancel = document.getElementById('cancel')

btnCancel.addEventListener('click', closeModal)
btnNewTask.addEventListener('click', openModal)
btnAdd.addEventListener('click', closeModal)

function openModal() {
    modal.classList.add('active')
}

function closeModal() {
    modal.classList.remove('active')
}

let contador = 0

function addClass() {
    let inputCheck = document.querySelectorAll('input')
    console.log(inputCheck)
    let task = document.querySelectorAll('.task')
    console.log(task)

    for (let i = 0; i < task.length; i++) {
        inputCheck[i].addEventListener('click', () => {
            task[i].classList.toggle('completed')
            attDisplay()
        })
    }
}

function newTasks(event) {
    event.preventDefault()
    colocarInfo()
    addClass()
    contador++
}




function colocarInfo() {
    const newTask = document.querySelector('#addTask')
    console.log(newTask.value)

    const html = `
        <input type="checkbox" name="${contador}" id="task${contador}">
        <label for="task${contador}">${newTask.value}</label>
    `

    const element = document.createElement('div')
    element.classList.add('task')
    element.innerHTML = html
    console.log(element)

    newTask.value = ''

    const tasksIncomplete = document.querySelector('.tasksIncomplete')

    tasksIncomplete.appendChild(element)

    
}
 

function attDisplay() {

    const taskIncomplete = document.querySelector('.completed')

    const tasksCompleted = document.querySelector('.tasksCompleted')

    tasksCompleted.appendChild(taskIncomplete)

    const taskCompleted = document.querySelector('.tasksCompleted .task:not(.completed)')
    console.log(taskCompleted)
    const tasksIncomplete = document.querySelector('.tasksIncomplete')

    tasksIncomplete.appendChild(taskCompleted)

}

