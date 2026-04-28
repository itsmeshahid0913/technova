const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId:  { type: String, required: true },
    customer: String,
    email:    String,
    phone:    String,
    address:  String,
    method:   String,
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name:  String,
        price: Number,
        img:   String,
        qty:   Number
    }],
    total:  Number,
    status: { type: String, default: 'COMPLETED' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);