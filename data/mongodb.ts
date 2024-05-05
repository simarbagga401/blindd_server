import mongoose from "mongoose";

if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI);
}
