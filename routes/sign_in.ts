import { Datemodel } from "../data/DatesSchema";

const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({
    username: req.body.username,
  }).exec();

  if (user == null) {
    res.send({ msg: "user does'nt exists" });
  } else {
    user.password == req.body.password
      ? res.send({ msg: "sign in successful", match: user.match })
      : res.send({ msg: "wrong password" });
  }
});

export default router;
