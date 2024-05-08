import { Datemodel } from "../data/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    username: req.body.username,
  }).exec();


  if (user == null) {
    const newUser = await Datemodel.create({
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save();
    res.send("new user created");
  } else {
    res.send("username already exists");
  }
});

export default router;
