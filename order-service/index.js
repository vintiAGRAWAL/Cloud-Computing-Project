const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const mongoose = require("mongoose");
const Order = require("./Order");
const isAuthenticated = require("./isAuthenticated");

mongoose.connect(
    process.env.MONGO_URI|| "mongodb://localhost:27017/order-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Order-Service DB Connected");
    }
);

app.use(express.json());

app.post("/orders", isAuthenticated, async (req, res) => {
    const { products } = req.body;
    const userEmail = req.user.email;
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", newOrder });
});

app.listen(PORT, () => {
    console.log("Order-Service at" +PORT);
});
