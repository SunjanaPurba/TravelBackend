const express = require('express');
const router = express.Router();
const {
  getAllSeaBeaches,
  getSeaBeachById,
  createSeaBeach,
  updateSeaBeach,
  deleteSeaBeach
} = require('../controllers/waterseabeachController');

// Public Routes
router.get('/', getAllSeaBeaches);
router.get('/:id', getSeaBeachById);

// Admin/CRUD Routes (optional, you can protect these with auth middleware)
router.post('/', createSeaBeach);
router.put('/:id', updateSeaBeach);
router.delete('/:id', deleteSeaBeach);

module.exports = router;
