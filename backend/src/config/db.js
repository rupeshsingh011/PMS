const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    if (!env.mongoUri) {
      console.warn('MONGODB_URI not set in environment variables. Starting without DB connection.');
      return false;
    }

    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected successfully');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

