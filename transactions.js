// Sample transaction data, replace this with your actual data management logic
let transactions = [];

function loadTransactions() {
    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = ''; // Clear existing items

    transactions.forEach((transaction, index) => {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type}`;
        item.innerHTML = `
            <span>${transaction.date}: ${transaction.description} - $${transaction.amount.toFixed(2)}</span>
        `;
        transactionsList.appendChild(item);
    });
}

// Call this function when adding a new transaction to update the display
function addTransaction(transaction) {
    transactions.push(transaction); // Add to the array
    loadTransactions(); // Refresh the list
}
