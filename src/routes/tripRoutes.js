const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// 1. Generate the preview (No DB save)
router.post('/generate-preview', tripController.generatePreview);

// 2. Save the trip (User clicks 'Save')
router.post('/save', tripController.saveTrip);

// 3. Get all saved trips for the gallery
router.get('/all-saved', tripController.getAllSavedTrips);

// 4. Get a specific saved trip by ID
router.get('/:id', tripController.getTripById);

module.exports = router;