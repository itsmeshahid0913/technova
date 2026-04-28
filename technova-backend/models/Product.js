const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    price:       { type: Number, required: true },
    img:         { type: String, required: true },
    cat:         { type: String, required: true },
    description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);