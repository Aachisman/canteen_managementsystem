require('dotenv').config(); // MUST be at the top
const mongoose = require('mongoose');

console.log('🔍 MONGO_URI from .env:', process.env.MONGO_URI); // For testing

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
