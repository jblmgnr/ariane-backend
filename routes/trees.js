var express = require("express");
var router = express.Router();

const Tree = require("../models/tree");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

//===============================================================
// POST : add tree and if tree already exists, add member to tree
//===============================================================
router.post("/", async (req, res) => {
  const checkStatus = checkBody(req.body, ["name"]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  // Check if the tree has not already been registered
  Tree.findOne({ name: req.body.name }).then((data) => {
    if (data !== null) {
      res.json({ result: false, error: "Tree already exists" });
      return;
    }

    const newTree = new Tree({
      name: req.body.name,
    });
    newTree
      .save()
      .then((data) => {
        res.json({ result: true, data });
      })
      .catch((error) => {
        console.error(error);
        res.json({ result: false, error: "While accessing MongoDB Database" });
      });
  });

  if (!(req.body.userId && req.body.userId.length)) {
    return;
  }
  // save tree in user
  User.findById(req.body.userId)
    .then((user) => {
      user.tree = newTree._id;
      user.save();
    })
    .catch((error) => {
      console.error(error);
      res.json({ result: false, error: "While accessing MongoDB Database" });
    });
});

module.exports = router;
