import mongoose from "mongoose";

const Date = new mongoose.Schema({
  username: String,
  password: String,
  userImageLink: String,
  instagram: String,
  match: Object,
  gender: String,
  age: Number,
  age_range: {
    type: Array,
    defualt: undefined,
  },
  dates_gender: String,
  date_location: String,
});

export const Datemodel = mongoose.model("Dates", Date);
