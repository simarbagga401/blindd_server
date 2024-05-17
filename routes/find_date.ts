import { Datemodel } from "../utils/DatesSchema";

const express = require("express");
const router = new express.Router();
const dateLocations = [
  "Bombay to Barcelona Library Café (Marol)",
  "Lotus Cafe (Juhu)",
  "MoMo Cafe (Andheri Kurla Road)",
  "The Nutcracker (Gandhi Marg)",
  "Pondichery Cafe (Bandra East)",
];

router.post("/", async (req, res) => {
  const user = req.body;
  const dateLocation =
    dateLocations[Math.floor(Math.random() * dateLocations.length)];

  res.send("user is matching");

  const matches = await Datemodel.find()
    .where("match.username")
    .ne(user.username)
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

  const randomIndex = Math.floor(Math.random() * matches.length);
  const match = matches[randomIndex];

  if (match != null) {
    user.match = match.username;
    await Datemodel.updateOne(
      { username: match.username },
      { match: user.username, date_location: dateLocation }
    );

    await Datemodel.updateOne(
      { username: user.username },
      {
        match: match.username,
        instagram: user.instagram,
        age: user.age,
        age_range: user.age_range,
        gender: user.gender,
        dates_gender: user.dates_gender,
        date_location: dateLocation,
      }
    );
  } else {
    await Datemodel.updateOne(
      { username: user.username },
      {
        instagram: user.instagram,
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
