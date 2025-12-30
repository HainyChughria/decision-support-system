const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    aiSuggestion: {
        type: String,
        required: true
    },
    confidenceScore: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Decision', decisionSchema);
