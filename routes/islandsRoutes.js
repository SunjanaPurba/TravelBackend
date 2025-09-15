const express = require('express');
const router = express.Router();
const {
  getAllIslands,
  getIslandById,
  createIsland,
  updateIsland,
  deleteIsland
} = require('../controllers/islandsController');

// Public Routes
router.get('/', getAllIslands);
router.get('/:id', getIslandById);

// Admin/CRUD Routes
router.post('/', createIsland);
router.put('/:id', updateIsland);
router.delete('/:id', deleteIsland);

module.exports = router;
