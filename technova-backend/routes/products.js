const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/seed', async (req, res) => {
    try {
        await Product.deleteMany();

        const productList = [

            // ── LAPTOPS ──────────────────────────────────────────────
            { name: "MacBook Air M3",       price: 114900, img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400", cat: "Laptop", description: "Apple MacBook Air with M3 chip delivers incredible performance and up to 18 hours of battery life. Features a stunning 13.6-inch Liquid Retina display, 8GB RAM and 256GB SSD." },
            { name: "Dell XPS 15",          price: 145000, img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", cat: "Laptop", description: "Dell XPS 15 is a premium laptop with a 15.6-inch OLED display, Intel Core i7 processor, 16GB RAM and 512GB SSD. Perfect for creators and professionals." },
            { name: "HP Victus 16",         price: 72000,  img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400", cat: "Laptop", description: "HP Victus 16 gaming laptop with AMD Ryzen 5 processor, NVIDIA GTX 1650 graphics, 8GB RAM and 512GB SSD. Great performance at an affordable price." },
            { name: "Asus ROG Strix",       price: 185000, img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400", cat: "Laptop", description: "Asus ROG Strix is a high-end gaming laptop with Intel Core i9, RTX 4070 graphics, 32GB RAM and 1TB SSD. Dominate every game with extreme performance." },
            { name: "Lenovo ThinkPad X1",   price: 135000, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400", cat: "Laptop", description: "Lenovo ThinkPad X1 Carbon is a business ultrabook with Intel Core i7, 16GB RAM, 512GB SSD and legendary ThinkPad keyboard. Built for professionals on the go." },
            { name: "Acer Predator Helios",  price: 165000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400", cat: "Laptop", description: "Acer Predator Helios 300 gaming laptop with Intel Core i7, RTX 3060, 16GB RAM and 144Hz display. Unleash your gaming potential." },
            { name: "Microsoft Surface Pro", price: 125000, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400", cat: "Laptop", description: "Microsoft Surface Pro 9 is a versatile 2-in-1 tablet with Intel Core i5, 8GB RAM, 256GB SSD and a stunning PixelSense display." },

            // ── MOBILES ──────────────────────────────────────────────
            { name: "iPhone 15 Pro",        price: 127900, img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400", cat: "Mobile", description: "iPhone 15 Pro features the A17 Pro chip, a 48MP camera system, titanium design and USB-C connectivity. Experience the most powerful iPhone ever made." },
            { name: "Samsung S24 Ultra",    price: 129999, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", cat: "Mobile", description: "Samsung Galaxy S24 Ultra with built-in S Pen, 200MP camera, Snapdragon 8 Gen 3 and 5000mAh battery. The ultimate Android flagship experience." },
            { name: "Pixel 8 Pro",          price: 106999, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400", cat: "Mobile", description: "Google Pixel 8 Pro with Tensor G3 chip, 50MP camera with AI features, 7 years of OS updates and a stunning 6.7-inch LTPO display." },
            { name: "Nothing Phone 2",      price: 44999,  img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", cat: "Mobile", description: "Nothing Phone 2 features the iconic Glyph Interface, Snapdragon 8+ Gen 1, 50MP dual camera and a clean Nothing OS experience." },
            { name: "OnePlus 12",           price: 64999,  img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400", cat: "Mobile", description: "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad camera system, 100W SUPERVOOC charging and a smooth 120Hz AMOLED display." },
            { name: "Xiaomi 14 Pro",        price: 89999,  img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400", cat: "Mobile", description: "Xiaomi 14 Pro with Snapdragon 8 Gen 3, Leica camera system, 50MP triple camera and 120W HyperCharge. A flagship killer with premium features." },
            { name: "Motorola Edge 40",     price: 34999,  img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400", cat: "Mobile", description: "Motorola Edge 40 with Dimensity 8020, 144Hz pOLED display, 68W TurboPower charging and IP68 water resistance at a great price." },
            { name: "Realme GT 5 Pro",      price: 49999,  img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400", cat: "Mobile", description: "Realme GT 5 Pro with Snapdragon 8 Gen 3, 50MP periscope zoom camera, 100W charging and a stunning 6.78-inch AMOLED display." },

            // ── AUDIO ──────────────────────────────────────────────
            { name: "Sony WH-1000XM5",     price: 29990,  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", cat: "Audio", description: "Sony WH-1000XM5 offers industry-leading noise cancellation, 30-hour battery life, multipoint connection and crystal clear hands-free calling." },
            { name: "Bose QC 45",          price: 29900,  img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", cat: "Audio", description: "Bose QuietComfort 45 delivers world-class noise cancellation, 24-hour battery life and a lightweight comfortable design for all-day wear." },
            { name: "Galaxy Buds 2",       price: 12000,  img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", cat: "Audio", description: "Samsung Galaxy Buds 2 with active noise cancellation, 3-mic system, 5-hour playback and seamless Galaxy device integration." },
            { name: "JBL Flip 6",          price: 9999,   img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", cat: "Audio", description: "JBL Flip 6 portable Bluetooth speaker with powerful sound, IP67 waterproof rating, 12-hour battery and PartyBoost feature." },
            { name: "Sennheiser HD 450",   price: 14990,  img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", cat: "Audio", description: "Sennheiser HD 450BT with active noise cancellation, 30-hour battery, foldable design and superior Sennheiser sound quality." },

            // ── WATCHES ──────────────────────────────────────────────
            { name: "Apple Watch Ultra 2", price: 89900,  img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400", cat: "Watch", description: "Apple Watch Ultra 2 is built for endurance with a titanium case, up to 60-hour battery, precision dual-frequency GPS and a bright 2000 nit display." },
            { name: "Garmin Fenix 7",      price: 67000,  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", cat: "Watch", description: "Garmin Fenix 7 is a rugged multisport GPS smartwatch with solar charging, 18-day battery life and advanced health and fitness tracking." },
            { name: "Fossil Gen 6",        price: 24995,  img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400", cat: "Watch", description: "Fossil Gen 6 smartwatch with Snapdragon 4100+ chip, Wear OS, SpO2 sensor, heart rate monitor and fast charging in a classic design." },
            { name: "Samsung Galaxy Watch 6", price: 34999, img: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=400", cat: "Watch", description: "Samsung Galaxy Watch 6 with advanced health monitoring, BioActive sensor, sleep coaching, 40-hour battery and Wear OS." },
            { name: "Fitbit Sense 2",      price: 19999,  img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400", cat: "Watch", description: "Fitbit Sense 2 with continuous EDA sensor for stress management, ECG app, skin temperature sensor and 6-day battery life." },

            // ── GAMING ──────────────────────────────────────────────
            { name: "PlayStation 5",       price: 54990,  img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400", cat: "Gaming", description: "Sony PlayStation 5 with ultra-high speed SSD, ray tracing, 4K gaming at 120fps, haptic feedback DualSense controller and 3D audio." },
            { name: "Nintendo Switch",     price: 32000,  img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400", cat: "Gaming", description: "Nintendo Switch OLED with a vibrant 7-inch OLED screen, enhanced audio, 64GB storage and play at home or on the go." },
            { name: "Xbox Series X",       price: 49990,  img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400", cat: "Gaming", description: "Xbox Series X with 12 teraflops GPU, 1TB SSD, 4K gaming at 120fps, Smart Delivery and Xbox Game Pass compatibility." },
            { name: "Steam Deck",          price: 45000,  img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400", cat: "Gaming", description: "Valve Steam Deck is a portable PC gaming device with AMD APU, 7-inch touchscreen, full controls and access to your Steam library anywhere." },
            { name: "Razer DeathAdder V3", price: 7999,   img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400", cat: "Gaming", description: "Razer DeathAdder V3 gaming mouse with Focus Pro 30K optical sensor, 90-hour battery, ultra-lightweight design and Razer HyperSpeed wireless." },

            // ── ACCESSORIES ──────────────────────────────────────────────
            { name: "Logitech MX Master",  price: 10995,  img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400", cat: "Accessory", description: "Logitech MX Master 3S is the ultimate productivity mouse with 8000 DPI, MagSpeed scroll wheel, Bluetooth and works on any surface." },
            { name: "Keychron K2",         price: 9500,   img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", cat: "Accessory", description: "Keychron K2 is a compact wireless mechanical keyboard with hot-swappable switches, RGB backlight and Mac/Windows compatibility." },
            { name: "Anker 65W Charger",   price: 2999,   img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400", cat: "Accessory", description: "Anker 65W USB-C GaN charger with 3 ports, charges laptop and phone simultaneously, compact size and advanced safety features." },
            { name: "Samsung T7 SSD",      price: 7999,   img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400", cat: "Accessory", description: "Samsung T7 Portable SSD with 1TB storage, USB 3.2 speeds up to 1050MB/s, password protection and shock resistant metal body." },
            

            // ── TABLETS ──────────────────────────────────────────────
            { name: "iPad Pro M2",         price: 79900,  img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400", cat: "Tablet", description: "iPad Pro M2 with Apple M2 chip, 11-inch Liquid Retina display, ProMotion 120Hz, Thunderbolt port and all-day battery life." },
            { name: "Samsung Galaxy Tab S9", price: 74999, img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400", cat: "Tablet", description: "Samsung Galaxy Tab S9 with Snapdragon 8 Gen 2, 11-inch Dynamic AMOLED display, IP68 rating and included S Pen for creativity." },
            { name: "OnePlus Pad",         price: 37999,  img: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400", cat: "Tablet", description: "OnePlus Pad with Dimensity 9000, 11.61-inch 144Hz display, 9510mAh battery, 67W SUPERVOOC charging and OxygenOS." },
            { name: "Lenovo Tab P12 Pro",  price: 59999,  img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=400", cat: "Tablet", description: "Lenovo Tab P12 Pro with 12.6-inch Super AMOLED display, Snapdragon 870, Quad JBL speakers and 10200mAh battery for entertainment." },
            { name: "Amazon Fire HD 10",   price: 14999,  img: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400", cat: "Tablet", description: "Amazon Fire HD 10 with 10.1-inch Full HD display, octa-core processor, 3GB RAM and Alexa hands-free. Perfect for entertainment and reading." }

        ];

        const inserted = await Product.insertMany(productList);
        res.json({ message: `✅ ${inserted.length} products seeded!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Seed failed.' });
    }
});

const authMiddleware = require('../middleware/auth');

// GET /api/products/admin - get all products for admin
router.get('/admin', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// POST /api/products/add - add new product
router.post('/add', async (req, res) => {
    const { name, price, img, cat, description } = req.body;
    try {
        const product = await Product.create({ name, price, img, cat, description });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// PUT /api/products/edit/:id - edit product
router.put('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// DELETE /api/products/delete/:id - delete product
router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;