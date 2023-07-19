const express = require('express');
const OrderModel = require('../models/Order.js');

const router = express.Router();

// create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = await OrderModel.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// get a single order

// update a order by id

// delete a order by id

module.exports = router;
