const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user by username
    const user = await User.findOne({ username });
    
    // 2. If user doesn't exist, return error
    if (!user) {
      // For development, we'll auto-create the user if they don't exist
      // In production, this should just return "Invalid credentials"
      const newUser = await User.create({ username, password });
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        token: generateToken(newUser._id),
      });
    }

    // 3. If user exists, check password
    const isMatch = await user.comparePassword(password);
    
    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  login,
};
