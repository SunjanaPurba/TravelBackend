// const mongoose = require('mongoose');
// const connectDB =  (uri) => {
//     console.log("Connecting to database...");
//     return mongoose.connect(uri);
// };

// module.exports = connectDB;



const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
