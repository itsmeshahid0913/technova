const express  = require('express');
const router   = express.Router();
const Cart     = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.json(cart ? cart.items : []);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/add', async (req, res) => {
    const { productId, name, price, img } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }
        const existing = cart.items.find(i => i.productId.toString() === productId);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.items.push({ productId, name, price, img, qty: 1 });
        }
        await cart.save();
        res.json(cart.items);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.put('/qty', async (req, res) => {
    const { productId, change } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found.' });

        const item = cart.items.find(i => i.productId.toString() === productId);
        if (!item) return res.status(404).json({ message: 'Item not found.' });

        item.qty += change;
        if (item.qty <= 0) {
            cart.items = cart.items.filter(i => i.productId.toString() !== productId);
        }
        await cart.save();
        res.json(cart.items);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.delete('/item/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found.' });
        cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
        await cart.save();
        res.json(cart.items);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.delete('/clear', async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
        res.json({ message: 'Cart cleared.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;