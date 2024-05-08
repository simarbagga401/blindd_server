import { Datemodel } from "../data/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const match = await Datemodel.findOne({
    username: req.body.username,
  }).exec();

  if (match) res.send(match.match);
});

export default router;
