import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({ email: req.body.email }).exec();

  const match = user?.match;

  await Datemodel.findOneAndUpdate(
    { email: user?.email },
    { match: null }
  ).exec();

  await Datemodel.findOneAndUpdate({ email: match }, { match: "not found" }).exec();
});

export default router;
