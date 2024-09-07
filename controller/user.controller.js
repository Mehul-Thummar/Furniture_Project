const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSighup = async (req, res) => {
    try {
        // console.log(req.body);
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: 'User Already Existed....' });
        }
        // confirmPassword = ;
        // if (req.body.password === req.body.confirmPassword) {
        //     return res.json({ message: 'User Password And Confirm Password Are Not Match.' });
        // }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashPassword);
        user = await User.create({ ...req.body, password: hashPassword });
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
        // console.log(comparedPassword);
        if (!comparedPassword) {
            return res.json({ message: "Email or Password Does Not Matched." })
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ message: "Login SuccessFully Done.", token });
        res.cookie("jwt", `Bearer ${token}`)
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