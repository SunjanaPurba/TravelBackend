const express = require('express');
const router = express.Router();
const {
  getAllRiversLakes,
  getRiversLakesById,
  createRiversLakes,
  updateRiversLakes,
  deleteRiversLakes
} = require('../controllers/riverslakesController');

// Public Routes
router.get('/', getAllRiversLakes);
router.get('/:id', getRiversLakesById);

// Admin/CRUD Routes
router.post('/', createRiversLakes);
router.put('/:id', updateRiversLakes);
router.delete('/:id', deleteRiversLakes);

module.exports = router;
