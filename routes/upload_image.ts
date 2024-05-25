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

router.post("/", upload.single("file"), async (req, res) => {
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
          { userImageLink: result?.secure_url }
        )
          .then((msg) => console.log("image uploaded"))
          .catch((err) => console.log(err));
        res.send("image uploaded successfully");
      }
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
});

export default router;
