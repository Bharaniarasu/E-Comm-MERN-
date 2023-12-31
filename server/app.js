const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
//defined on top of the application to get env data on payment controller
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const products = require("./routes/products");
const authentication = require("./routes/authentication");
const order = require("./routes/order");
const payment = require("./routes/payment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

//set uploads folter to static to access files from that folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ credentials: true, origin: true }));
//to set express to accept json post request
app.use(express.json());
// with out cookie parser we cannot get cookies // it will undefined always
app.use(cookieParser());
app.use("/api/v1", products);
app.use("/api/v1", authentication);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//if url not matches it came to the below middleware
app.use(errorMiddleware);
module.exports = app;
