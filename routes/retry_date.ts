import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  await Datemodel.findOneAndUpdate(
    { username: req.body.username },
    { match: null }
  ).exec();

  await Datemodel.findOneAndUpdate(
    { username: req.body.match },
    { match: null }
  ).exec();
});

export default router;
