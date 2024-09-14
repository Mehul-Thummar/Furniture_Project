const express = require("express");
const productRoutes = express.Router();
const { upload } = require("../helpers/imageUpload");
const {
    addNewProduct,
    getProduct,
    updateProduct,
    deleteProduct,

} = require("../controller/product.controller");


productRoutes.post("/newProduct", upload.single('productImage'), addNewProduct);
productRoutes.get("/allProduct", getProduct);
productRoutes.put("/updateProduct", upload.single('productImage'), updateProduct);
productRoutes.delete("/deleteProduct", deleteProduct);

module.exports = productRoutes;