const express = require("express");
const wishlistRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    addtoWishlist,
    getAllWishlists,
    deleteWishlist
} = require("../controller/wishlist.controller");

wishlistRoutes.post("/addToWishlist", verifyToken, addtoWishlist);
wishlistRoutes.get("/allWishlists", verifyToken, getAllWishlists);
wishlistRoutes.delete("/deleteWishlist", verifyToken, deleteWishlist);



module.exports = wishlistRoutes;