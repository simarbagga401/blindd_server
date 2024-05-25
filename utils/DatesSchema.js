"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datemodel = void 0;
var mongoose_1 = require("mongoose");
var Date = new mongoose_1.default.Schema({
    email: String,
    password: String,
    userImageLink: String,
    instagram: String,
    match: Object,
    gender: String,
    age: Number,
    age_range: {
        type: Array,
        defualt: undefined,
    },
    dates_gender: String,
    date_location: String,
});
exports.Datemodel = mongoose_1.default.model("Dates", Date);
