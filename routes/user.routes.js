const express = require("express");
const userRoutes = express.Router();
const { verifyToken } = require('../helpers/verifyToken');
const {
    userSighup,
    userLogin,
    userLogout,
} = require("../controller/user.controller");

userRoutes.post("/signup", userSighup);
userRoutes.post("/login", userLogin)
// userRoutes.get("/logout", verifyToken, userLogout)



module.exports = userRoutes;