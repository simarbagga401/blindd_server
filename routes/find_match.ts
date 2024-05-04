import { dates } from "../data/date";
import type { date } from "../types/date";
const express = require('express');
const router = new express.Router();

router.post("/", (req, res) => {
  const match = dates.find((date:date) => date.username == req.body.username);

  if (match) {
    res.send(match);
  } else {
    res.send("user does'nt exists");
  }
});

export default router;
