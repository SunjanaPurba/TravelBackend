require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");

// Models
const Hilltop = require("./models/hilltop");
const SeaBeach = require("./models/waterseabeach");
const JungleForest = require("./models/jungleforest");
const Historical = require("./models/historical");
const Islands = require("./models/islands");
const RiversLakes = require("./models/riverslakes");
const TeaGardens = require("./models/teagardens");
const Holiday = require("./models/holidays");

// JSON Data
const hillTopJson = require("./hilltop.json");
const seaBeachJson = require("./waterseabeach.json");
const jungleForestJson = require("./jungleforest.json");
const holidaysJson = require("./holidays.json");
const historicalJson = require("./historical.json");
const islandsJson = require("./islands.json");
const riversLakesJson = require("./riverslakes.json");
const teaGardensJson = require("./teagardens.json");

const app = express();
app.use(express.json());

// ✅ Database seeding
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    // Holidays
    const years = [2025, 2026];
    const holidays = holidaysJson.holidays;
    let allHolidays = [];

    years.forEach((year) => {
      holidays.forEach((h) => {
        if (h.recurring) {
          const date = new Date(year, h.month - 1, h.day, 12);
          allHolidays.push({ ...h, date, year });
        } else {
          const date = new Date(h.date);
          if (date.getFullYear() === year) {
            allHolidays.push({
              ...h,
              date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12),
              year,
            });
          }
        }
      });
    });

    await Holiday.deleteMany();
    await Holiday.create(allHolidays);

    // Seed destinations
    await Hilltop.deleteMany();
    await Hilltop.create(hillTopJson.hilltop_destinations);

    await SeaBeach.deleteMany();
    await SeaBeach.create(seaBeachJson.sea_beach_destinations);

    await JungleForest.deleteMany();
    await JungleForest.create(jungleForestJson.jungle_forest_destinations);

    await Historical.deleteMany();
    await Historical.create(historicalJson.historical_cultural_destinations);

    await Islands.deleteMany();
    await Islands.create(islandsJson.islands_destinations);

    await RiversLakes.deleteMany();
    await RiversLakes.create(riversLakesJson.rivers_lakes_destinations);

    await TeaGardens.deleteMany();
    await TeaGardens.create(teaGardensJson.tea_gardens_valleys_destinations);

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

start();

