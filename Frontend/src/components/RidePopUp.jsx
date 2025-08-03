import React from "react";

const RidePopUp = ({ ride, setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
  if (!ride) return null;
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-3 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">New Ride Available!</h3>
      <div className="flex items-center justify-between mb-4 bg-yellow-400 p-4 rounded">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/742c8a68394479.5b5b215a1d767.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">{ride.user.fullname.firstname} {ride.user.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-lg font-semibold">₹{ride.fare.toFixed(2)}</h4>
          <p className="text-sm font-normal text-gray-600">{ride.distance} km</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center border-t-1">
          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-map-pin-line"></i>
            <div className="p-4">
              <h4 className="text-xl font-semibold">{ride.pickup}</h4>
              <p className="text-sm text-gray-500">{ride.pickupAddress}</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-square-line"></i>
            <div className="p-4">
              <h4 className="text-xl font-semibold">{ride.destination}</h4>
              <p className="text-sm text-gray-500">{ride.destinationAddress}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <button
            onClick={() => {setRidePopUpPanel(false);}}
            className="bg-gray-400 text-gray-800 w-full py-2 rounded mt-4 font-semibold text-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {setConfirmRidePopUpPanel(true);}}
            className="bg-green-600 text-white w-full py-2 rounded mt-4 font-semibold text-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
