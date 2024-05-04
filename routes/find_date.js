"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("../data/date");
var express = require("express");
var router = new express.Router();
router.post("/", function (req, res) {
    var user = req.body;
    var userAlreadyExists = date_1.dates.find(function (date) { return date.username == user.username; });
    if (userAlreadyExists) {
        res.send("user already exists");
    }
    else {
        res.send("user is matching");
        var match = date_1.dates.find(function (date) {
            return user.age >= date.age_range[0] &&
                user.age <= date.age_range[1] &&
                date.age >= user.age_range[0] &&
                date.age >= user.age_range[1] &&
                user.gender == date.dates_gender &&
                date.gender == user.dates_gender;
        });
        if (match) {
            var userCopy = {
                username: user.username,
                age: user.age,
                age_range: user.age_range,
                dates_gender: user.dates_gender,
                gender: user.gender,
                match: user.match,
            };
            user.match = match;
            match.match = userCopy;
            date_1.dates.push(user);
        }
        else {
            date_1.dates.push(user);
        }
    }
});
exports.default = router;
