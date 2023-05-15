var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//===============================================================
// POST : signUp
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
  User.findOne({ username: req.body.email })
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
      });
      newUser.save().then((data) => {
        res.json({ result: true, token: data.token });
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({ result: false, error: "While accessing MongoDB Database" });
    });
});

module.exports = router;
