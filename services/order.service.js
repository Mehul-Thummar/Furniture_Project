const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

class OrderServices {

    async createOrder(body) {
        try {
            return await Order.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async updateManyCart(body) {
        try {
            return await Cart.updateMany(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdOrder(body) {
        try {
            return await Order.findById(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdAndUpdateOrder(body) {
        try {
            return await Order.findByIdAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

}
module.exports = new OrderServices();
