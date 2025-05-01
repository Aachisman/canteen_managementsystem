const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const orderRoutes = require('./routes/orders');
require('dotenv').config();

const app = express();
connectDB(); // connect to MongoDB

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes); // register route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
