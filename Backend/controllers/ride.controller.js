const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        console.log('Creating ride:', { pickup, destination, vehicleType, userId: req.user._id });
        
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        console.log('Ride created:', ride._id);
        
        res.status(201).json(ride);

        // Get coordinates for pickup location
        let pickupCoordinates;
        try {
            pickupCoordinates = await mapService.getAddressCoordinate(pickup);
            console.log('Pickup coordinates:', pickupCoordinates);
        } catch (coordError) {
            console.error('Error getting coordinates:', coordError);
            // Use default coordinates if geocoding fails
            pickupCoordinates = { lat: 28.6139, lng: 77.2090 }; // Default to Delhi
        }

        // Find captains in radius
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 5);
        console.log(`Found ${captainsInRadius.length} captains in radius`);

        // Populate the ride with user data and include OTP
        const rideWithUser = await rideModel.findOne({ _id: ride._id })
            .populate('user', 'fullname email phone')
            .select('+otp');

        console.log('Ride with user data:', {
            _id: rideWithUser._id,
            pickup: rideWithUser.pickup,
            destination: rideWithUser.destination,
            fare: rideWithUser.fare,
            distance: rideWithUser.distance,
            vehicleType: rideWithUser.vehicleType,
            user: rideWithUser.user,
            otp: rideWithUser.otp
        });

        // Send ride request to all captains in radius
        captainsInRadius.forEach(captain => {
            console.log(`Sending ride request to captain ${captain._id} at socket ${captain.socketId}`);
            
            const rideData = {
                _id: rideWithUser._id,
                pickup: rideWithUser.pickup,
                destination: rideWithUser.destination,
                fare: rideWithUser.fare,
                distance: rideWithUser.distance,
                vehicleType: rideWithUser.vehicleType,
                user: rideWithUser.user,
                otp: rideWithUser.otp,
                createdAt: rideWithUser.createdAt
            };

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride-request',
                data: rideData
            });
        });

    } catch (err) {
        console.error('Error creating ride:', err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        console.log('Getting fare for:', { pickup, destination });
        const fareData = await rideService.getFare(pickup, destination);
        console.log('Fare calculated:', fareData);
        return res.status(200).json(fareData);
    } catch (err) {
        console.error('Error getting fare:', err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        console.log('Confirming ride:', rideId, 'by captain:', req.captain._id);
        
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        // Populate ride with user and captain data before sending
        const populatedRide = await rideModel.findById(ride._id)
            .populate('user', 'fullname email phone socketId')
            .populate('captain', 'fullname vehicle');

        console.log('Ride confirmed, notifying user:', populatedRide.user.socketId);

        // Send confirmation to user with captain details and OTP
        sendMessageToSocketId(populatedRide.user.socketId, {
            event: 'ride-confirmed',
            data: populatedRide
        });

        return res.status(200).json(populatedRide);
    } catch (err) {
        console.error('Error confirming ride:', err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Handle both GET and POST requests
    const rideId = req.query.rideId || req.body.rideId;
    const otp = req.query.otp || req.body.otp;

    try {
        console.log('Starting ride:', rideId, 'with OTP:', otp);
        
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        // Populate ride with user and captain data before sending
        const populatedRide = await rideModel.findById(ride._id)
            .populate('user', 'fullname email phone socketId')
            .populate('captain', 'fullname vehicle');

        console.log('Ride started, notifying user:', populatedRide.user.socketId);

        sendMessageToSocketId(populatedRide.user.socketId, {
            event: 'ride-started',
            data: populatedRide
        });

        return res.status(200).json(populatedRide);
    } catch (err) {
        console.error('Error starting ride:', err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Populate ride with user and captain data before sending
        const populatedRide = await rideModel.findById(ride._id)
            .populate('user', 'fullname email phone socketId')
            .populate('captain', 'fullname vehicle');

        sendMessageToSocketId(populatedRide.user.socketId, {
            event: 'ride-ended',
            data: populatedRide
        });

        return res.status(200).json(populatedRide);
    } catch (err) {
        console.error('Error ending ride:', err);
        return res.status(500).json({ message: err.message });
    }
}