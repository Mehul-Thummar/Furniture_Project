const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    userSighup,
    userLogin,
    getUserProfile,
    userProfileUpdate,
    userDelete,
    userPasswordChange,
    userForgotPasword,
} = require("../controller/user.controller");

userRoutes.post("/signup", userSighup);
userRoutes.post("/login", userLogin);
userRoutes.get("/profile", verifyToken, getUserProfile);
userRoutes.put("/profileUpdate", verifyToken, userProfileUpdate);
userRoutes.delete("/delete", verifyToken, userDelete);
userRoutes.put("/passwordChange", verifyToken, userPasswordChange);
userRoutes.post("/forgotPassword", userForgotPasword);





module.exports = userRoutes;