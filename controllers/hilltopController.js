const Hilltop = require('../models/hilltop');

// ➤ Get all hilltop destinations
exports.getAllHilltops = async (req, res) => {
  try {
    const hilltops = await Hilltop.find({});
    res.status(200).json(hilltops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hilltops', error });
  }
};

// ➤ Get a single hilltop by ID
exports.getHilltopById = async (req, res) => {
  try {
    const hilltop = await Hilltop.findById(req.params.id);
    if (!hilltop) return res.status(404).json({ message: 'Hilltop not found' });
    res.status(200).json(hilltop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hilltop', error });
  }
};

// ➤ Add a new hilltop
exports.createHilltop = async (req, res) => {
  try {
    const newHilltop = await Hilltop.create(req.body);
    res.status(201).json(newHilltop);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create hilltop', error });
  }
};

// ➤ Update a hilltop
exports.updateHilltop = async (req, res) => {
  try {
    const updated = await Hilltop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Hilltop not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update hilltop', error });
  }
};

// ➤ Delete a hilltop
exports.deleteHilltop = async (req, res) => {
  try {
    const deleted = await Hilltop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Hilltop not found' });
    res.status(200).json({ message: 'Hilltop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hilltop', error });
  }
};
