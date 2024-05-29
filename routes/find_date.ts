import { Datemodel } from "../utils/DatesSchema";
import { sendMail } from "../utils/sendMail";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = req.body;

  res.send("user is matching");

  const matches = await Datemodel.find()
    .where("match.email")
    .ne(user.email)
    .where("match")
    .equals("not found")
    .where("state")
    .equals(user.state)
    .where("gender")
    .equals(user.dates_gender)
    .where("dates_gender")
    .equals(user.gender)
    .where("age")
    .gte(user.age_range[0])
    .where("age")
    .lte(user.age_range[1])
    .where("age_range.0")
    .lte(parseInt(user.age))
    .where("age_range.1")
    .gte(parseInt(user.age));

  const randomIndex = Math.floor(Math.random() * matches.length);
  const match = matches[randomIndex];

  if (match != null) {
    sendMail(match.email,user.email)
    user.match = match.email;
    await Datemodel.updateOne({ email: match.email }, { match: user.email });

    await Datemodel.updateOne(
      { email: user.email },
      {
        match: match.email,
        instagram: user.instagram,
        bio: user.bio,
        state: user.state,
        age: user.age,
        age_range: user.age_range,
        gender: user.gender,
        dates_gender: user.dates_gender,
      }
    );
  } else {
    await Datemodel.updateOne(
      { email: user.email },
      {
        instagram: user.instagram,
        bio: user.bio,
        state: user.state,
        age: user.age,
        age_range: user.age_range,
        gender: user.gender,
        dates_gender: user.dates_gender,
        match: "not found",
      }
    );
  }
});

export default router;
