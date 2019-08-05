const express = require("express");
const router = express.Router();
const UserModel = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Validator
const validateRegister = require("../validator/register");
const validateLogin = require("../validator/login");

router.post("/register", (req, res) => {
  console.log("registerrrrr");

  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    console.log("no valid register", errors);
    return res.status(400).json(errors);
  }
  //Checking If theres a user

  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      console.log("inside register", user);

      return res.status(400).json({ email: "Email already exist" });
    } else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  const email = req.body.email;
  const password = req.body.password;

  UserModel.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User Not found";
      return res.status(400).json({ email: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incoreect password";
        return res.status(400).json({ password: "Incorrct pass" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
