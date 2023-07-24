const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  position: String,
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
