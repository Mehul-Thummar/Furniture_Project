const { default: mongoose } = require('mongoose');
const Review = require('../model/review.model.js');


class ReviewServices {

    async getAllReview(query, userId) {
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

            // Searching
            let user = query.me && query.me === "true" ? [
                {
                    $match: { user: userId }
                }
            ] : []
            let product = query.productId ? [
                {
                    $match: { productId: new mongoose.Types.ObjectId(query.productId) }
                }
            ] : []

            // let search = query.search
            //     ? [
            //         {
            //             $match: {
            //                 $or: [
            //                     {
            //                         title: {
            //                             $regex: query.search.trim().replace(/\s+/g, " "),
            //                             $options: "i",
            //                         },
            //                     },
            //                     {
            //                         description: {
            //                             $regex: query.search.trim().replace(/\s+/g, " "),
            //                             $options: "i",
            //                         },
            //                     },
            //                     {
            //                         price: Number(query.search),
            //                     },
            //                 ],
            //             },
            //         },
            //     ]
            //     : [];

            let find = [
                {
                    $match: { isDelete: false }
                },
                ...user,
                ...product,
                // ...search,
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: "user",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    profileImage: 1,
                                    email: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $set: { "user": { $first: "$user" } }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: "productId",
                        pipeline: [
                            {
                                $project: {
                                    title: 1,
                                    price: 1,
                                    category: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $set: { "productId": { $first: "$productId" } }
                },
                {
                    $sort: sortCondition
                }
            ];

            let count = await Review.aggregate(find);
            let result = await Review.aggregate([...find,
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

    async findOneReview(body) {
        try {
            return await Review.findOne(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async createReview(body) {
        try {
            return await Review.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

}
module.exports = new ReviewServices();
