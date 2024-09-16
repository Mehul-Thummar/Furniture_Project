const Product = require("../model/product.model");
const ProductServices = require("../services/product.service");
const { uploadCloudinary } = require("../helpers/cloudinary");


exports.addNewProduct = async (req, res) => {
    try {
        let product = await ProductServices.findOneProduct({
            title: req.body.title,
            isDelete: false,
        });
        if (product) {
            return res.status(400).json({ message: 'Product Already Existed....' });
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/");
            imagePath = await uploadCloudinary(imagePath);
        }
        product = await ProductServices.createProduct({
            ...req.body,
            productImage: imagePath.url,
        });
        res.status(201).json({ message: "Product Add SuccessFully.", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        let products = await ProductServices.getProduct(req.query);
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
};


exports.updateProduct = async (req, res) => {
    try {
        let product = await ProductServices.findByIdProduct(req.body.productId);
        if (!product) {
            return res.status(404).json({ message: "Product Not Founded" });
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/");
            imagePath = await uploadCloudinary(imagePath);
            product.productImage = imagePath.url
            await product.save();
        }
        product = await ProductServices.findOneAndUpdateProduct(product._id, req.body);
        res.status(202).json({ message: "Product Updated SuccessFully", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let product = await ProductServices.findByIdProduct({
            _id: req.query.productId,
            isDelete: false
        });
        if (!product) {
            return res.status(404).json({ message: "Product Not Founded" });
        }

        product = await ProductServices.findOneAndUpdateProduct(
            product._id,
            { isDelete: true },
            { new: true });
        res.status(200).json({ message: "Product Deleted SuccessFully", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};