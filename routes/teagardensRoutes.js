const express = require('express');
const router = express.Router();
const {
  getAllTeaGardens,
  getTeaGardenById,
  createTeaGarden,
  updateTeaGarden,
  deleteTeaGarden
} = require('../controllers/teagardensController');

// Public Routes
router.get('/', getAllTeaGardens);
router.get('/:id', getTeaGardenById);

// Admin/CRUD Routes
router.post('/', createTeaGarden);
router.put('/:id', updateTeaGarden);
router.delete('/:id', deleteTeaGarden);

module.exports = router;
