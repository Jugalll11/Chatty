const { register, getAllUsers } = require("../Controllers/userController");
const router = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const MongoStore = require("connect-mongo");
const User = require("../Model/userModel");
require("../Strategy/Local");

router.use(express.json());
router.use(express.urlencoded());

router.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/chat",
    }),
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.post("/register", register);

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged");
  res.send("200");
});

router.get("/user", (req, res) => {
  if (req.user === undefined) {
    res.send({
      user: "Please Login First",
      condition: "false",
    });
  } else {
    res.json({
      user: req.user,
      condition: "true",
    });
  }
});

router.post("/setAvatar", async (req, res) => {
  await User.updateOne(
    {
      Email: req.user.Email,
    },
    {
      $set: { Pfp: req.body.String },
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

router.get("/allUsers", getAllUsers);

module.exports = router;
