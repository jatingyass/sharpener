const mysql = require('mysql2');

// Create a connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jatin@1234',
    database: 'expense_tracker',
});

// Controller to get all expenses
const getExpenses = (req, res) => {
    db.query('SELECT * FROM expenses', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching expenses');
            return;
        }
        res.json(results);
    });
};

// Controller to add a new expense
const addExpense = (req, res) => {
    const { category, amount, date } = req.body;
    const query = 'INSERT INTO expenses (category, amount, date) VALUES (?, ?, ?)';
    db.query(query, [category, amount, date], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding expense');
            return;
        }
        res.status(201).json({ id: results.insertId, category, amount, date });
    });
};

// Controller to delete an expense
const deleteExpense = (req, res) => {
    const expenseId = req.params.id;
    const query = 'DELETE FROM expenses WHERE id = ?';
    db.query(query, [expenseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting expense');
            return;
        }
        res.status(200).send('Expense deleted');
    });
};

// Controller to update an expense
const updateExpense = (req, res) => {
    const expenseId = req.params.id;
    const { category, amount, date } = req.body;
    const query = 'UPDATE expenses SET category = ?, amount = ?, date = ? WHERE id = ?';
    db.query(query, [category, amount, date, expenseId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating expense');
            return;
        }
        res.status(200).json({ id: expenseId, category, amount, date });
    });
};

module.exports = { getExpenses, addExpense, deleteExpense, updateExpense };
