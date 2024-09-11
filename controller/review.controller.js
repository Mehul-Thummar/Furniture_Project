const Review = require("../model/review.model.js");
const reviewService = require('../services/review.service.js');

exports.addNewReview = async (req, res) => {
    try {
        let review = await reviewService.findOneReview({
            user: req.user._id,
            productId: req.body.productId,
            isDelete: false,
        });
        review = await reviewService.createReview({
            user: req.user._id,
            ...req.body,
        });
        res.status(201).json({ message: "Product Review Added In Review list", review });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getAllReview = async (req, res) => {
    try {
        let result = await reviewService.getAllReview(req.query, req.user._id)
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}