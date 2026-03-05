const Trip = require('../models/Trip');
const aiService = require('../services/aiService');

/**
 * 1. GENERATE PREVIEW
 * Called when the user clicks "Generate" on create-trip.html.
 * This does NOT save to the database yet.
 */
exports.generatePreview = async (req, res) => {
    try {
        const { destination, days, budget, vibe } = req.body;

        // Call the AI service (or the mock service for now)
        const generatedPlan = await aiService.generateItinerary({
            destination,
            days,
            budget,
            vibe
        });

        // Send the data back to the frontend to be stored in sessionStorage
        res.status(200).json({
            success: true,
            data: {
                destination,
                days,
                budget,
                vibe,
                itineraryData: generatedPlan
            }
        });
    } catch (error) {
        console.error("Error in generatePreview:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 2. SAVE TRIP
 * Called only when the user clicks the "Save" button on the overview/itinerary page.
 */
exports.saveTrip = async (req, res) => {
    try {
        let numericBudget = req.body.budget;
        if (typeof numericBudget === 'string') {
            const lowerObj = numericBudget.toLowerCase();
            if (lowerObj.includes('economy')) numericBudget = 5000;
            else if (lowerObj.includes('luxury')) numericBudget = 50000;
            else numericBudget = 15000; // Standard fallback
        }

        // Create a new trip document using the data sent from the frontend
        const newTrip = new Trip({
            destination: req.body.destination,
            days: req.body.days,
            budget: numericBudget,
            vibe: req.body.vibe,
            itineraryData: req.body.itineraryData // The data generated in the preview step
        });

        const savedTrip = await newTrip.save();

        res.status(201).json({
            success: true,
            message: "Trip saved successfully!",
            tripId: savedTrip._id
        });
    } catch (error) {
        console.error("Error in saveTrip:", error);
        res.status(500).json({ success: false, message: "Failed to save trip to database." });
    }
};

/**
 * 3. GET ALL SAVED TRIPS
 * Used to populate the "Saved Trips" gallery page.
 */
exports.getAllSavedTrips = async (req, res) => {
    try {
        // Fetch all trips, sorted by newest first
        const trips = await Trip.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: trips
        });
    } catch (error) {
        console.error("Error in getAllSavedTrips:", error);
        res.status(500).json({ success: false, message: "Error fetching saved trips." });
    }
};

/**
 * 4. GET TRIP BY ID
 * Used when a user clicks a specific trip from their "Saved Trips" gallery.
 */
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ success: false, message: "Trip not found" });
        }
        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (error) {
        console.error("Error in getTripById:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};