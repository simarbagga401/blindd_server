import { Datemodel } from "../data/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    username: req.body.username,
  }).exec();


  if (user == null) {
    res.send("user does'nt exists");
  } else {
    user.password == req.body.password
      ? res.send("sign in successful")
      : res.send("wrong password");
  }
});

export default router;
