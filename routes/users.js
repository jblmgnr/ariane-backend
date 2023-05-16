var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//===============================================================
// POST : signup
//===============================================================
router.post("/signup", (req, res) => {
  const checkStatus = checkBody(req.body, [
    "firstName",
    "lastName",
    "email",
    "password",
  ]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data !== null) {
        res.json({ result: false, error: "User already exists" });
        return;
      }

      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        autoLogin: false,
        member: null,
        tree: null,
      });
      newUser.save().then((user) => {
        res.json({ result: true, user });
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({ result: false, error: "While accessing MongoDB Database" });
    });
});

//===============================================================
// POST : signin
//===============================================================
router.post("/signin", (req, res) => {
  const checkStatus = checkBody(req.body, ["email", "password"]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        res.json({ result: false, error: "User not found" });
        return;
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ result: false, error: "Wrong password" });
        return;
      }

      console.log("user : ", user);
      res.json({ result: true, user });
    })
    .catch((error) => {
      console.error(error);
      res.json({ result: false, error: "While accessing MongoDB Database" });
    });
});

module.exports = router;
