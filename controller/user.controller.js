const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSighup = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: 'User Already Existed....' });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.json({ message: 'User Password And Confirm Password Are Not Match.' });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        let hashconfirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);
        user = await User.create({ ...req.body, password: hashPassword, confirmPassword: hashconfirmPassword });
        res.status(201).json({ message: "SighUp SuccessFully Done.", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.userLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.json({ message: 'User Not Found....' });
        }
        let comparedPassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparedPassword) {
            return res.json({ message: "Email or Password Does Not Matched." })
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ message: "Login SuccessFully Done.", token });
        // res.cookie("jwt", `Bearer ${token}`)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// exports.userLogout = async (req, res) => {
//     try {
//         // res.clearCookie('jwt');
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// };

exports.getUserProfile = async (req, res) => {
    try {
        res.json(req.user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.userProfileUpdate = async (req, res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true });
        res.status(202).json({ message: "User Profile Updated", user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.userDelete = async (req, res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true });
        res.status(200).json({ message: "User Profile Deleted SuccessFully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.userPasswordChange = async (req, res) => {
    try {
        let user = req.user;
        let comparedoldPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!comparedoldPassword) {
            return res.json({ message: "Password Does Not Matched." })
        }
        // let comparedNewPassword = await bcrypt.compare(req.body.newPassword, user.password);
        // if (comparedNewPassword) {
        if (req.body.oldPassword === req.body.newPassword) {
            return res.json({ message: "Old-Password and New-Password Are Same, Try Different" })
        }
        let hashPassword = await bcrypt.hash(req.body.newPassword, 10);
        user = await User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
        res.status(200).json({ message: "Password Change SuccessFully Done." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

