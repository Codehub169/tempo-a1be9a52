const express = require('express');
const apartmentRoutes = require('./apartmentRoutes');

const router = express.Router();

// Mount apartment routes
router.use('/apartments', apartmentRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'API is healthy' });
});

module.exports = router;
