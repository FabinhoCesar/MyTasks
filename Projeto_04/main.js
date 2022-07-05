// OPEN MODAL =================================================
const newTransation = document.querySelector(".button.new");
const modal = document.querySelector(".modal-overlay");
const btnCancel = document.querySelector(".button.cancel");

newTransation.addEventListener('click', () => {
    modal.classList.add('active');
});

btnCancel.addEventListener('click', () => {
    modal.classList.remove('active');
});

function closeModal() {
    modal.classList.remove('active');
}

// Usar a memoria do navegador para armazenar os dados
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

// FUNCIONALIDADES PARA AS TRANSAÇÕES ========================

const Transaction = { // Objeto que vai receber as funcionalidades
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() { // Somar as entradas
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income
    },

    expenses() { // Somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },

    total() { // Entradas menos as saídas 
        let total = Transaction.incomes() + Transaction.expenses()
        return total
    }
}

// Manipular o HTML pelo js cria elementos html por aqui =================

const DOM = {

    transactionContainer: document.querySelector('#data-table tbody'), // pegar o elemento tbody para add o html dentro dele

    addTransaction(transaction, index) {
        const tr = document.createElement('tr'); //Criando um elemento no HTML
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index) // Colocando o html dentro da tr
        tr.dataset.index = index
        DOM.transactionContainer.appendChild(tr) //tbody recebendo o tr com os dados da função abaixo
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)

        const html =
            ` 
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img onclick='Transaction.remove(${index})' src="./assets/minus.svg" alt="">
                </td>
            `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = ''
    }

}

// Responsavel por formatar os valores =======================

const Utils = {

    formatAmount(value) {
        value = Number(value) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100;

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value
    }
}

// Capturando os dados inseridos pelo usuários no form
const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    formatValues() {
        let description = this.description.value
        let amount = this.amount.value
        amount = Utils.formatAmount(amount)
        let date = this.date.value
        date = Utils.formatDate(date)
        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearModal() {
        this.description.value = "",
            this.amount.value = "",
            this.date.value = ""
    },

    submit(event) {
        event.preventDefault()
        const transaction = Form.formatValues()
        Form.saveTransaction(transaction)
        Form.clearModal()
        closeModal()
    }
}

// Fazer a aplicação fazer a leitura novamente de tudo

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}


App.init()

