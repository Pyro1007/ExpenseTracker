document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close');
    const transactionType = document.getElementById('transaction-type');
    const inputFields = document.getElementById('input-fields');
    const addTransactionButton = document.getElementById('add-transaction');

    addButton.addEventListener('click', function() {
        popup.style.display = 'block';
        inputFields.innerHTML = ''; // Clear previous input fields
        transactionType.value = ''; // Reset transaction type
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    transactionType.addEventListener('change', function() {
        const type = transactionType.value;
        inputFields.innerHTML = ''; // Clear previous input fields

        if (type === 'earning' || type === 'expense') {
            inputFields.innerHTML = `
                <label>Date: <input type="date" id="date"></label>
                <label>Amount: <input type="number" id="amount" min="0" step="0.01"></label>
                <label>Description: <input type="text" id="description"></label>
            `;
        } else if (type === 'bills') {
            inputFields.innerHTML = `
                <label>Due Date: <input type="date" id="due-date"></label>
                <label>Amount: <input type="number" id="bill-amount" min="0" step="0.01"></label>
                <label>Description: <input type="text" id="bill-description"></label>
            `;
        } else if (type === 'savings-goal') {
            inputFields.innerHTML = `
                <label>Goal Name: <input type="text" id="goal-name"></label>
                <label>Goal Amount: <input type="number" id="goal-amount" min="0" step="0.01"></label>
            `;
        } else if (type === 'savings') {
            inputFields.innerHTML = `
                <label>Amount: <input type="number" id="savings-amount" min="0" step="0.01"></label>
                <label>Select Goal: 
                    <select id="goal-select">
                        <option value="">--Select a Goal--</option>
                        <option value="Goal 1">Goal 1</option>
                        <option value="Goal 2">Goal 2</option>
                    </select>
                </label>
            `;
        }
    });

    addTransactionButton.addEventListener('click', function() {
        const type = transactionType.value;
        let date, amount, description, goalName;

        if (type === 'earning' || type === 'expense') {
            date = document.getElementById('date').value;
            amount = parseFloat(document.getElementById('amount').value);
            description = document.getElementById('description').value;
        } else if (type === 'bills') {
            date = document.getElementById('due-date').value;
            amount = parseFloat(document.getElementById('bill-amount').value);
            description = document.getElementById('bill-description').value;
        } else if (type === 'savings-goal') {
            goalName = document.getElementById('goal-name').value;
            amount = parseFloat(document.getElementById('goal-amount').value);
            description = goalName; // Use goal name as description for display
        } else if (type === 'savings') {
            amount = parseFloat(document.getElementById('savings-amount').value);
            description = document.getElementById('goal-select').value; // Selected goal
        }

        if ((description && amount) || (goalName && amount)) {
            addTransaction(type, date, amount, description);
            popup.style.display = 'none';
        }
    });

    function addTransaction(type, date, amount, description) {
        const earningsTotal = document.getElementById('earnings-total');
        const expensesTotal = document.getElementById('expenses-total');
        const billsTotal = document.getElementById('bills-total');
        const savingsTotal = document.getElementById('savings-total');

        if (type === 'earning') {
            earningsTotal.textContent = `$${(parseFloat(earningsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
        } else if (type === 'expense') {
            expensesTotal.textContent = `$${(parseFloat(expensesTotal.textContent.slice(1)) + amount).toFixed(2)}`;
        } else if (type === 'bills') {
            billsTotal.textContent = `$${(parseFloat(billsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
        } else if (type === 'savings-goal') {
            savingsTotal.textContent = `$${(parseFloat(savingsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
        } else if (type === 'savings') {
            savingsTotal.textContent = `$${(parseFloat(savingsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
        }
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});
// This function should be updated to include logic for adding bills and savings goals
function addTransaction(type, date, amount, description) {
    const earningsTotal = document.getElementById('earnings-total');
    const expensesTotal = document.getElementById('expenses-total');
    const billsList = document.getElementById('bills-list');
    const savingsGoalsList = document.getElementById('savings-goals-list');
    const savingsTotal = document.getElementById('savings-total');

    // Update totals
    if (type === 'earning') {
        earningsTotal.textContent = `$${(parseFloat(earningsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
    } else if (type === 'expense') {
        expensesTotal.textContent = `$${(parseFloat(expensesTotal.textContent.slice(1)) + amount).toFixed(2)}`;
    } else if (type === 'bills') {
        const li = document.createElement('li');
        li.textContent = `Due: ${date} - Amount: $${amount.toFixed(2)} - Description: ${description}`;
        billsList.appendChild(li);
    } else if (type === 'savings-goal') {
        const li = document.createElement('li');
        li.textContent = `Goal: ${description} - Amount: $${amount.toFixed(2)}`;
        savingsGoalsList.appendChild(li);
    } else if (type === 'savings') {
        savingsTotal.textContent = `$${(parseFloat(savingsTotal.textContent.slice(1)) + amount).toFixed(2)}`;
    }
}
function updateProfileStats() {
    // Dummy data for demonstration purposes
    const avgEarnings = 1500; // Replace with actual calculation
    const avgSpending = 800; // Replace with actual calculation
    const avgSavingPercentage = ((avgEarnings - avgSpending) / avgEarnings * 100).toFixed(2);

    document.getElementById('avg-earnings').textContent = `$${avgEarnings.toFixed(2)}`;
    document.getElementById('avg-spending').textContent = `$${avgSpending.toFixed(2)}`;
    document.getElementById('avg-saving-percentage').textContent = `${avgSavingPercentage}%`;
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', updateProfileStats);

