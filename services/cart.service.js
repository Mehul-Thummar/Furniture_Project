const Cart = require('../model/cart.model');

class CartServices {

    async findAllCart(query) {
        try {
            //  Pagination
            let pageNo = Number(query.pageNo) || 1;
            let perPage = Number(query.perPage) || 20;
            let skip = (pageNo - 1) * perPage;

            // sorting
            let sortCondition = {
                createdAt: -1
            }
            if (query.sortBy) {
                sortCondition = {}
                sortCondition[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
            }

            // // Searching
            // let cart = query.cartId ? [
            //     {
            //         $match: { cartId: mongoose.Types.ObjectId(query.cartId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
            ]
            let count = await Cart.aggregate(find);
            let result = await Cart.aggregate([...find,
                {
                    $skip: skip,
                },
                {
                    $limit: perPage,
                },]
            );
            let totalPage = Math.ceil(count.length / perPage);
            return {
                totalCount: count.length,
                totalPage,
                currentPage: pageNo,
                result
            }
        }
        catch (err) {
            console.log(err);
            return err;
        }
    };

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
