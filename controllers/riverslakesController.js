const RiversLakes = require('../models/riverslakes');

// ➤ Get all rivers & lakes
exports.getAllRiversLakes = async (req, res) => {
  try {
    const riversLakes = await RiversLakes.find({});
    res.status(200).json(riversLakes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rivers & lakes', error });
  }
};

// ➤ Get a single river/lake by ID
exports.getRiversLakesById = async (req, res) => {
  try {
    const riversLake = await RiversLakes.findById(req.params.id);
    if (!riversLake) return res.status(404).json({ message: 'River/Lake not found' });
    res.status(200).json(riversLake);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch river/lake', error });
  }
};

// ➤ Add a new river/lake
exports.createRiversLakes = async (req, res) => {
  try {
    const newRiversLakes = await RiversLakes.create(req.body);
    res.status(201).json(newRiversLakes);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create river/lake', error });
  }
};

// ➤ Update a river/lake
exports.updateRiversLakes = async (req, res) => {
  try {
    const updated = await RiversLakes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'River/Lake not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update river/lake', error });
  }
};

// ➤ Delete a river/lake
exports.deleteRiversLakes = async (req, res) => {
  try {
    const deleted = await RiversLakes.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'River/Lake not found' });
    res.status(200).json({ message: 'River/Lake deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete river/lake', error });
  }
};
