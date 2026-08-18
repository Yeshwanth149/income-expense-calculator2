let transactions = [];

function addTransaction() {

    let description = document.getElementById("description").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    let transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
    calculateTotals();
}


function displayTransactions() {

    let list = document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.type}</td>
            <td>₹${transaction.amount}</td>
            <td>
                <button class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </td>
        `;

        list.appendChild(row);
    });
}


function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    displayTransactions();
    calculateTotals();
}


function calculateTotals() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } 
        else {
            totalExpense += transaction.amount;
        }

    });

    let balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").innerText =
        "₹" + totalIncome;

    document.getElementById("totalExpense").innerText =
        "₹" + totalExpense;

    document.getElementById("balance").innerText =
        "₹" + balance;
}