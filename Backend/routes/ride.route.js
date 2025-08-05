const express = require('express');
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Test endpoint to manually trigger ride request (for debugging)
router.post('/test-ride-request', async (req, res) => {
    try {
        const { pickup, destination, vehicleType } = req.body;
        
        // Create a mock ride request
        const mockRide = {
            _id: 'test-ride-' + Date.now(),
            pickup: pickup || 'Test Pickup Location',
            destination: destination || 'Test Destination',
            vehicleType: vehicleType || 'car',
            fare: 150,
            distance: 5.2,
            user: {
                _id: 'test-user',
                fullname: {
                    firstname: 'Test',
                    lastname: 'User'
                },
                email: 'test@example.com'
            },
            otp: '123456'
        };

        // Get all active captains
        const captainModel = require('../models/captain.model');
        const captains = await captainModel.find({ 
            status: 'active',
            socketId: { $exists: true, $ne: null }
        });

        console.log(`Sending test ride request to ${captains.length} captains`);

        // Send to all active captains
        const { sendMessageToSocketId } = require('../socket');
        captains.forEach(captain => {
            console.log(`Sending test ride to captain ${captain._id} at socket ${captain.socketId}`);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride-request',
                data: mockRide
            });
        });

        res.json({ 
            message: `Test ride request sent to ${captains.length} captains`,
            captains: captains.length,
            ride: mockRide
        });
    } catch (error) {
        console.error('Test ride request error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/create', [
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('vehicleType').notEmpty().withMessage('Vehicle type is required')
], authMiddleware.authUser, rideController.createRide);

router.get('/get-fare', [
    query('pickup').notEmpty().withMessage('Pickup location is required'),
    query('destination').notEmpty().withMessage('Destination is required')
], rideController.getFare);

router.post('/confirm', [
    body('rideId').notEmpty().withMessage('Ride ID is required')
], authMiddleware.authCaptain, rideController.confirmRide);

router.post('/start', [
    body('rideId').notEmpty().withMessage('Ride ID is required'),
    body('otp').notEmpty().withMessage('OTP is required')
], authMiddleware.authCaptain, rideController.startRide);

router.get('/start-ride', [
    query('rideId').notEmpty().withMessage('Ride ID is required'),
    query('otp').notEmpty().withMessage('OTP is required')
], authMiddleware.authCaptain, rideController.startRide);

router.post('/end', [
    body('rideId').notEmpty().withMessage('Ride ID is required')
], authMiddleware.authCaptain, rideController.endRide);

module.exports = router;