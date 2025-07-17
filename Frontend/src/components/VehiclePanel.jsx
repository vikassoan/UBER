import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => {props.setVehiclePanel(false)}} className="p-3 text-center absolute top-0 w-[93%]"><i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-4">Choose the vehicle</h3>
        <div onClick={() => {props.setConfirmRidePanel(true); props.setVehiclePanel(false)}} className="flex w-full p-4 mb-2 border-white border-2 active:border-black rounded-xl items-center justify-between">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          <div className="w-1/2">
            <h4 className="text-base font-medium">UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className="text-sm font-medium">2 min away</h5>
            <p className="text-xs font-normal text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹193.20</h2>
        </div>
        <div onClick={() => {props.setConfirmRidePanel(true); props.setVehiclePanel(false)}} className="flex w-full p-4 mb-2 border-white border-2 active:border-black rounded-xl items-center justify-between">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className="w-1/2">
            <h4 className="text-base font-medium">Moto <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className="text-sm font-medium">3 min away</h5>
            <p className="text-xs font-normal text-gray-600">Affordable motorcycle rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹65.17</h2>
        </div>
        <div onClick={() => {props.setConfirmRidePanel(true); props.setVehiclePanel(false)}} className="flex w-full p-4 mb-2 border-white border-2 active:border-black rounded-xl items-center justify-between">
          <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className="w-1/2">
            <h4 className="text-base font-medium">UberAuto <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className="text-sm font-medium">2 min away</h5>
            <p className="text-xs font-normal text-gray-600">Affordable auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹118.68</h2>
        </div>
    </div>
  )
}

export default VehiclePanel