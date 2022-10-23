const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//Schema

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Need Product Name"],
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 70,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "litre", "pcs"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["in-stock", "out-of-stock", "discontinued"],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

//Middleware

ProductSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

//Model

const Product = mongoose.model("Product", ProductSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
  try {
    const product = new Product(req.body);

    const data = await product.save();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

//Get all Product
app.get("/api/v1/product", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

//Get Single Product
app.get("/api/v1/product/:id", async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

module.exports = app;
