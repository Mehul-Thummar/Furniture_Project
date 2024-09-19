const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const { upload } = require("../helpers/imageUpload");
const {
    userSighup,
    getAllUser,
    userLogin,
    getUserProfile,
    userProfileUpdate,
    userDelete,
    userPasswordChange,
    userForgotPasword,
    userResetPasword,
} = require("../controller/user.controller");

userRoutes.post("/signup", upload.single('profileImage'), userSighup);
userRoutes.get("/allUsers", getAllUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/profile", verifyToken, getUserProfile);
userRoutes.put("/profileUpdate", verifyToken, upload.single('profileImage'), userProfileUpdate);
userRoutes.delete("/delete", verifyToken, userDelete);
userRoutes.put("/passwordChange", verifyToken, userPasswordChange);
userRoutes.post("/forgotPassword", userForgotPasword);
userRoutes.post("/resetPassword", userResetPasword);


module.exports = userRoutes;