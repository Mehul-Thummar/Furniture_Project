const express = require("express");
const productRoutes = express.Router();
const {
    addNewProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,

} = require("../controller/product.controller");


productRoutes.post("/newProduct", addNewProduct);
productRoutes.get("/allProduct", getAllProduct);
productRoutes.get("/product", getProduct);
productRoutes.put("/updateProduct", updateProduct);
productRoutes.delete("/deleteProduct", deleteProduct);

module.exports = productRoutes;