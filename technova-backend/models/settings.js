const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    isSaleActive:       { type: Boolean, default: false },
    saleTitle:          { type: String, default: 'Summer SALE' },
    discountPercentage: { type: Number, default: 10 }
});

module.exports = mongoose.model('Settings', settingsSchema);