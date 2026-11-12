const express = require('express');
const { login } = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validateAuth');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate user and return JWT token
// @access  Public
router.post('/login', validateLogin, login);

module.exports = router;

