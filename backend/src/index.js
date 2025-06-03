require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Frontend should be accessible if served from backend's public folder.`);
  // In a real scenario, you'd also connect to the database here.
  // e.g., require('./config/database').connectDB();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    // Close database connection here if applicable
    // e.g. require('./config/database').closeDB();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    // Close database connection here if applicable
    // e.g. require('./config/database').closeDB();
    process.exit(0);
  });
});
