import React from 'react'

const ConfirmRide = ({ createRide, pickup, destination, fare, vehicleType, setConfirmRidePanel, setVehicleFound, loading }) => {
  const handleConfirm = async () => {
    try {
      await createRide();
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  const handleCancel = () => {
    setConfirmRidePanel(false);
  };

  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Confirm Your Ride</h3>
      
      {/* Ride Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Pickup</h4>
            <p className="text-sm text-gray-600">{pickup}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <i className="ri-square-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Destination</h4>
            <p className="text-sm text-gray-600">{destination}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <i className="ri-car-line text-white text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">Vehicle Type</h4>
            <p className="text-sm text-gray-600 capitalize">{vehicleType}</p>
          </div>
        </div>
      </div>

      {/* Fare Details */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Total Fare</h4>
            <p className="text-sm text-gray-600">Distance: {fare.distance || 0} km</p>
          </div>
          <div className="text-right">
            <h3 className="text-3xl font-bold text-gray-900">₹{fare.fare || 0}</h3>
            <p className="text-sm text-gray-600">Estimated</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-200 text-gray-800 font-semibold py-4 rounded-2xl text-lg hover:bg-gray-300 active:scale-95 transition-all duration-200"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 bg-black text-white font-semibold py-4 rounded-2xl text-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Confirming...' : 'Confirm Ride'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide
