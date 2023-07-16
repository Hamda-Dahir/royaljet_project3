const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  fullname: String,
  phone: Number,
  date: Date,
  details: String,
  category: String,
  price: String,
  paymentType: String,
});

const OrderModel = mongoose.model('orders', OrderSchema);
module.exports = OrderModel;
