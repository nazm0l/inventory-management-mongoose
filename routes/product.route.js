const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/product.controller");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getSingleProduct);

module.exports = router;
