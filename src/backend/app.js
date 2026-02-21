const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { rateLimiter } = require('./middleware/rateLimiter');

// Import routes
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const cookingRoutes = require('./routes/cooking');
const analyticsRoutes = require('./routes/analytics');
const growingRoutes = require('./routes/growing');
function createApp() {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
  }));

  // Rate limiting
  app.use(rateLimiter);

  // Logging
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Optional frontend static files (not present in this repo by default)
  const frontendBuildDir = path.join(__dirname, '../frontend/build');
  if (fs.existsSync(frontendBuildDir)) {
    app.use('/static', express.static(path.join(frontendBuildDir, 'static')));
  }

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API routes
  app.use('/api/recipes', recipeRoutes);
  app.use('/api/ingredients', ingredientRoutes);
  app.use('/api/cooking', cookingRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/growing', growingRoutes);

  // API documentation endpoint
  app.get('/api', (req, res) => {
    res.json({
      name: 'Autonomous Food System API',
      version: '0.1.0',
      description: 'Autonomous Food System (software prototype)',
      endpoints: {
        recipes: '/api/recipes',
        ingredients: '/api/ingredients',
        cooking: '/api/cooking',
        analytics: '/api/analytics',
        growing: '/api/growing'
      },
      documentation: '/api/docs'
    });
  });

  // Serve frontend in production
  if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(frontendBuildDir)) {
      app.use(express.static(frontendBuildDir));
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildDir, 'index.html'));
      });
    } else {
      logger.warn('NODE_ENV=production but no frontend build found; API-only mode.');
    }
  }

  // Error handling
  app.use(errorHandler);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
      timestamp: new Date().toISOString()
    });
  });

  return app;
}

module.exports = { createApp };
