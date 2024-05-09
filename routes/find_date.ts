import { Datemodel } from "../data/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  res.send("user is matching");

  const match = await Datemodel.findOne()
    .where("match")
    .equals("not found")
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

  if (match != null) {
    user.match = match.username;
    await Datemodel.updateOne(
      { username: match.username },
      { match: user.username }
    );

    await Datemodel.updateOne(
      { username: user.username },
      {
        match: match.username,
        age: user.age,
        age_range: user.age_range,
        gender: user.gender,
        dates_gender: user.dates_gender,
      }
    );
  } else {
    await Datemodel.updateOne(
      { username: user.username },
      {
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
