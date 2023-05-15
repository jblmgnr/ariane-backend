const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    birthDate: Date,
    phoneNumber: String,
    currentCity: String,
    birthCity: String,
    job: String,
    hobbies: [String],
    story: String,
    photo: String,
    relation_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'members'},
    relationship: String,
    gender: String,
    group_ID: [{type: mongoose.Schema.Types.ObjectId, ref: 'groups'}],
});

const Member = mongoose.model('members', memberSchema);

module.exports = Member;