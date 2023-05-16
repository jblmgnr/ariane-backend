var express = require("express");
var router = express.Router();

const Group = require("../models/groups");
const { checkBody } = require("../modules/checkBody");

//===============================================================
// POST : create group
//===============================================================

router.post("/", async (req, res) => {
  const checkStatus = checkBody(req.body, ["name"]);
  if (!checkStatus.status) {
    res.json({ result: false, error: checkStatus.error });
    return;
  }

  const newGroup = new Group({
    name: req.body.name,
    description: req.body.description,
  });
  newGroup.save().then((data) => {
    res.json({ result: true, data });
  });
});

//===============================================================
// DELETE : delete group
//===============================================================

router.delete("/:id", async (req, res) => {
  try {
    const result = await Group.deleteOne({ _id: req.params.id });
    res.json({ result: true, group: result });
  } catch (error) {
    res.json({ result: false, error });
  }
});

//===============================================================
// GET : all group
//===============================================================

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json({ result: true, groups });
  } catch (error) {
    res.json({ result: false, error });
  }
});

module.exports = router;
