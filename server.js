require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const dbURL = process.env.MONGO_URL;
const mongoose = require("mongoose");
const path = require("path");

const indexRoutes = require("./routes/index.routes");

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/public/images", express.static(path.join(__dirname, "public/images")))
server.use("/public", express.static(path.join(__dirname, "public")))


server.get("/", (req, res) => {
    res.send("Welcome to Furniture App Server");
});

server.use("/", indexRoutes);

server.listen(8020, () => {

    // Database Connection
    mongoose
        .connect(dbURL)
        .then(() => console.log("Database Connection Established Success...."))
        .catch((err) => console.log(err));

    console.log(`Server start at http://localhost:8020`);
});