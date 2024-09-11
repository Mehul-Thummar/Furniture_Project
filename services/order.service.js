const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

class OrderServices {

    async findAllOrder(query) {
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
            // let order = query.orderId ? [
            //     {
            //         $match: { orderId: mongoose.Types.ObjectId(query.orderId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
            ]
            let count = await Order.aggregate(find);
            let result = await Order.aggregate([...find,
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
