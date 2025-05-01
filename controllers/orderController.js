const Order = require('../models/Order');
const Counter = require('../models/Counter');

const placeOrder = async (req, res) => {
  try {
    const { studentName, dish, pickupTime } = req.body;

    if (!studentName || !dish || !pickupTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Step 1: Get and increment token counter
    const counter = await Counter.findOneAndUpdate(
      { id: 'order_token' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if doesn't exist
    );

    // Step 2: Create order with new token
    const newOrder = new Order({
      studentName,
      dishName: dish,
      pickupTime,
      tokenNumber: counter.seq,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed", tokenNumber: counter.seq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder };

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getOrders };
