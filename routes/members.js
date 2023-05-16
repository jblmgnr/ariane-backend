var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//===============================================================
// POST : addmember
//===============================================================

router.post("/addmember", async (req, res) => {
  const checkStatus = checkBody(req.body, ["firstName", "lastName"]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  const newMember = new Member({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickName: req.body.nickName,
    birthDate: req.body.birthDate,
    phoneNumber: req.body.phoneNumber,
    currentCity: req.body.currentCity,
    birthCity: req.body.birthCity,
    job: req.body.job,
    hobbies: req.body.hobbies,
    story: req.body.story,
    photo: req.body.photo,
    relation_ID: req.body.relation_ID,
    relationship: req.body.relationship,
    gender: String,
    group_ID: req.body.group_ID,
  });
  newMember.save().then((data) => {
    res.json({ result: true, token: data.token });
  });
});

module.exports = router;
