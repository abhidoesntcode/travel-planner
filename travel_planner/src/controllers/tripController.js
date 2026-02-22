const Trip = require('../models/Trip');
const aiService = require('../services/aiService');

// This handles the "Generate" button click
exports.createTrip = async(req, res) => {
    try {
        const { destination, days, budget, vibe } = req.body;

        // 1. Call AI Service to get the plan
        // Note: We will create the aiService file in the next step
        const generatedPlan = await aiService.generateItinerary({ destination, days, budget, vibe });

        // 2. Save everything to the Database
        const newTrip = new Trip({
            destination,
            days,
            budget,
            vibe,
            itineraryData: generatedPlan // We'll use 'itineraryData' as the standard name
        });

        const savedTrip = await newTrip.save();

        // 3. Send the ID back so the frontend can redirect
        res.status(201).json({
            success: true,
            tripId: savedTrip._id,
            data: savedTrip
        });
    } catch (error) {
        console.error("Error in createTrip:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// This handles loading the page when you have an ID in the URL
exports.getTripById = async(req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }
        res.status(200).json({ success: true, data: trip });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};