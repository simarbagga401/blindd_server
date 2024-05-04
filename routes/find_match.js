"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../data/date");
var express = require('express');
var router = new express.Router();
router.post("/", function (req, res) {
    var match = date_1.dates.find(function (date) { return date.username == req.body.username; });
    if (match) {
        res.send(match);
    }
    else {
        res.send("user does'nt exists");
    }
});
exports.default = router;
