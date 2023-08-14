const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'admin',
  },
});

const AuthModel = mongoose.model('auth', AuthSchema);
module.exports = AuthModel;

