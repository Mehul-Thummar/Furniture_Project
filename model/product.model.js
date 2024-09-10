const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    brandName: { type: String },
    price: { type: Number },
    category: { type: String },
    productImage: String,
    stock: { type: Number },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    versionkey: false, timestamps: true
});

module.exports = mongoose.model('products', productSchema);