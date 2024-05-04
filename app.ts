import find_date_routes from "./routes/find_date";
import find_match_routes from "./routes/find_match";

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/find_date", find_date_routes);

app.use("/find_match", find_match_routes);

app.listen(port, () => {
  console.log("app running");
});
