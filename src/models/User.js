const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // For now, we'll use a hardcoded 'default' user since we haven't added Login yet
    userId: { type: String, default: 'guest_user_1' },
    preferences: {
        diet: { type: String, default: 'None' }, // Veg, Non-Veg, Vegan
        currency: { type: String, default: 'INR' },
        pace: { type: String, default: 'Balanced' }, // Relaxed, Fast-paced
        language: { type: String, default: 'English' }
    },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);