const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Save preferences (Veg/Non-Veg, Currency, etc.)
router.put('/update-profile', userController.updatePreferences);

module.exports = router;