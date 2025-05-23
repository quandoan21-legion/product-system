const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

mongoose.connect("mongodb://localhost:27017/productsystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const Product = require("./models/product");
const productRoutes = require("./routes/product");
app.use("/", productRoutes);

app.get("/", async (req, res) => {
  const products = await Product.find({}).sort({ ProductStoreCode: -1 });
  res.render("index", { products });
});

app.listen(3000, () => console.log("Server running on port 3000"));
