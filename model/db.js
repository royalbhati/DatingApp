const mongoose = require("mongoose");
const url =
  "mongodb+srv://royal:royal123@cluster0-uo6jd.mongodb.net/findmyboo?retryWrites=true";
mongoose
  .connect(
    "mongodb+srv://royal:royal123@cluster0-uo6jd.mongodb.net/findmyboo?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connected");
  });
