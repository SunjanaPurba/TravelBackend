const express = require('express');
const router = express.Router();
const {
  getAllHilltops,
  getHilltopById,
  createHilltop,
  updateHilltop,
  deleteHilltop
} = require('../controllers/hilltopController');

// Public Routes
router.get('/', getAllHilltops);
router.get('/:id', getHilltopById);

// Admin/CRUD Routes (optional, you can protect these with auth middleware)
router.post('/', createHilltop);
router.put('/:id', updateHilltop);
router.delete('/:id', deleteHilltop);

module.exports = router;
