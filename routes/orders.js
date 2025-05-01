const express = require('express');
const router = express.Router();

// ✅ Only this import (no duplicates)
const { placeOrder, getOrders } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', getOrders);

module.exports = router;

// In routes/orders.js
router.put('/:tokenNumber/complete', async (req, res) => {
    try {
      const tokenNumber = req.params.tokenNumber;
      const updated = await Order.findOneAndUpdate(
        { tokenNumber },
        { status: 'Completed' },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
