const express = require('express');
const router = express.Router();
const {
  getAllHistoricals,
  getHistoricalById,
  createHistorical,
  updateHistorical,
  deleteHistorical
} = require('../controllers/historicalController');

// Public Routes
router.get('/', getAllHistoricals);
router.get('/:id', getHistoricalById);

// Admin/CRUD Routes
router.post('/', createHistorical);
router.put('/:id', updateHistorical);
router.delete('/:id', deleteHistorical);

module.exports = router;
