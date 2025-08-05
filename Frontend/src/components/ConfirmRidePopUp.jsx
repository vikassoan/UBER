import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../context/SocketContext';
import api from '../utils/api';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!ride) return null;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/rides/start', {
        rideId: ride._id,
        otp: otp
      });

      if (response.status === 200) {
        socket.emit('ride-started', { rideId: ride._id });
        navigate('/captain-riding', { state: { ride: response.data } });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setConfirmRidePopUpPanel(false);
    setRidePopUpPanel(false);
    socket.emit('ride-rejected', { rideId: ride._id });
  };

  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-2xl h-full">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Confirm Ride</h3>
      
      {/* User Info Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl mb-6 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {ride.user?.fullname?.firstname?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}
              </h4>
              <p className="text-sm text-gray-600">Passenger</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-2xl font-bold text-gray-900">₹{ride.fare?.toFixed(2) || 0}</h4>
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
            <p className="text-sm text-gray-600">{ride.pickup}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <i className="ri-square-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Destination</h4>
            <p className="text-sm text-gray-600">{ride.destination}</p>
          </div>
        </div>
      </div>

      {/* OTP Input */}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP from passenger
          </label>
          <input 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            maxLength="6"
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-red-500 text-white font-semibold py-4 rounded-2xl text-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white font-semibold py-4 rounded-2xl text-lg hover:bg-green-600 active:scale-95 transition-all duration-200 disabled:opacity-50"
            disabled={loading || !otp}
          >
            {loading ? 'Verifying...' : 'Start Ride'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp