import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({ username: req.body.username }).exec();

  const match = user?.match;

  await Datemodel.findOneAndUpdate(
    { username: user?.username },
    { match: null }
  ).exec();

  await Datemodel.findOneAndUpdate({ username: match }, { match: "not found" }).exec();
});

export default router;
