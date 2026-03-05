const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: Number, required: true },
    vibe: { type: String, required: true },
    // Standardized to match your frontend and controller
    itineraryData: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);