const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const hilltop_routes = require("./routes/hilltopRoutes");
const seaBeach_routes = require("./routes/waterseabeachRoutes");
const jungleForest_routes = require("./routes/jungleforestRoutes");
const historical_routes = require('./routes/historicalRoutes')
const islands_routes = require('./routes/islandsRoutes')
const riversLakes_routes = require('./routes/riverslakesRoutes')
const teaGardens_routes = require('./routes/teagardensRoutes')
const holidaysRoute = require("./routes/holidaysRoute");
const chatRoutes = require("./routes/chatRoutes");


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/hilltops", hilltop_routes);
app.use("/api/seabeaches", seaBeach_routes);
app.use("/api/jungleforests", jungleForest_routes);
app.use('/api/historicals', historical_routes)
app.use('/api/islands', islands_routes)
app.use('/api/riverslakes', riversLakes_routes)
app.use('/api/teagardens', teaGardens_routes)
app.use("/api/holidays", holidaysRoute);
app.use("/api", chatRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
