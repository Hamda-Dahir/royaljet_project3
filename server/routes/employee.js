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

// Update a employee by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Employee', error });
  }
});

// Delete a employee by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndRemove(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Employee', error });
  }
});

module.exports = router;
