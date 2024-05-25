import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    email: req.body.email,
  }).exec();

  if (user?.match == "not found") {
    res.send("not found");
  } else {
    const match = await Datemodel.findOne({ email: user?.match });
    if (user && match != null)
      res.send({
        email: match.email,
        userImageLink: match.userImageLink,
        instagram: match.instagram,
        age: match.age,
        bio:match.bio,
        state:match.state,
      });
  }
});

export default router;
