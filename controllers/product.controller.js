const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);

    const data = await product.save();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};
