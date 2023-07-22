const express = require('express');
const UserModel = require('../models/User.js');

const router = express.Router();

// Middleware to check if the user is an admin
function checkAdminRole(req, res, next) {
  if (req.user.role === 'admin') {
    // User is an admin, grant access
    next();
  } else {
    // User is not an admin, deny access
    res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
}

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Apply checkAdminRole middleware to the protected route
router.get('/admin-dashboard', checkAdminRole, async (req, res) => {
  // Handle admin dashboard logic here
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
