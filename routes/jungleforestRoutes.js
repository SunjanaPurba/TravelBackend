const express = require('express');
const router = express.Router();
const {
  getAllJungleForests,
  getJungleForestById,
  createJungleForest,
  updateJungleForest,
  deleteJungleForest
} = require('../controllers/jungleforestController');

// Public Routes
router.get('/', getAllJungleForests);
router.get('/:id', getJungleForestById);

// Admin/CRUD Routes
router.post('/', createJungleForest);
router.put('/:id', updateJungleForest);
router.delete('/:id', deleteJungleForest);

module.exports = router;
