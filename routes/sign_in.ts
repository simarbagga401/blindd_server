import type { date } from "../types/date";
import { Datemodel } from "../data/DatesSchema";
import mongoose from "mongoose";

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
    console.log(user,user.password)
  }
});

export default router;
