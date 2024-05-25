import mongoose from "mongoose";

const Date = new mongoose.Schema({
  email: String,
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
  bio: String,
  state: String,
});

export const Datemodel = mongoose.model("Dates", Date);
