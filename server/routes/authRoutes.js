const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// @route   POST /api/auth/login
// @desc    Auth user & get token (or create if not exists for demo)
// @access  Public
router.post('/login', login);

module.exports = router;
