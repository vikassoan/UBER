import React from "react";

const ConfirmRide = (props) => {
  // Helper function to safely get string value
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && value.description) return value.description;
    return value || '';
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false)
        }}
        className="p-3 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">Confirm your ride</h3>
      <div className="flex w-full flex-col items-center justify-between">
        <img
          className="h-30 mb-5"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full flex flex-col items-center border-t-1">
          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-map-pin-line"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    Pickup
                </h4>
                <p className="text-sm text-gray-500">{getStringValue(props.pickup)}</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-square-line"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    Destination
                </h4>
                <p className="text-sm text-gray-500">{getStringValue(props.destination)}</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-bank-card-line"></i>
            <div className="p-4">
                <h4 className="text-xl font-semibold">
                    ₹{props.fare[props.vehicleType] || 0}
                </h4>
                <p className="text-sm text-gray-500">Cash</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          props.createRide();
          props.setVehicleFound(true); 
          props.setConfirmRidePanel(false);
        }} className="bg-green-600 text-white w-full py-2 rounded mt-4 font-semibold text-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
