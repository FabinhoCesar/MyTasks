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
    <input onclick="whichId(event)" type="checkbox" name="task${counter}" id="task${counter}">
    <label for="task${counter}">${newTask.value}</label>
    `
    counter++
    return html
}

// Criar um elemento na DOM para inserir o html

function createElement() {
    const element = document.createElement('div')
    element.classList.add('task')
    return element
}

// Inserir o html dentro da DIV criada e colocar no display

function addTasks() {
    const element = createElement()
    element.innerHTML = addHtml()
    boxTasksIncomplete.appendChild(element)
}

// Pegar as divs para após adicionar a classe quando forem clicadas

function attTasksIncomplete() {
    const allTasksIncomplete = document.querySelectorAll('.tasksIncomplete .task')
    console.log(allTasksIncomplete)
    return allTasksIncomplete
}

function attTasksCompleted() {
    const allTasksCompleted = document.querySelectorAll('.tasksCompleted .task')
    return allTasksCompleted
}

// Coletar qual é o id da tarefa clicada
let id

function whichId(event) {
    const el = event.target
    id = el.id
    id = id.replace('task', '')
    console.log(id)
    addOrRemoveClass()
}

// Pegar todos os inputs

function inputsIncomplete() {
    let inputsIncomplete = document.querySelectorAll('.tasksIncomplete input')
    inputsIncomplete = Array.from(inputsIncomplete)
    console.log('Inputs incompletos', inputsIncomplete)
    return inputsIncomplete
}

function inputsComplete() {
    let inputsComplete = document.querySelectorAll('.tasksCompleted input')
    console.log('Inputs completos', inputsComplete)
    return inputsComplete
}

// Função para descobrir o index dos inputs para executar as funções de add e remove class

function searchIndexTaskIncomplete() {
    let Incomplete = inputsIncomplete()
    console.log(Incomplete.indexOf(`inputtask${id}`))
    return Incomplete.indexOf(`#task${id}`)
}

function searchIndexTaskComplete() {
    const inputsComplete = inputsComplete()

}

// Adicionar classe .completed nos inputs que foram clicados

function addClass() {
    console.log('id dentro de addClass', id)
    const allTasksIncomplete = attTasksIncomplete()

    allTasksIncomplete[id].classList.add('completed')

    attDisplayCompleted()
}

// Remover classe .completed nos inptus que foram criados

function removeClass() {
    console.log('id dentro de removeClass', id)

    const allTasksCompleted = attTasksCompleted()

    allTasksCompleted[id].classList.remove('completed')

    attDisplayIncomplete()
}

// Função que vai decidir se vai remover ou adicionar a classe

function addOrRemoveClass() {
    const allTasksIncomplete = attTasksCompleted()
    const allTasksCompleted = attTasksIncomplete()

    console.log('id dentro de addremoveClass', id)


        if (allTasksCompleted) {
            addClass()
        
        } else
        if (allTasksIncomplete) {
            removeClass()
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

searchIndexTaskIncomplete()
