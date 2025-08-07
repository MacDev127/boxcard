// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Routers
const boxerRouter = require('./routes/boxerRoutes');
const contestRoutes = require('./routes/contestRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // Ensure your backend origin is allowed for images
        'img-src': ["'self'", 'data:', 'http://localhost:5002'],
      },
    },
    // **Explicitly allow cross-origin resource loading**
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
// Serve static files from the "uploads" directory at the /uploads route.

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per window
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add both ports
    exposedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// JSON body parsing
app.use(express.json());

// Routes
app.use('/api/boxers', boxerRouter);
app.use('/api/contests', contestRoutes);
app.use('/api/auth', authRoutes);

// ✅ mounts all boxer routes under /api
const boxerRoutes = require('./routes/boxerRoutes');
app.use('/api', boxerRoutes);

// Health check route or default route
app.get('/', (req, res) => {
  res.send('Boxer Profile API is running.');
});

module.exports = app;
