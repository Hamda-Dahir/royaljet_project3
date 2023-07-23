const express = require('express');
const EmployeeModel = require('../models/Employee.js');

const router = express.Router();

// Create a new employees
router.post('/', async (req, res) => {
  try {
    const newEmployee = await EmployeeModel.create(req.body);
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Employees', error });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

// Get a single employees by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});

// Update a expenses by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedExpense = await ExpensesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Expense', error });
  }
});

// Delete a expenses by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedExpense = await ExpensesModel.findByIdAndRemove(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(deletedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Expense', error });
  }
});

module.exports = router;
