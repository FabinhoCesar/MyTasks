// Caixas das tarefas

const boxTasksIncomplete = document.querySelector('.tasksIncomplete')
const boxTasksComplete = document.querySelector('.tasksCompleted')
const boxTrash = document.querySelector('.trash')

// Pegar o dado inserido pelo usuario

const newTask = document.getElementById('addTask')


// Criar um contador para colocar no id dos inputs

let counter = 0

let array = []

const tasks = JSON.parse(localStorage.getItem("Tasks")) || []

array = tasks

if (tasks != '') {
    for (let task of tasks) {
        addTasks(task.id, task.task, task.class, task.trash)
    }
}

function save(array) {
    localStorage.setItem("Tasks", JSON.stringify(array))
}


// Nome do ID
let nameID = ""


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
    arrayTasks(newTask, counter)
    addTasks(counter, newTask.value)
    closeModal()
    clearInput()
}

// Criar uma função que vai pegar o valor inserido add um id

function arrayTasks(newTask, counter) {
    let task = {
        id: counter,
        task: newTask.value,
        class: '',
    }
    array.push(task)
    save(array)
}

// Criar função para limpar a tarefa inserida pelo usuário

function clearInput() {
    newTask.value = ' '
}

// Criar o html para inserir a tarefa do usuario

function addHtml(id, task) {
    const html = `
        <input type="checkbox" name="task${id}" id="task${id}" onclick="searchIndexTasks(this.id)">
        <label for="task${id}">${task}</label>`
    counter++
    return html
}

// Criar um elemento na DOM para inserir o html

function createDivTask(id, classe) {
    const element = document.createElement('div')
    element.classList.add('task')
    if (classe != '') {
        element.classList.add(classe)
    }
    element.id = `tasx${id}`
    return element
}

// Inserir o html dentro da DIV criada e colocar no display

function addTasks(id, task, classe) {
    const element = createDivTask(id, classe)
    element.innerHTML = addHtml(id, task)
    boxTasksIncomplete.appendChild(element)
    boxTasksIncomplete.insertBefore(element, boxTasksIncomplete.children[0])
    attDisplayIncomplete()
    attDisplayCompleted()
}

// Função para descobrir o index dos inputs para executar as funções de add e remove class
function searchIndexTasks(nameId) {
    nameID = nameId
    let allTask = document.querySelectorAll('.task')
    allTask = Array.from(allTask)
    for (let task of allTask) {
        let change = task.id
        change = change.replace('x', 'k')
        if (change == nameId) {
            task.classList.toggle('completed')
            attDisplayCompleted()
            attDisplayIncomplete()
            addClassLocalstorage(nameId)
        }
    }
}

function addClassLocalstorage(nameId) {
    nameId = nameId.replace("task", "")
    console.log(nameId)
    if (tasks[nameId].class == '') {
        tasks[nameId].class = 'completed'
    } else {
        tasks[nameId].class = ''
    }
    
    console.log(tasks[nameId].class)
    save(tasks)
}


// Atualizar o display quando a tarefa for completada (mover a tarefa da box imcompleta para a completa)

function attDisplayCompleted() {
    const taskIncomplete = document.querySelector('.tasksIncomplete .completed')
    if (taskIncomplete) {
        boxTasksComplete.appendChild(taskIncomplete)
        boxTasksComplete.insertBefore(taskIncomplete, boxTasksComplete.children[1])
    }
}

// Atualizar o display quando desmarcar a tarefa como concluida

function attDisplayIncomplete() {
    const taskCompleted = document.querySelector('.tasksCompleted .task:not(.completed)')
    if (taskCompleted) {
        boxTasksIncomplete.appendChild(taskCompleted)
        boxTasksIncomplete.insertBefore(taskCompleted, boxTasksIncomplete.children[0])
    }
}

// Atualizar o display quando clicar na lixeira

function attDisplayTrash() {
    const trashTask  = document.querySelector('.remove')
    console.log(trashTask, 'com a classe reomve')
    if (trashTask) {
        boxTrash.appendChild(trashTask)
    }
    save(tasks)
}
