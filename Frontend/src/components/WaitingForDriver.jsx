import React from 'react'

const WaitingForDriver = ({ ride, setVehicleFound, setWaitingForDriver, waitingForDriver }) => {
  // Helper function to safely get nested values
  const getNestedValue = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  };

  if (!ride) {
    return (
      <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Waiting for driver confirmation...</p>
        </div>
      </div>
    );
  }

  console.log('WaitingForDriver received ride:', ride);

  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Driver Found!</h3>
      
      {/* Driver Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-2xl mb-6 border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {getNestedValue(ride, 'captain.fullname.firstname', 'D').charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {getNestedValue(ride, 'captain.fullname.firstname', '')} {getNestedValue(ride, 'captain.fullname.lastname', '')}
              </h4>
              <p className="text-sm text-gray-600">Your Driver</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-2xl font-bold text-gray-900">₹{(ride.fare || 0).toFixed(2)}</h4>
            <p className="text-sm text-gray-600">{ride.distance || 0} km</p>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      {ride.captain?.vehicle && (
        <div className="bg-gray-50 p-4 rounded-2xl mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium capitalize">{getNestedValue(ride, 'captain.vehicle.type', 'Car')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Color</p>
              <p className="font-medium">{getNestedValue(ride, 'captain.vehicle.color', 'N/A')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plate</p>
              <p className="font-medium">{getNestedValue(ride, 'captain.vehicle.plate', 'N/A')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Capacity</p>
              <p className="font-medium">{getNestedValue(ride, 'captain.vehicle.capacity', 4)} seats</p>
            </div>
          </div>
        </div>
      )}

      {/* OTP Display */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl mb-6 border-2 border-yellow-200">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Your OTP</h4>
          <div className="bg-white p-3 rounded-xl border-2 border-yellow-300">
            <p className="text-3xl font-bold text-gray-900 tracking-wider">{ride.otp || '123456'}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this OTP with your driver to start the ride
          </p>
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

      {/* Status */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Driver is on the way</span>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver