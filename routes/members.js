var express = require("express");
var router = express.Router();

const Member = require("../models/members");
const { checkBody } = require("../modules/checkBody");

//===============================================================
// POST : addmember
//===============================================================
router.post("/", async (req, res) => {
  console.log("In router add member ... : try to create : ", req.body);
  const checkStatus = checkBody(req.body, ["firstName", "lastName"]);

  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }
  const toCheck = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickName: req.body.nickName,
  };

  console.log("TO CHECK ", toCheck);
  // Check if the user has not already been registered
  Member.findOne(toCheck)
    .then((data) => {
      if (data !== null) {
        res.json({
          result: false,
          error:
            "Member already exists with same firsname, lastname and nickname",
        });
        return;
      }

      const newMember = new Member({
        tree: req.body.tree,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        birthDate: req.body.birthDate,
        birthDate: req.body.birthDate,
        phoneNumber: req.body.phoneNumber,
        birthCity: req.body.birthCity,
        currentCity: req.body.currentCity,
        job: req.body.job,
        hobbies: req.body.hobbies,
        story: req.body.story,
        photo: req.body.photo,
        father: req.body.father,
        mother: req.body.mother,
        gender: req.body.gender,
        group: req.body.group,
      });
      newMember.save().then((data) => {
        res.json({ result: true, data });
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        result: false,
        error: "While accessing MongoDB Database",
      });
    });
});

//===============================================================
// DELETE /:id
//===============================================================
router.delete("/:id", async (req, res) => {
  try {
    const result = await Member.deleteOne({ _id: req.params.id });
    res.json({ result: true, member: result });
  } catch (error) {
    res.json({ result: false, error });
  }
});

//===============================================================
// GET: all members
//===============================================================
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    console.log("Return ", members.length, " members.");
    res.json({ result: true, members });
  } catch (error) {
    res.json({ result: false, error });
  }
});

//===============================================================
// GET /byTree/:treeId : all members belonging of given tree
//===============================================================
router.get("/byTree/:treeId", async (req, res) => {
  try {
    console.log(
      "==============+> Look for members belonging to tree with id : ",
      req.params.treeId
    );
    const members = await Member.find({ tree: req.params.treeId });
    console.log("Return ", members.length, " members.");
    res.json({ result: true, members });
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
