// script.js
let transactions = [];

document.getElementById('transaction-form').addEventListener('submit', function (f) {
    f.preventDefault();
    addTransaction();
    calculateTotal();
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
});

document.getElementById('transaction-table').addEventListener('click', function (f) {
    if (f.target.className === 'delete-btn') {
        deleteTransaction(e.target.parentElement.parentElement.id);
        calculateTotal();
    } else if (f.target.tagName === 'TD') {
        showFullDescription(f.target.parentElement.id);
    }
});

function addTransaction() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const transaction = {
        id: Date.now(),
        date: new Date(),
        amount: parseFloat(amount),
        category: category,
        description: description
    };
    transactions.push(transaction);
    addRow(transaction);
}

function addRow(transaction) {
    const table = document.getElementById('transaction-table');
    const row = table.insertRow(-1);
    row.id = transaction.id;
    row.className = transaction.amount >= 0 ? 'positive' : 'negative';
    row.insertCell(0).innerText = transaction.id;
    row.insertCell(1).innerText = transaction.date;
    row.insertCell(2).innerText = transaction.category;
    row.insertCell(3).innerText = transaction.description.split(' ').slice(0, 4).join(' ');
    const deleteCell = row.insertCell(4);
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Удалить';
    deleteCell.appendChild(deleteBtn);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== parseInt(id));
    const row = document.getElementById(id);
    row.parentElement.removeChild(row);
}

function calculateTotal() {
    const total = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    document.getElementById('total').innerText = 'Всего: ' + total;
}

function showFullDescription(id) {
    const transaction = transactions.find(transaction => transaction.id === parseInt(id));
    document.getElementById('total-description').innerText = transaction.description;
}