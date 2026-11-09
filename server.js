const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MadamCass API is running!' });
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('New Order Received:', order);
    res.status(200).json({ status: 'success', message: 'Order received!', order });
});

// Inject the checkout controller into the storefront so checkout uses this API.
app.get(['/', '/index.html'], (req, res, next) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (error, html) => {
        if (error) return next(error);
        const scriptTag = '<script src="/checkout.js" defer></script>';
        res.type('html').send(html.replace('</body>', `${scriptTag}</body>`));
    });
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
