const express = require("express");
const productRoutes = express.Router();
const {
    addNewProduct,
    getProduct,
    updateProduct,
    deleteProduct,

} = require("../controller/product.controller");


productRoutes.post("/newProduct", addNewProduct);
productRoutes.get("/allProduct", getProduct);
productRoutes.put("/updateProduct", updateProduct);
productRoutes.delete("/deleteProduct", deleteProduct);

module.exports = productRoutes;