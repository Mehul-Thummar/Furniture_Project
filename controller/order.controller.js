const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const OrderServices = require("../services/order.service");


exports.addNewOrder = async (req, res) => {
    try {
        let carts = await OrderServices.findAllOrder({
            user: req.user._id,
            isDelete: false,
        }).populate({ path: 'productId' });
        if (carts.length === 0) {
            return res.json({ message: 'No Cart Found' });
        }

        let orderItems = carts.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            totalPrice: item.quantity * item.productId.price
        }))
        let amount = orderItems.reduce((total, item) => total += item.totalPrice, 0)
        console.log(amount);


        let order = await OrderServices.createOrder({
            user: req.user._id,
            items: orderItems,
            paidAmount: amount
        });
        await OrderServices.updateManyCart({ user: req.user._id, isDelete: false }, { isDelete: true });
        res.json({ message: 'Order Placed', order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        let order = await OrderServices.findAllOrder({ user: req.user._id, isDelete: false });
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        let order = await OrderServices.findByIdOrder({
            _id: req.query.orderId,
            isDelete: false
        });
        if (!order) {
            return res.status(404).json({ message: "Order Not Founded" });
        }

        order = await OrderServices.findByIdAndUpdateOrder(order._id, { isDelete: true }, { new: true });
        res.status(200).json({ message: "Oreder Deleted SuccessFully", order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

