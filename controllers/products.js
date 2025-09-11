const  Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
};

const getAllProductsTesting = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
};

module.exports = {
    getAllProducts,
    getAllProductsTesting
};