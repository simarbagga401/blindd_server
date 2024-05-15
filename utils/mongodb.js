"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
if (process.env.DB_URI)
    mongoose_1.default.connect(process.env.DB_URI);
