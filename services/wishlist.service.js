const Wishlist = require('../model/wishlist.model');


class WishlistServices {

    async findAllWishlist(query) {
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
            // let wishlist = query.wishlistId ? [
            //     {
            //         $match: { wishlistId: mongoose.Types.ObjectId(query.wishlistId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
            ]
            let count = await Wishlist.aggregate(find);
            let result = await Wishlist.aggregate([...find,
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
    async createWishlist(body) {
        try {
            return await Wishlist.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneWishlist(body) {
        try {
            return await Wishlist.findOne(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findByIdWishlist(body) {
        try {
            return await Wishlist.findById(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };
   
    async findByIdAndUpdateWishlist(body) {
        try {
            return await Wishlist.findByIdAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

}
module.exports = new WishlistServices();
