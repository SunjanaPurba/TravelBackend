const JungleForest = require('../models/jungleforest');

// ➤ Get all jungle/forest destinations
exports.getAllJungleForests = async (req, res) => {
  try {
    const forests = await JungleForest.find({});
    res.status(200).json(forests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jungle/forest destinations', error });
  }
};

// ➤ Get a single jungle/forest by ID
exports.getJungleForestById = async (req, res) => {
  try {
    const forest = await JungleForest.findById(req.params.id);
    if (!forest) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(forest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch destination', error });
  }
};

// ➤ Add a new jungle/forest
exports.createJungleForest = async (req, res) => {
  try {
    const newForest = await JungleForest.create(req.body);
    res.status(201).json(newForest);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create destination', error });
  }
};

// ➤ Update a jungle/forest
exports.updateJungleForest = async (req, res) => {
  try {
    const updated = await JungleForest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update destination', error });
  }
};

// ➤ Delete a jungle/forest
exports.deleteJungleForest = async (req, res) => {
  try {
    const deleted = await JungleForest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Destination not found' });
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete destination', error });
  }
};
