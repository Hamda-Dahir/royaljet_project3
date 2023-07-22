const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
