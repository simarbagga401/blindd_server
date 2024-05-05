import mongoose from "mongoose";

const Date = new mongoose.Schema({
  username: String,
  password:String,
  match: Object,
  gender: String,
  age: Number,
  age_range: Array,
  dates_gender: String,
});

export const Datemodel =  mongoose.model("Dates", Date);
