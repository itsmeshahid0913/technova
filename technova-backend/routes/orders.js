const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const Cart    = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/place', async (req, res) => {
    const { customer, email, phone, address, method, items } = req.body;

    if (!items || items.length === 0)
        return res.status(400).json({ message: 'No items in order.' });

    try {
        const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
        const orderId = 'TN' + Math.floor(Math.random() * 90000 + 10000);

        const order = await Order.create({
            userId: req.user.id,
            orderId,
            customer,
            email,
            phone,
            address,
            method,
            items,
            total,
            status: 'COMPLETED'
        });

        // The cart clearing logic has been commented out to keep items in the cart
        // await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;