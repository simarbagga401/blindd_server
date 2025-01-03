import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    email: req.body.email,
  }).exec();

  const match = user?.match; 
  if (user) res.send(match);
});

export default router;
