const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");
const hilltop_routes = require("./routes/hilltopRoutes");
const seaBeach_routes = require("./routes/waterseabeachRoutes");
const jungleForest_routes = require("./routes/jungleforestRoutes");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/products", products_routes);
app.use("/api/hilltops", hilltop_routes);
app.use("/api/seabeaches", seaBeach_routes);
app.use("/api/jungleforests", jungleForest_routes);


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();