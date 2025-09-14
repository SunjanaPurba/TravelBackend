const Holiday = require("../models/holidays");

// ➤ Get all holidays
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({}).sort({ date: 1 });
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch holidays", error });
  }
};

// ➤ Get holiday by ID
exports.getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: "Holiday not found" });
    res.status(200).json(holiday);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch holiday", error });
  }
};

// ➤ Get holidays by year/month
exports.getHolidaysByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const holidays = await Holiday.find({ date: { $gte: start, $lte: end } });
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch holidays for month", error });
  }
};

// ➤ Add a new holiday
exports.createHoliday = async (req, res) => {
  try {
    const newHoliday = await Holiday.create(req.body);
    res.status(201).json(newHoliday);
  } catch (error) {
    res.status(400).json({ message: "Failed to create holiday", error });
  }
};

// ➤ Update a holiday
exports.updateHoliday = async (req, res) => {
  try {
    const updated = await Holiday.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Holiday not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update holiday", error });
  }
};

// ➤ Delete a holiday
exports.deleteHoliday = async (req, res) => {
  try {
    const deleted = await Holiday.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Holiday not found" });
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete holiday", error });
  }
};
