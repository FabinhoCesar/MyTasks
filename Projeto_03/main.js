const mode = document.getElementById('mode');
mode.onclick = function() {
    mode.classList.toggle('active');
const body = document.querySelector('body');
    body.classList.toggle('active');
}


var display = document.getElementById("display"); //Pegar o valor do display
function output(value) {
    if (display.value == 0) {
        display.value = "";
    }
    display.value = display.value + value; // Adicionar a tecla no display
}

function clearDisplay() { // limpar a tela
    display.value = "0";
}

function moreLess() { // Botão multiplicar por menos um
    display.value = display.value * -1;
}

function deleteNum() {
  let displayNum = display.value;
    display.value = displayNum.substring(0,displayNum.length-1);
    if (displayNum.length == 1) {
        display.value = "0";
    }
}

function result() {
    displayHistory.value = display.value
    display.value = eval(display.value);
}

