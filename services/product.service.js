const { default: mongoose } = require('mongoose');
const Product = require('../model/product.model');


class ProductServices {
    async getProduct(query) {
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

            // Get Product By Id 
            let product = query.productId ? [
                {
                    $match: { _id: new mongoose.Types.ObjectId(query.productId) }
                }
            ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
                ...product
            ]
            console.log(find);
            let count = await Product.aggregate(find);
            let result = await Product.aggregate([...find,
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

    async createProduct(body) {
        try {
            return await Product.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneProduct(body) {
        try {
            return await Product.findOne(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdProduct(body) {
        try {
            return await Product.findById(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneAndUpdateProduct(body) {
        try {
            return await Product.findOneAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

}
module.exports = new ProductServices();
