const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
    mobileNo: Number,
    profileImage: { type: String },
    address: { line1: String, line2: String, pincode: Number },
    city: { type: String },
    district: { type: String },
    country: { type: String },

    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false, timestamps: true
});

module.exports = mongoose.model('users', userSchema);