const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const passport = require("passport");
var path = require("path");
//DB
require("./model/db");

//Routes
const userRoute = require("./routes/user");
const UIRoute = require("./routes/userInteractions");

const app = express();

//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
// app.use(logger())
app.use(cors());

//Paspport mIddleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js");
app.use("/user", userRoute);
app.use("/api", UIRoute);



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}
//server
app.listen(port, () => {
  console.log("server started");
});
