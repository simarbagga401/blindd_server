require("dotenv").config();
import find_date_routes from "./routes/find_date";
import find_match_routes from "./routes/find_match";
import sign_in_routes from "./routes/sign_in";
import sign_up_routes from "./routes/sign_up";
import "./data/mongodb";

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*", //change at deployment
  })
);
app.use(express.json());

app.use("/sign_in", sign_in_routes);
app.use("/sign_up", sign_up_routes);
app.use("/find_date", find_date_routes);
app.use("/find_match", find_match_routes);

app.listen(port, () => {
  console.log("app running");
});
