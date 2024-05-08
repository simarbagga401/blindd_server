import { Datemodel } from "../data/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  res.send("user is matching");

  const match = await Datemodel.findOne()
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

  console.log(match);

  if (match != null) {
    user.match = match.username;
    await Datemodel.updateOne(
      { username: match.username },
      { match: user.username }
    );
    const newUser = await Datemodel.create(user);
    newUser.save();
  } else {
    const newUser = await Datemodel.create(user);
    newUser.save();
  }
});

export default router;
