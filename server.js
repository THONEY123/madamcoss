const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MadamCass API is running live on Render!');
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('New Order Received:', order);
    res.status(200).json({ status: 'success', message: 'Order received!', order });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
