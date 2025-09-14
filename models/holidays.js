const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  country: { type: String, default: "Bangladesh" },
  type: {
    type: String,
    enum: ["Public", "Festival", "Religious Festival", "Ethnic Festival"],
    default: "Festival"
  }
});

module.exports = mongoose.model("Holiday", holidaySchema);
