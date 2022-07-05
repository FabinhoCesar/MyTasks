const inputCheck = document.querySelectorAll('input')
const task = document.querySelectorAll('.task')

for (let i = 0; i < task.length; i ++) {
    inputCheck[i].addEventListener('click', () => {
        task[i].classList.toggle('completed')
        attDisplay()
        seila()
    })
}

let numberTaskIncomplete = document.querySelectorAll('.tasksIncomplete .task')
let numberTaskCompleted = document.querySelectorAll('.taskCompleted .task')

function attDisplay() {
    for (let i = 0; i < numberTaskIncomplete.length; i++) {
        const taskIncomplete = document.querySelector('.completed')
        
        const tasksCompleted = document.querySelector('.tasksCompleted')
        
        tasksCompleted.appendChild(taskIncomplete)
    
        numberTaskIncomplete = document.querySelectorAll('.tasksIncomplete .task')
    }
}


function seila() {
    for (let i = 0; i < numberTaskCompleted.length; i++) {
        const taskCompleted = document.querySelector('.tasksCompleted .task:not(.completed)')
        console.log(taskCompleted)
        const taskIncomplete = document.querySelector('.tasksIncomplete')
    
        taskIncomplete.appendChild(taskCompleted)
    
        numberTaskCompleted = document.querySelectorAll('.taskCompleted .task')
    }
}