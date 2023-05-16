var express = require("express");
var router = express.Router();

const Tree = require("../models/tree");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

//===============================================================
// POST : add tree and if tree already exists, add member to tree
//===============================================================
router.post("/", async (req, res) => {
  console.log("POST tree !!!!!");
  const checkStatus = checkBody(req.body, ["name", "userId"]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  console.log(
    ` About to create the tree ${req.body.name} associated with user : ${req.body.userId}`
  );
  // Check if the tree has not already been registered
  Tree.findOne({ name: req.body.name, userId: req.body.userId }).then(
    (data) => {
      if (data !== null) {
        res.json({ result: false, error: "Tree already exists" });
        return;
      }

      // Create the tree in DB
      const newTree = new Tree({
        name: req.body.name,
        userId: req.body.userId,
      });
      newTree
        .save()
        .then((dataTree) => {
          console.log("Tree to be saved : ", dataTree);

          console.log("req.body.userId ", req.body.userId);
          if (!(req.body.userId && req.body.userId.length)) {
            res.json({ result: true, data: dataTree });
            return;
          }

          // If the userId is provided, associate the tree to the user
          User.findById(req.body.userId)
            .then((user) => {
              if (!user) {
                res.json({
                  result: false,
                  error: "No user exists with id ",
                  userId,
                });
                return;
              }
              user.tree = newTree._id;
              user.save();
              res.json({ result: true, data: dataTree });
              return;
            })
            .catch((error) => {
              console.error(error);
              res.json({
                result: false,
                error: "While accessing MongoDB Database",
              });
            });
        })
        .catch((error) => {
          console.error(error);
          res.json({
            result: false,
            error: "While accessing MongoDB Database",
          });
        });
    }
  );
});

module.exports = router;
