"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var find_date_1 = require("./routes/find_date");
var find_match_1 = require("./routes/find_match");
var check_match_1 = require("./routes/check_match");
var sign_in_1 = require("./routes/sign_in");
var sign_up_1 = require("./routes/sign_up");
var upload_image_1 = require("./routes/upload_image");
var retry_date_1 = require("./routes/retry_date");
var profile_settings_1 = require("./routes/profile_settings");
require("./utils/mongodb");
var chat_1 = require("./sockets/chat");
var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 8000;
var cors = require("cors");
var io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:3000", "https://blinddd.netlify.app"], //change at deployment
    },
});
// Handle connection
io.on("connection", function (socket) {
    console.log("connected to socket"), (0, chat_1.handleSocketConnection)(socket);
});
app.use(cors({
    origin: ["http://localhost:3000", "https://blinddd.netlify.app"], //change at deployment
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));
app.use("/sign_in", sign_in_1.default);
app.use("/sign_up", sign_up_1.default);
app.use("/upload_image", upload_image_1.default);
app.use("/check_match", check_match_1.default);
app.use("/find_date", find_date_1.default);
app.use("/retry_date", retry_date_1.default);
app.use("/find_match", find_match_1.default);
app.use("/profile_settings", profile_settings_1.default);
server.listen(port, function () {
    console.log("app running");
});
