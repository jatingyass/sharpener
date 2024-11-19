let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === 'select') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    newRow.classList.add('text-center');
    newRow.innerHTML = `
        <td>${category}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td><button class="btn btn-warning btn-sm edit-btn">Edit</button></td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    `;

    const editBtn = newRow.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        editExpense(expense, newRow);
    });

    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        deleteExpense(expense, newRow);
    });

    // Clear the input fields after adding an expense
    categorySelect.value = 'select';
    amountInput.value = '';
    dateInput.value = '';
});

// Function to delete an expense
function deleteExpense(expense, row) {
    const index = expenses.indexOf(expense);
    if (index !== -1) {
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expenses.splice(index, 1);
        expensesTableBody.removeChild(row);
    }
}

// Function to edit an expense
function editExpense(expense, row) {
    categorySelect.value = expense.category;
    amountInput.value = expense.amount;
    dateInput.value = expense.date;

    deleteExpense(expense, row); // Delete the expense from the list
}

// Initial render of expenses (if any)
function renderExpenses() {
    for (const expense of expenses) {
        const newRow = expensesTableBody.insertRow();
        newRow.classList.add('text-center');
        newRow.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><button class="btn btn-warning btn-sm edit-btn">Edit</button></td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;

        const editBtn = newRow.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            editExpense(expense, newRow);
        });

        const deleteBtn = newRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteExpense(expense, newRow);
        });

        totalAmount += expense.amount;
        totalAmountCell.textContent = totalAmount;
    }
}

// Call renderExpenses to initially render existing expenses
renderExpenses();
