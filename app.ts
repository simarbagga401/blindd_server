type date = {
  username: string;
  match: object | null;
  gender: "Man" | "Women";
  age: number;
  dates_gender: "Man" | "Women";
  age_range: Array<number>;
};

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const dates: Array<date> = [
  {
    username: "swati",
    age: 25,
    gender: "Women",
    dates_gender: "Man",
    age_range: [18, 30],
    match: null,
  },
];

app.post("/find_date", (req, res) => {
  const user: date = {
    username: req.body.username,
    age: req.body.age,
    age_range: req.body.age_range,
    dates_gender: req.body.dates_gender,
    gender: req.body.gender,
    match: req.body.match,
  };

  const userAlreadyExists = dates.find(
    (date) => date.username == user.username
  );

  if (userAlreadyExists) {
    res.send("user already exists");
  } else {
    res.send("user is matching");
    const match = dates.find(
      (date) =>
        user.age >= date.age_range[0] &&
        user.age <= req.body.age_range[1] &&
        date.gender == req.body.dates_gender
    );

    if (match) {
      const userCopy: date = {
        username: user.username,
        age: user.age,
        age_range: user.age_range,
        dates_gender: user.dates_gender,
        gender: user.gender,
        match: user.match,
      };

      user.match = match;
      match.match = userCopy;
    } else {
      dates.push(user);
    }
  }
});

app.post("/find_match", (req, res) => {
  const match = dates.find((date) => date.username == req.body.username);

  if (match) {
    res.send(match);
  } else {
    res.send("error");
  }
});

app.listen(port, () => {
  console.log("app running");
});
