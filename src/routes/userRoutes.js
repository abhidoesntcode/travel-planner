const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile/preferences
router.get('/profile', userController.getProfile);

// Save preferences (Veg/Non-Veg, Currency, etc.)
router.put('/update-profile', userController.updatePreferences);

module.exports = router;