const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  brirthDate: Date,
  deathDate: Date,
  phoneNumber: String,
  birthCity: String,
  currentCity: String,
  job: String,
  hobbies: [String],
  story: String,
  photo: String,
  father: { type: mongoose.Schema.Types.ObjectId, ref: "members" },
  mother: { type: mongoose.Schema.Types.ObjectId, ref: "members" },
  relationship: String,
  gender: String,
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "groups" }],
});

const Member = mongoose.model("members", memberSchema);

module.exports = Member;
