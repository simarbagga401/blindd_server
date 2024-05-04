"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_date_1 = require("./routes/find_date");
var find_match_1 = require("./routes/find_match");
var express = require("express");
var app = express();
var port = 3000;
var cors = require("cors");
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use("/find_date", find_date_1.default);
app.use("/find_match", find_match_1.default);
app.listen(port, function () {
    console.log("app running");
});
