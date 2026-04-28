const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const authMiddleware = require('../middleware/auth');

// REGISTER - only creates new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: 'Username and password required.' });

    try {
        const existing = await User.findOne({ username });
        if (existing)
            return res.status(400).json({ message: 'Username already taken!' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed });

        res.status(201).json({ message: 'Account created! Please login.' });

    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// LOGIN - only logs in existing user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: 'Username and password required.' });

    try {
        const user = await User.findOne({ username });

        if (!user)
            return res.status(401).json({ message: 'User not found! Please register first.' });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: 'Incorrect password.' });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return res.json({ token, username: user.username });

    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// CHANGE PASSWORD
router.post('/change-password', authMiddleware, async (req, res) => {
    const { currentPass, newPass } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const match = await bcrypt.compare(currentPass, user.password);
        if (!match)
            return res.status(401).json({ message: 'Current password is incorrect!' });

        user.password = await bcrypt.hash(newPass, 10);
        await user.save();
        res.json({ message: 'Password changed successfully!' });
    } catch(err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;