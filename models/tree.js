const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
  name: String,
});

const Tree = mongoose.model("trees", treeSchema);

module.exports = Tree;
