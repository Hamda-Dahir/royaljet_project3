const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
  description: String,
  amount: String,
  date: Date,
  category: String,
});

const ExpensesModel = mongoose.model('expenses', ExpensesSchema);
module.exports = ExpensesModel;
