const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Insert new product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete product
router.get("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
