const { Pool } = require('pg');
require('dotenv').config(); // Ensure environment variables are loaded

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended settings for production, but may vary based on needs
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Max number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection from the pool
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database!');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Function to test the connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL and acquired a client.');
    await client.query('SELECT NOW()'); // Example query
    client.release();
    console.log('Client released.');
  } catch (error) {
    console.error('Failed to connect to the PostgreSQL database:', error);
    // process.exit(1); // Optionally exit if DB connection is critical at startup
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export the pool itself if direct access is needed
  testConnection, // Export the test function
};
