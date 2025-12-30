const express = require('express');
const router = express.Router();
const Decision = require('../models/Decision');

// POST: Save a decision
router.post('/add', async (req, res) => {
    try {
        const { question, options, aiSuggestion, confidenceScore } = req.body;

        const newDecision = new Decision({
            question,
            options,
            aiSuggestion,
            confidenceScore
        });

        await newDecision.save();
        res.status(201).json({ message: "Decision saved successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Fetch all decisions
router.get('/', async (req, res) => {
    try {
        const decisions = await Decision.find().sort({ createdAt: -1 });
        res.status(200).json(decisions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



