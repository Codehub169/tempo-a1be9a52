const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const apiV1Routes = require('./api/v1/routes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
// This assumes the frontend build output is copied to 'backend/public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/v1', apiV1Routes);

// Catch-all for frontend routing (if not serving static index.html directly from /)
// This is important for SPAs where routing is handled client-side.
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    // If the request is for an API route that wasn't matched, let it 404
    return next();
  }
  // Otherwise, serve the main HTML file for client-side routing
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), (err) => {
    if (err) {
        // If index.html is not found (e.g. frontend not built/copied), pass to error handler
        if (err.status === 404) {
            console.warn('index.html not found. Ensure frontend is built and copied to backend/public.');
            const error = new Error('Frontend application not found.');
            error.status = 404;
            return next(error);
        }
        next(err); // For other errors like permission issues
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

module.exports = app;
