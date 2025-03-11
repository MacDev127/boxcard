// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Routers
const boxerRouter = require('./routes/boxerRoutes');

const app = express();

// Security
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// JSON body parsing
app.use(express.json());

// Routes
app.use('/api/boxers', boxerRouter);

// Health check route or default route
app.get('/', (req, res) => {
  res.send('Boxer Profile API is running.');
});

module.exports = app;
