const {
  getProductsService,
  createProductService,
  updateProductService,
  getSingleProductService,
  bulkUpdateProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const products = await getSingleProductService(req.params.id);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.bulkProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};
