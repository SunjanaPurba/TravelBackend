const express = require("express");
const router = express.Router();
const holidaysController = require("../controllers/holidaysController");

// Routes
router.get("/", holidaysController.getAllHolidays);
router.get("/:id", holidaysController.getHolidayById);
router.get("/month/:year/:month", holidaysController.getHolidaysByMonth);
router.post("/", holidaysController.createHoliday);
router.put("/:id", holidaysController.updateHoliday);
router.delete("/:id", holidaysController.deleteHoliday);

module.exports = router;



