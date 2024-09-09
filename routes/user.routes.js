const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    userSighup,
    userLogin,
    userLogout,
    getUserProfile,
    userProfileUpdate,
    userDelete,
    userPasswordChange,
} = require("../controller/user.controller");

userRoutes.post("/signup", userSighup);
userRoutes.post("/login", userLogin);
// userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.get("/profile", verifyToken, getUserProfile);
userRoutes.put("/profileUpdate", verifyToken, userProfileUpdate);
userRoutes.delete("/delete", verifyToken, userDelete);
userRoutes.put("/passwordChange", verifyToken, userPasswordChange);




module.exports = userRoutes;