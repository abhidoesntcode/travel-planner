const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/create', tripController.createTrip);
router.get('/:id', tripController.getTripById); // This is the dynamic route

module.exports = router;