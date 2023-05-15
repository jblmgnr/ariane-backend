const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
    member_ID: {type: mongoose.Schema.Types.ObjectId, ref: 'members'},
    game: String,
    score: Number,
    elapsedTime: Number,
    date: Date,
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
