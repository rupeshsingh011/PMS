const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

const createHttpError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const generateToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, { expiresIn: '30d' });
};

const authenticateUser = async ({ username, password }) => {
  if (mongoose.connection.readyState !== 1) {
    throw createHttpError(503, 'Database is not connected. Configure MONGODB_URI to enable database login.');
  }

  const user = await User.findOne({ username });

  if (!user) {
    if (env.nodeEnv === 'production') {
      throw createHttpError(401, 'Invalid credentials');
    }

    const newUser = await User.create({ username, password });
    return {
      statusCode: 201,
      payload: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        token: generateToken(newUser._id),
      },
    };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return {
    statusCode: 200,
    payload: {
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    },
  };
};

module.exports = {
  authenticateUser,
  generateToken,
};

