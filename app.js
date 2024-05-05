"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var find_date_1 = require("./routes/find_date");
var find_match_1 = require("./routes/find_match");
var sign_in_1 = require("./routes/sign_in");
var sign_up_1 = require("./routes/sign_up");
require("./data/mongodb");
var express = require("express");
var app = express();
var port = 3000;
var cors = require("cors");
app.use(cors({
    origin: "*", //change at deployment
}));
app.use(express.json());
app.use("/sign_in", sign_in_1.default);
app.use("/sign_up", sign_up_1.default);
app.use("/find_date", find_date_1.default);
app.use("/find_match", find_match_1.default);
app.listen(port, function () {
    console.log("app running");
});
