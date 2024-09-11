const { default: mongoose } = require('mongoose');
const User = require('../model/user.model');


class UserServices {
    async findAllUser(query) {
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
            // let user = query.userId ? [
            //     {
            //         $match: { userId: mongoose.Types.ObjectId(query.userId) }
            //     }
            // ] : []
            let find = [
                {
                    $match: { isDelete: false }
                },
            ]
            let count = await User.aggregate(find);
            let result = await User.aggregate([...find,
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

    async createUser(body) {
        try {
            return await User.create(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    async findOneUser(body) {
        try {
            return await User.findOne(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

    
    async findByIdAndUpdateUser(body) {
        try {
            return await User.findByIdAndUpdate(body);
        } catch (err) {
            console.log(err);
            return err;
        }
    };

}
module.exports = new UserServices();
