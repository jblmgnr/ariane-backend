const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    role: [String],
    autoLogin: Boolean,
    member:{type: mongoose.Schema.Types.ObjectId, ref: 'members'}
});

const User = mongoose.model('users', userSchema);

module.exports = User;