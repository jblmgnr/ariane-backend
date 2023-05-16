const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tree = mongoose.model("trees", treeSchema);

module.exports = Tree;
