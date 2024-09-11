const Wishlist = require("../model/wishlist.model");
const WishlistServices = require("../services/wishlist.service");


exports.addtoWishlist = async (req, res) => {
    try {
        let wishlist = await WishlistServices.findOneWishlist({
            user: req.user._id,
            productId: req.body.productId,
            isDelete: false,
        });
        if (wishlist) {
            return res.json({ message: "Product Already Existed in Wishlist." });
        }
        wishlist = await WishlistServices.createWishlist({
            user: req.user._id,
            ...req.body,
        });
        res.status(201).json({ message: "Product Added To wishlist", wishlist });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllWishlists = async (req, res) => {
    try {
        let wishlists = await WishlistServices.findAllWishlist({ user: req.user._id, isDelete: false });
        res.json(wishlists);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteWishlist = async (req, res) => {
    try {
        let wishlist = await WishlistServices.findByIdWishlist({ _id: req.query.wishlistId, isDelete: false });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist Not Founded" });
        }
        wishlist = await WishlistServices.findByIdAndUpdateWishlist(wishlist._id, { isDelete: true }, { new: true });
        res.status(200).json({ message: "Wishlist Deleted SuccessFully", wishlist });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};