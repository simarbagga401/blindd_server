import { dates } from "../data/date";
import type { date } from "../types/date";

const express = require("express");
const router = new express.Router();

router.post("/", (req, res) => {
  const user: date = req.body;

  const userAlreadyExists = dates.find(
    (date: date) => date.username == user.username
  );

  if (userAlreadyExists) {
    res.send("user already exists");
  } else {
    res.send("user is matching");
    const match = dates.find(
      (date: date) =>
        user.age >= date.age_range[0] &&
        user.age <= date.age_range[1] &&
        date.age >= user.age_range[0] &&
        date.age >= user.age_range[1] &&
        user.gender == date.dates_gender &&
        date.gender == user.dates_gender 
    );

    if (match) {
      user.match = match.username;
      match.match = user.username;
      dates.push(user);
    } else {
      dates.push(user);
    }
  }
});

export default router;
