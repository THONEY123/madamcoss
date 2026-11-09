const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve the website from the same origin as the API. Express will serve
// index.html for GET / and static assets from the repository directory.
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MadamCass API is running!' });
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('New Order Received:', order);
    res.status(200).json({ status: 'success', message: 'Order received!', order });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
