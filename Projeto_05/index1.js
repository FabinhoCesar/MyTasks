// Caixas das tarefas

const boxTasksIncomplete = document.querySelector('.tasksIncomplete')
const boxTasksComplete = document.querySelector('.tasksCompleted')

// Abrir o modal para adicionar a tarefa

const btnNewTask = document.getElementById('btnNewTask')
const modal = document.querySelector('.modal-overlay')


btnNewTask.addEventListener('click', () => {
    modal.classList.add('active')
})

// Fechar o modal quando clicar no cancel

const btnAdd = document.getElementById('add')
const btnCancel = document.getElementById('cancel')

function closeModal() {
    modal.classList.remove('active')
    clearInput()
}

btnCancel.addEventListener('click', closeModal)

// Pegar a tarefa inserida pelo usuário

function newTasks(event) {
    event.preventDefault()
    addTasks()
    closeModal()
    clearInput()
}

const newTask = document.getElementById('addTask')

// Criar função para limpar a tarefa inserida pelo usuário

function clearInput() {
    newTask.value = ' '
}

// Criar um contador para colocar no id dos inputs

let counter = 0

// Criar o html para inserir a tarefa do usuario

function addHtml() {
    const html = `
    <input type="checkbox" name="task${counter}" id="task${counter}" onclick="searchIndexTasks(this.id)">
    <label for="task${counter}">${newTask.value}</label>
    `
    counter++
    return html
}

// Criar um elemento na DOM para inserir o html

function createDivTask() {
    const element = document.createElement('div')
    element.classList.add('task')
    element.id = `task${counter}`
    return element
}

// Inserir o html dentro da DIV criada e colocar no display

function addTasks() {
    const element = createDivTask()
    element.innerHTML = addHtml()
    boxTasksIncomplete.appendChild(element)
}

 // Função para descobrir o index dos inputs para executar as funções de add e remove class
 function searchIndexTasks(nameId) {
    let allTask = document.querySelectorAll('.task')
    allTask = Array.from(allTask)
     console.log(nameId)
     console.log(allTask)
    for (let task of allTask) {
        if (task.id == nameId) {
            task.classList.toggle('completed')
            console.log(task.id)
            attDisplayCompleted()
            attDisplayIncomplete()
        }
    }
}


// Atualizar o display quando a tarefa for completada (mover a tarefa da box imcompleta para a completa)

function attDisplayCompleted() {
    const taskIncomplete = document.querySelector('.tasksIncomplete .completed')
    if (taskIncomplete) {
        boxTasksComplete.appendChild(taskIncomplete)
    }
}

// Atualizar o display quando desmarcar a tarefa como concluida

function attDisplayIncomplete() {
    const taskCompleted = document.querySelector('.tasksCompleted .task:not(.completed)')
    if (taskCompleted) {
        boxTasksIncomplete.appendChild(taskCompleted)
    }
}
