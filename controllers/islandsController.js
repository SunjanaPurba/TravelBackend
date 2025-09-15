const Islands = require('../models/islands');

// ➤ Get all islands
exports.getAllIslands = async (req, res) => {
  try {
    const islands = await Islands.find({});
    res.status(200).json(islands);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch islands', error });
  }
};

// ➤ Get a single island by ID
exports.getIslandById = async (req, res) => {
  try {
    const island = await Islands.findById(req.params.id);
    if (!island) return res.status(404).json({ message: 'Island not found' });
    res.status(200).json(island);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch island', error });
  }
};

// ➤ Add a new island
exports.createIsland = async (req, res) => {
  try {
    const newIsland = await Islands.create(req.body);
    res.status(201).json(newIsland);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create island', error });
  }
};

// ➤ Update an island
exports.updateIsland = async (req, res) => {
  try {
    const updated = await Islands.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Island not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update island', error });
  }
};

// ➤ Delete an island
exports.deleteIsland = async (req, res) => {
  try {
    const deleted = await Islands.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Island not found' });
    res.status(200).json({ message: 'Island deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete island', error });
  }
};
