const mongoose = require('mongoose');

const SeaBeachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    short_description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    google_map: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model('SeaBeach', SeaBeachSchema);
