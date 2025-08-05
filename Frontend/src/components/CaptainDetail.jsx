import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import api from '../utils/api';

const CaptainDetail = () => {
  const { captain } = useContext(CaptainDataContext);

  const testRideRequest = async () => {
    try {
      const response = await api.post('/rides/test-ride-request', {
        pickup: 'Test Pickup Location',
        destination: 'Test Destination',
        vehicleType: 'car'
      });
      console.log('Test ride request sent:', response.data);
      alert(`Test ride request sent to ${response.data.captains} captains`);
    } catch (error) {
      console.error('Error sending test ride request:', error);
      alert('Failed to send test ride request');
    }
  };

  if (!captain) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Loading captain details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Captain Dashboard</h2>
        <p className="text-gray-600">Welcome back, {captain.fullname?.firstname || 'Captain'}</p>
      </div>

      {/* Captain Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {captain.fullname?.firstname?.charAt(0) || 'C'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {captain.fullname?.firstname} {captain.fullname?.lastname}
            </h3>
            <p className="text-gray-600">{captain.email}</p>
            <p className="text-sm text-gray-500">Status: {captain.status || 'Active'}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      {captain.vehicle && (
        <div className="bg-gray-50 p-4 rounded-2xl">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{captain.vehicle.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Color</p>
              <p className="font-medium">{captain.vehicle.color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plate</p>
              <p className="font-medium">{captain.vehicle.plate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacity</p>
              <p className="font-medium">{captain.vehicle.capacity} seats</p>
            </div>
          </div>
        </div>
      )}

      {/* Test Button */}
      <div className="text-center">
        <button
          onClick={testRideRequest}
          className="bg-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-600 active:scale-95 transition-all duration-200"
        >
          Test Ride Request
        </button>
        <p className="text-xs text-gray-500 mt-2">Click to test popup functionality</p>
      </div>

      {/* Status Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Online & Ready</span>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetail;