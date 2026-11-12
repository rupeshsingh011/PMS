const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// CORS configuration: allow specified origins in production or open in local dev
const allowedOrigins = env.clientUrl
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors(
    allowedOrigins.length > 0
      ? { origin: allowedOrigins, credentials: true }
      : undefined
  )
);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ service: 'PMS Backend API', status: 'running' });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

