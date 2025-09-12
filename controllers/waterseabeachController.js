const SeaBeach = require('../models/waterseabeach');

// ➤ Get all sea beach destinations
exports.getAllSeaBeaches = async (req, res) => {
  try {
    const seaBeaches = await SeaBeach.find({});
    res.status(200).json(seaBeaches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sea beaches', error });
  }
};

// ➤ Get a single sea beach by ID
exports.getSeaBeachById = async (req, res) => {
  try {
    const seaBeach = await SeaBeach.findById(req.params.id);
    if (!seaBeach) return res.status(404).json({ message: 'Sea beach not found' });
    res.status(200).json(seaBeach);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sea beach', error });
  }
};

// ➤ Add a new sea beach
exports.createSeaBeach = async (req, res) => {
  try {
    const newSeaBeach = await SeaBeach.create(req.body);
    res.status(201).json(newSeaBeach);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create sea beach', error });
  }
};

// ➤ Update a sea beach
exports.updateSeaBeach = async (req, res) => {
  try {
    const updated = await SeaBeach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Sea beach not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update sea beach', error });
  }
};

// ➤ Delete a sea beach
exports.deleteSeaBeach = async (req, res) => {
  try {
    const deleted = await SeaBeach.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Sea beach not found' });
    res.status(200).json({ message: 'Sea beach deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sea beach', error });
  }
};
