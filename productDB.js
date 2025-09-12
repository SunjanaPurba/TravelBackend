require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const Hilltop = require('./models/hilltop'); // ✅ Capitalize model name
const seaBeach = require('./models/waterseabeach');
const jungleForest = require('./models/jungleforest');

const ProductsJson = require('./products.json');
const hillTopJson = require('./hilltop.json');
const seaBeachJson = require('./waterseabeach.json');
const jungleForestJson = require('./jungleforest.json');


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

        // Seed SeaBeach collection
        await seaBeach.deleteMany();
        await seaBeach.create(seaBeachJson.sea_beach_destinations);

        // Seed JungleForest collection
        await jungleForest.deleteMany();
        await jungleForest.create(jungleForestJson.jungle_forest_destinations);

        
        console.log('✅ Database seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

start();

