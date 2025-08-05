import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import api from '../utils/api';

const RidePopUp = ({ ride, setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
  const { socket } = useContext(SocketContext);

  if (!ride) {
    console.log('No ride data provided to RidePopUp');
    return null;
  }

  console.log('RidePopUp received ride:', ride);

  const handleAcceptRide = async () => {
    try {
      console.log('Accepting ride:', ride._id);
      const response = await api.post('/rides/confirm', {
        rideId: ride._id
      });

      if (response.status === 200) {
        console.log('Ride confirmed successfully');
        setConfirmRidePopUpPanel(true);
        setRidePopUpPanel(false);
      }
    } catch (error) {
      console.error('Error accepting ride:', error);
      alert('Failed to accept ride. Please try again.');
    }
  };

  const handleIgnoreRide = () => {
    console.log('Ignoring ride:', ride._id);
    setRidePopUpPanel(false);
    socket.emit('ride-rejected', { rideId: ride._id });
  };

  // Helper function to safely get nested values
  const getNestedValue = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  };

  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">New Ride Available!</h3>
      
      {/* User Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {getNestedValue(ride, 'user.fullname.firstname', 'U').charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {getNestedValue(ride, 'user.fullname.firstname', '')} {getNestedValue(ride, 'user.fullname.lastname', '')}
              </h4>
              <p className="text-sm text-gray-600">Passenger</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-2xl font-bold text-gray-900">₹{(ride.fare || 0).toFixed(2)}</h4>
            <p className="text-sm text-gray-600">{ride.distance || 0} km</p>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Pickup</h4>
            <p className="text-sm text-gray-600">{ride.pickup || 'Location not specified'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <i className="ri-square-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Destination</h4>
            <p className="text-sm text-gray-600">{ride.destination || 'Location not specified'}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleIgnoreRide}
          className="flex-1 bg-gray-200 text-gray-800 font-semibold py-4 rounded-2xl text-lg hover:bg-gray-300 active:scale-95 transition-all duration-200"
        >
          Ignore
        </button>
        <button
          onClick={handleAcceptRide}
          className="flex-1 bg-green-500 text-white font-semibold py-4 rounded-2xl text-lg hover:bg-green-600 active:scale-95 transition-all duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
