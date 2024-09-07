require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const dbURL = process.env.MONGO_URL;
const mongoose = require("mongoose");


const userRoutes = require("./routes/user.routes");


server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get("/", (req, res) => {
    res.send("Welcome to Furniture App Server");
});


server.use("/api/user", userRoutes);






server.listen(8020, () => {

    // Database Connection
    mongoose
        .connect(dbURL)
        .then(() => console.log("Database Connection Established Success...."))
        .catch((err) => console.log(err));

    console.log(`Server start at http://localhost:8020`);
});