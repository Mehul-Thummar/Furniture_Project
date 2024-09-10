const Cart = require("../model/cart.model");

exports.addtoCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.user._id,
            productId: req.body.productId,
            isDelete: false,
        });
        if (cart) {
            cart.quantity += req.body.quantity;
            await cart.save();
            return res.json({ message: "Already Exist So, Quantity Added", cart });
        }
        cart = await Cart.create({
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
        let carts = await Cart.find({ user: req.user._id, isDelete: false });
        res.json(carts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        let cart = await Cart.findById(req.query.cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await Cart.findOneAndUpdate({ _id: cart._id }, req.body, { new: true });
        res.status(202).json({ message: "Cart Updated SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await Cart.findById({ _id: req.query.cartId, isDelete: false });
        if (!cart) {
            return res.status(404).json({ message: "Cart Not Founded" });
        }
        cart = await Cart.findByIdAndUpdate(cart._id, { isDelete: true }, { new: true });
        res.status(200).json({ message: "Cart Deleted SuccessFully", cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};