const rideModel = require('../models/ride.model');
const mapService = require('./map.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    try {
        const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
        
        const baseFare = {
            auto: 30,
            car: 50,
            moto: 20
        };

        const perKmRate = {
            auto: 10,
            car: 15,
            moto: 8
        };

        const perMinuteRate = {
            auto: 2,
            car: 3,
            moto: 1.5
        };

        const fare = {
            auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
            car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
            moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
        };

        return {
            fare: fare,
            distance: (distanceTime.distance.value / 1000).toFixed(1),
            duration: Math.round(distanceTime.duration.value / 60)
        };
    } catch (error) {
        console.error('Error calculating fare:', error);
        // Return default fare if distance calculation fails
        return {
            fare: { auto: 50, car: 80, moto: 40 },
            distance: 5.0,
            duration: 15
        };
    }
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    console.log('Creating ride:', { user, pickup, destination, vehicleType });

    const fareData = await getFare(pickup, destination);
    const otp = getOtp(6);

    console.log('Generated OTP:', otp);
    console.log('Fare data:', fareData);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp: otp,
        fare: fareData.fare[vehicleType],
        distance: fareData.distance,
        duration: fareData.duration,
        status: 'pending'
    });

    console.log('Ride created successfully:', ride._id);

    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    console.log('Confirming ride:', rideId, 'by captain:', captain._id);

    const updatedRide = await rideModel.findOneAndUpdate({
        _id: rideId,
        status: 'pending' // Only accept pending rides
    }, {
        status: 'accepted',
        captain: captain._id
    }, { new: true });

    if (!updatedRide) {
        throw new Error('Ride not found or already accepted');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    console.log('Ride confirmed successfully:', ride._id);

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    console.log('Starting ride:', rideId, 'with OTP:', otp);

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'in-progress'
    });

    console.log('Ride started successfully:', rideId);

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    console.log('Ending ride:', rideId);

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'in-progress') {
        throw new Error('Ride not in progress');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    });

    console.log('Ride ended successfully:', rideId);

    return ride;
}