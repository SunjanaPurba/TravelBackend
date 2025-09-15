const TeaGardens = require('../models/teagardens');

// ➤ Get all tea gardens & valleys
exports.getAllTeaGardens = async (req, res) => {
  try {
    const teaGardens = await TeaGardens.find({});
    res.status(200).json(teaGardens);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tea gardens', error });
  }
};

// ➤ Get a single tea garden by ID
exports.getTeaGardenById = async (req, res) => {
  try {
    const teaGarden = await TeaGardens.findById(req.params.id);
    if (!teaGarden) return res.status(404).json({ message: 'Tea Garden not found' });
    res.status(200).json(teaGarden);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tea garden', error });
  }
};

// ➤ Add a new tea garden
exports.createTeaGarden = async (req, res) => {
  try {
    const newTeaGarden = await TeaGardens.create(req.body);
    res.status(201).json(newTeaGarden);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create tea garden', error });
  }
};

// ➤ Update a tea garden
exports.updateTeaGarden = async (req, res) => {
  try {
    const updated = await TeaGardens.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Tea Garden not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update tea garden', error });
  }
};

// ➤ Delete a tea garden
exports.deleteTeaGarden = async (req, res) => {
  try {
    const deleted = await TeaGardens.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tea Garden not found' });
    res.status(200).json({ message: 'Tea Garden deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete tea garden', error });
  }
};
