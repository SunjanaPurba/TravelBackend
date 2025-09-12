require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const Hilltop = require('./models/hilltop'); // ✅ Capitalize model name

const ProductsJson = require('./products.json');
const hillTopJson = require('./hilltop.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);

        // Seed Product collection
        await Product.deleteMany();
        await Product.create(ProductsJson);

        // ✅ Seed Hilltop collection
        // The JSON has { "hilltop_destinations": [ ... ] }
        await Hilltop.deleteMany();
        await Hilltop.create(hillTopJson.hilltop_destinations);

        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

start();

