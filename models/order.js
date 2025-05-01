// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  dishName: {
    type: String,
    required: true
  },
  tokenNumber: {
    type: Number,
    unique: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);

