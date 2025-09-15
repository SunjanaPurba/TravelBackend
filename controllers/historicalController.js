const Historical = require('../models/historical');

// ➤ Get all historical/cultural destinations
exports.getAllHistoricals = async (req, res) => {
  try {
    const historicals = await Historical.find({});
    res.status(200).json(historicals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch historical destinations', error });
  }
};

// ➤ Get a single historical destination by ID
exports.getHistoricalById = async (req, res) => {
  try {
    const historical = await Historical.findById(req.params.id);
    if (!historical) return res.status(404).json({ message: 'Historical destination not found' });
    res.status(200).json(historical);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch historical destination', error });
  }
};

// ➤ Add a new historical destination
exports.createHistorical = async (req, res) => {
  try {
    const newHistorical = await Historical.create(req.body);
    res.status(201).json(newHistorical);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create historical destination', error });
  }
};

// ➤ Update a historical destination
exports.updateHistorical = async (req, res) => {
  try {
    const updated = await Historical.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Historical destination not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update historical destination', error });
  }
};

// ➤ Delete a historical destination
exports.deleteHistorical = async (req, res) => {
  try {
    const deleted = await Historical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Historical destination not found' });
    res.status(200).json({ message: 'Historical destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete historical destination', error });
  }
};
