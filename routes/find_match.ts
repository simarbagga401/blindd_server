import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    username: req.body.username,
  }).exec();

  if (user?.match == "not found") {
    res.send("not found");
  } else {
    const match = await Datemodel.findOne({ username: user?.match });
    if (user)
      res.send({
        username: user.username,
        userImageLink: user.userImageLink,
        instagram: user.instagram,
        age: user.age,
        dates_location: user.date_location,
      });
  }
});

export default router;
