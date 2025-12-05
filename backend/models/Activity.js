const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    text: { type: String, required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Activity', activitySchema);