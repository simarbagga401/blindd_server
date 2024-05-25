import { Datemodel } from "../utils/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    email: req.body.email,
  }).exec();


  if (user == null) {
    const newUser = await Datemodel.create({
      email: req.body.email,
      password: req.body.password,
      match:null
    });
    newUser.save();
    res.send("new user created");
  } else {
    res.send("email already exists");
  }
});

export default router;
