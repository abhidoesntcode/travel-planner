const User = require('../models/User');

exports.updatePreferences = async(req, res) => {
    try {
        const { diet, currency, pace } = req.body;

        // Find the user (or create if doesn't exist) and update
        const user = await User.findOneAndUpdate({ userId: 'guest_user_1' }, {
            preferences: { diet, currency, pace },
            updatedAt: Date.now()
        }, { upsert: true, new: true });

        res.json({ success: true, message: "Preferences saved!", data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch preferences to show on page load
exports.getProfile = async(req, res) => {
    try {
        const user = await User.findOne({ userId: 'guest_user_1' });
        res.json({ success: true, data: user || { preferences: {} } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};