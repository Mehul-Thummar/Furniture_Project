const express = require("express");
const cartRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    addtoCart,
    getAllCarts,
    updateCart,
    deleteCart
} = require("../controller/cart.controller");

cartRoutes.post("/addToCart", verifyToken, addtoCart);
cartRoutes.get("/allCarts", verifyToken, getAllCarts);
cartRoutes.put("/updateCart", verifyToken, updateCart);
cartRoutes.delete("/deleteCart", verifyToken, deleteCart);



module.exports = cartRoutes;