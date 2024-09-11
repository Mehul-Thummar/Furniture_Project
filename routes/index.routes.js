const express = require("express");
const indexRoutes = express.Router();

const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const wishlistRoutes = require("./wishlist.routes");
const reviewRoutes = require("./review.routes");

indexRoutes.use("/api/user", userRoutes);
indexRoutes.use("/api/product", productRoutes);
indexRoutes.use("/api/cart", cartRoutes);
indexRoutes.use("/api/order", orderRoutes);
indexRoutes.use("/api/wishlist", wishlistRoutes);
indexRoutes.use("/api/review", reviewRoutes);


module.exports = indexRoutes;