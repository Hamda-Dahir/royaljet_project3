const express = require('express');
const ExpensesModel = require('../models/Expenses.js');

const router = express.Router();

// Create a new expenses
router.post('/', async (req, res) => {
  try {
    const newExpense = await ExpensesModel.create(req.body);
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expenses', error });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await ExpensesModel.find({});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

// Get a single expenses by ID

// Update a expenses by ID

// Delete a expenses by ID

module.exports = router;
