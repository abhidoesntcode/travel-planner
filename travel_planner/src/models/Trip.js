const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: Number, required: true },
    vibe: { type: String, required: true },
    // This will store the AI's response (Friend 1's work)
    itinerary: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);