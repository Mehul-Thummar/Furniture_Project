const Cart = require('../model/cart.model');

class CartServices {

    async createCart(body) {
        try {
            return await Cart.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneCart(body) {
        try {
            return await Cart.findOne(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdCart(body) {
        try {
            return await Cart.findById(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneAndUpdateCart(body) {
        try {
            return await Cart.findOneAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdAndUpdateCart(body) {
        try {
            return await Cart.findByIdAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

}
module.exports = new CartServices();
