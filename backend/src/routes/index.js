const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

module.exports = router;

