const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: String,
    description: String,
});

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;