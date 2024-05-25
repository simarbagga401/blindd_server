import { Datemodel } from "../utils/DatesSchema";
const express = require("express");
const router = new express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

router.post("/", async (req, res) => {
  const user = await Datemodel.findOne({ email: req.body.email });
  const payload = {
    userImageLink: user?.userImageLink,
    password: user?.password,
    instagram: user?.instagram,
    state: user?.state,
    bio: user?.bio,
  };
  res.send(payload);
});


router.put("/", upload.single("file"), async (req, res) => {
  if (req.file == undefined) {
    await Datemodel.updateOne(
      { email: req.body.email },
      {
        password: req.body.password,
        instagram: req.body.instagram,
        state: req.body.state,
        bio: req.body.bio,
      }
    );
  } else {
    let streamifier = require("streamifier");

    let cld_upload_stream = await cloudinary.uploader.upload_stream(
      {
        folder: "images",
      },
      function (error, result) {
        if (error) res.status(500).send("internal server error");
        else {
          Datemodel.updateOne(
            { email: req.body.email },
            {
              userImageLink: result?.secure_url,
              password: req.body.password,
              instagram: req.body.instagram,
              state: req.body.state,
              bio: req.body.bio,
            }
          )
            .then((msg) => console.log("image uploaded"))
            .catch((err) => console.log(err));
          res.send("image uploaded successfully");
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);

    await Datemodel.updateOne({ email: req.body.email }, {});
  }
});

router.delete("/", async (req, res) => {
  await Datemodel.deleteOne(req.body.email);
  res.send("profile deleted");
});

export default router;
