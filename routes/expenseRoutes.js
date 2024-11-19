const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, deleteExpense, updateExpense } = require('../controllers/expenseController');

// Route to get all expenses
router.get('/expenses', getExpenses);

// Route to add a new expense
router.post('/expenses', addExpense);

// Route to delete an expense
router.delete('/expenses/:id', deleteExpense);

// Route to update an expense
router.put('/expenses/:id', updateExpense);

module.exports = router;
