const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const mongoose = require("mongoose");
const Product = require("./Product");
const isAuthenticated = require("./isAuthenticated");

app.use(express.json());
mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/product-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Product-Service DB Connected");
    }
);

app.post("/product/buy", isAuthenticated, async (req, res) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    return res.json({ products, userEmail: req.user.email });
});

app.post("/product/create", isAuthenticated, async (req, res) => {
    console.log("Here 1")
    const { name, description, price } = req.body;
    console.log("Here 1")
    const newProduct = new Product({
        name,
        description,
        price,
    });
    console.log(newProduct);
    await newProduct.save();
    return res.json(newProduct);
});

app.listen(PORT, () => {
    console.log("Product-Service at " + PORT);
});