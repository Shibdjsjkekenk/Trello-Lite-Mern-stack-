const Activity = require('../models/Activity');

// get activities of a board
exports.getBoardActivities = async (req, res) => {
    try {
        const activities = await Activity
            .find({ board: req.params.id })
            .sort('-createdAt')
            .limit(50);

        res.json(activities);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
