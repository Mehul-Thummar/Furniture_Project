const Cart = require("../model/cart.model");
const CartServices = require("../services/cart.service");


exports.addtoCart = async (req, res) => {
    try {
        let cart = await CartServices.findOneCart({
            user: req.user._id,
            productId: req.body.productId,
            isDelete: false
        });
        if (cart) {
            cart.quantity += req.body.quantity;
            await cart.save();
            return res.json({ message: "Already Exist So, Quantity Added", cart });
        }
        cart = await CartServices.createCart({
            user: req.user._id,
            ...req.body,
        });
        res.status(201).json({ message: "Cart Added", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        let carts = await CartServices.findAllCart({ user: req.user._id, isDelete: false });
        res.json(carts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        let cart = await CartServices.findByIdCart(req.query.cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await CartServices.findOneAndUpdateCart(
            { _id: cart._id },
            req.body,
            { new: true });
        res.status(202).json({ message: "Cart Updated SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await CartServices.findByIdCart({
            _id: req.query.cartId,
            isDelete: false
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await CartServices.findByIdAndUpdateCart(
            cart._id,
            { isDelete: true },
            { new: true });
        res.status(200).json({ message: "Cart Deleted SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};