const mongoose = require('mongoose');
const connectDB =  (uri) => {
    console.log("Connecting to database...");
    return mongoose.connect(uri);
};

module.exports = connectDB;
