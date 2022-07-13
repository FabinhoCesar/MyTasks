// Nome do ID
let nameID = ""

// Caixas das tarefas

const boxTasksIncomplete = document.querySelector('.tasksIncomplete')
const boxTasksComplete = document.querySelector('.tasksCompleted')
const boxTrash = document.querySelector('.trash')

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
            <div onclick="removeTask(this.id)" id="dask${counter}">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 26 26"
                    style=" fill:#556479;">
                    <path
                        d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z">
                    </path>
                </svg>
            </div>`
    counter++
    return html
}

// Criar um elemento na DOM para inserir o html

function createDivTask() {
    const element = document.createElement('div')
    element.classList.add('task')
    element.id = `tasx${counter}`
    return element
}

// Inserir o html dentro da DIV criada e colocar no display

function addTasks() {
    const element = createDivTask()
    element.innerHTML = addHtml()
    boxTasksIncomplete.appendChild(element)
    boxTasksIncomplete.insertBefore(element, boxTasksIncomplete.children[0])
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
        }
    }
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
    if (trashTask) {
        boxTrash.appendChild(trashTask)
    }
}

function removeTask(nameId) {
    nameId = nameId.replace('d', 't')
    let allTask = document.querySelectorAll('.task')
    allTask = Array.from(allTask)
    for (let task of allTask) {
        let change = task.id
        change = change.replace('x', 'k')
        if (change == nameId) {
            task.classList.toggle('remove')
            attDisplayTrash()
        }
    }

}

// =============== Tentar fazer local storage