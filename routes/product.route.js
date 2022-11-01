const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} = require("../controllers/product.controller");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct);

module.exports = router;
