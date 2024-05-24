require("dotenv").config();
import find_date_routes from "./routes/find_date";
import find_match_routes from "./routes/find_match";
import check_match_routes from "./routes/check_match";
import sign_in_routes from "./routes/sign_in";
import sign_up_routes from "./routes/sign_up";
import upload_image_routes from "./routes/upload_image";
import retry_date_routes from "./routes/retry_date";
import "./utils/mongodb";
import { handleSocketConnection } from "./sockets/chat";

const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const cors = require("cors");

const io = require("socket.io")(server,{
  cors:{
    origin: ["http://localhost:3000","https://blinddd.netlify.app"], //change at deployment
  }
});

// Handle connection
io.on("connection", (socket) => {
  console.log("connected to socket"), handleSocketConnection(socket);
});

app.use(
  cors({
    origin: ["http://localhost:3000","https://blinddd.netlify.app"], //change at deployment
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));

app.use("/sign_in", sign_in_routes);
app.use("/sign_up", sign_up_routes);
app.use("/upload_image", upload_image_routes);
app.use("/check_match", check_match_routes);
app.use("/find_date", find_date_routes);
app.use("/retry_date", retry_date_routes);
app.use("/find_match", find_match_routes);

server.listen(port, () => {
  console.log("app running");
});
