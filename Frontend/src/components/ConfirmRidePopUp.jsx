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
      const response = await api.post('/rides/verify-otp', {
        rideId: ride._id,
        otp: otp
      });

      if (response.data.success) {
        socket.emit('ride-started', { rideId: ride._id });
        navigate('/captain-riding', { state: { ride: response.data.ride } });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
        className="p-3 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">Confirm Available Ride</h3>
      <div className="flex items-center justify-between mb-4 border-2 border-yellow-400  p-4 rounded">
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
        <div className="mt-6 w-full">
          <form action="" className='w-full' onSubmit={(e) => submitHandler(e)}>
            <input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              type="text" 
              placeholder='Enter OTP' 
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-sm" 
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className='flex w-full items-center justify-between gap-4'>
              <button
                onClick={() => {
                  setConfirmRidePopUpPanel(false);
                  setRidePopUpPanel(false);
                  socket.emit('ride-rejected', { rideId: ride._id });
                }}
                className="bg-red-500 text-white w-full py-2 rounded mt-4 font-semibold text-lg"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={submitHandler}
                className="bg-green-600 text-white flex justify-center w-full py-2 rounded mt-4 font-semibold text-lg"
                disabled={loading || !otp}
              >
                {loading ? 'Verifying...' : 'Confirm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp