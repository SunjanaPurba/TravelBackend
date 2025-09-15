require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const Hilltop = require('./models/hilltop');
const SeaBeach = require('./models/waterseabeach');
const JungleForest = require('./models/jungleforest');
const Holiday = require('./models/holidays');

const ProductsJson = require('./products.json');
const hillTopJson = require('./hilltop.json');
const seaBeachJson = require('./waterseabeach.json');
const jungleForestJson = require('./jungleforest.json');
const holidaysJson = require("./holidays.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);

        // ✅ Seed Product collection
        await Product.deleteMany();
        await Product.create(ProductsJson);

        // ✅ Seed Hilltop collection
        await Hilltop.deleteMany();
        await Hilltop.create(hillTopJson.hilltop_destinations);

        // ✅ Seed SeaBeach collection
        await SeaBeach.deleteMany();
        await SeaBeach.create(seaBeachJson.sea_beach_destinations);

        // ✅ Seed JungleForest collection
        await JungleForest.deleteMany();
        await JungleForest.create(jungleForestJson.jungle_forest_destinations);

         // ✅ Generate holidays for multiple years
        const years = [2025, 2026];
        const holidays = holidaysJson.holidays;
        let allHolidays = [];

        years.forEach((year) => {
            holidays.forEach((h) => {
                if (h.recurring) {
                    // Recurring fixed-date holidays
                    const date = new Date(year, h.month - 1, h.day, 12); // Set time to noon
                    allHolidays.push({
                        name: h.name,
                        date,
                        description: h.description,
                        type: h.type,
                        year: year
                    });
                } else {
                    // Floating holidays with specific dates
                    const date = new Date(h.date);
                    if (date.getFullYear() === year) {
                        allHolidays.push({
                            name: h.name,
                            date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12), // Set time to noon
                            description: h.description,
                            type: h.type,
                            year: year
                        });
                    }
                }
            });
        });

        await Holiday.deleteMany();
        await Holiday.create(allHolidays);
        
        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

start();
