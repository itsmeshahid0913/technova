const express  = require('express');
const router   = express.Router();
const Settings = require('../models/Settings');

// GET /api/settings  →  get current settings
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({
                isSaleActive: false,
                saleTitle: 'Summer SALE',
                discountPercentage: 10
            });
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// PUT /api/settings  →  update settings
router.put('/', async (req, res) => {
    try {
        const { isSaleActive, saleTitle, discountPercentage } = req.body;
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ isSaleActive, saleTitle, discountPercentage });
        } else {
            settings.isSaleActive = isSaleActive;
            settings.saleTitle = saleTitle;
            settings.discountPercentage = discountPercentage;
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;