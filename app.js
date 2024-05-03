var express = require("express");
var app = express();
var port = 3000;
var cors = require("cors");
app.use(cors({
    origin: "*",
}));
app.use(express.json());
var dates = [
    {
        username: "swati",
        age: 25,
        gender: "Women",
        dates_gender: "Man",
        age_range: [18, 30],
        match: null,
    },
];
app.post("/find_date", function (req, res) {
    var user = {
        username: req.body.username,
        age: req.body.age,
        age_range: req.body.age_range,
        dates_gender: req.body.dates_gender,
        gender: req.body.gender,
        match: req.body.match,
    };
    var userAlreadyExists = dates.find(function (date) { return date.username == user.username; });
    if (userAlreadyExists) {
        res.send("user already exists");
    }
    else {
        res.send("user is matching");
        var match = dates.find(function (date) {
            return user.age >= date.age_range[0] &&
                user.age <= req.body.age_range[1] &&
                date.gender == req.body.dates_gender;
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
        }
        else {
            dates.push(user);
        }
    }
});
app.post("/find_match", function (req, res) {
    var match = dates.find(function (date) { return date.username == req.body.username; });
    if (match) {
        res.send(match);
    }
    else {
        res.send("error");
    }
});
app.listen(port, function () {
    console.log("app running");
});
