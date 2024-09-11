const express = require("express");
const reviewRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    addNewReview,
    getAllReview
} = require('../controller/review.controller');

reviewRoutes.post("/newReview", verifyToken, addNewReview);
reviewRoutes.get("/allReview", verifyToken, getAllReview);


module.exports = reviewRoutes;