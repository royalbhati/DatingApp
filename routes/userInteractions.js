const express = require("express");
const router = express.Router();
const JobModel = require("../model/Job");
const UserModel = require("../model/User");
const passport = require("passport");

router.get("/users/all/:id", (req, res) => {
  console.log("fetchALL");

  UserModel.find({})
    .then(users => {
      if (!users) {
        errors.jobs = "No Users Found";
        return res.status(400).json({ users: "No new People Around" });
      } else {
        const currentUser = UserModel.find({ _id: req.params.id });
        currentUser.then(CurrUser => {
          const FilterUsers = users.filter(user => {
            if (
              CurrUser[0].superliked.indexOf(user._id) === -1 &&
              CurrUser[0].blocked.indexOf(user._id) === -1 &&
              CurrUser[0].liked.indexOf(user._id) === -1 &&
              user.id !== CurrUser[0].id
            ) {
              return true;
            }
          });
          const superLikes = FilterUsers.map(user => {
            if (
              user.superliked.indexOf(CurrUser[0]._id) !== -1 &&
              user.superliked.length > 0
            ) {
              return user._id;
            }
          });
          const likes = FilterUsers.map(user => {
            if (
              user.liked.indexOf(CurrUser[0]._id) !== -1 &&
              user.liked.length > 0
            ) {
              return user._id;
            } else {
              return;
            }
          });
          // console.log("userrrrrr", FilterUsers);
          const data = {
            usersToBeDisplayed: [...FilterUsers],
            likedby: [...likes],
            superlikedby: [...superLikes],
            matches: [...CurrUser[0].match]
          };
          return res.send(data);
        });
      }
    })
    .catch(err => res.status(500).json({ err: "Something Went wrong" }));
});

router.put("/users/block/", async (req, res) => {
  let doc = await UserModel.findOne({ _id: req.body.currentuser });
  doc.blocked = [...doc.blocked, req.body.toblock];
  await doc.save();
  res.send({ msg: "Blocked" });
});

router.put("/users/like/", async (req, res) => {
  let doc = await UserModel.findOne({ _id: req.body.currentuser });
  doc.liked = [...doc.liked, req.body.tolike];
  await doc.save();
  res.send({ msg: "Liked" });
});

router.put("/users/superLike/", async (req, res) => {
  let doc = await UserModel.findOne({ _id: req.body.currentuser });
  doc.superliked = [...doc.superliked, req.body.tosuperlike];
  await doc.save();
  res.send({ msg: "superliked" });
});

router.put("/users/match", async (req, res) => {
  let matchedUserDoc = await UserModel.find({ _id: req.body.matchedUser });
  UserModel.findByIdAndUpdate(
    { _id: req.body.currentuser },
    { match: [...req.body.matchArr, matchedUserDoc] },
    { new: true }
  )
    .then(user => {
      res.send({ msg: "matched" });
    })
    .catch(err => {
      res.sendStatus(500).json({ err: err.response.data });
    });
});

module.exports = router;
