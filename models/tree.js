const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
  name: String,
});

const User = mongoose.model("trees", treeSchema);

module.exports = Tree;
