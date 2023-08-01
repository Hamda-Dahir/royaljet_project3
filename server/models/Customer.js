const mongoose = require ('mongoose');

const CustomerSchema = new mongoose.Schema({
    fullname:String,
    phone:Number,
    Address:String,
    OrderDetails:String,
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending',
    }
});

const customerModel = mongoose.model('customers', CustomerSchema);

module.exports = customerModel;
