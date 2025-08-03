import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FinishRide = (props) => {


  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="p-3 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-4">Finish the Ride</h3>
      <div className="flex items-center justify-between mb-4 border-2 border-yellow-400 p-4 rounded">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/742c8a68394479.5b5b215a1d767.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Harsh Patel</h4>
        </div>
        <div>
          <h4 className="text-lg font-semibold">₹295.20</h4>
          <p className="text-sm font-normal text-gray-600">4 km</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center border-t-1">
          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-map-pin-line"></i>
            <div className="p-4">
              <h4 className="text-xl font-semibold">562/A1</h4>
              <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>

          <div className="flex w-full items-center border-b-1">
            <i className="text-2xl font-semibold ri-square-line"></i>
            <div className="p-4">
              <h4 className="text-xl font-semibold">562/A1</h4>
              <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <Link to={"/captain-home"}
            className="bg-green-600 text-white flex justify-center w-full py-2 rounded mt-4 font-semibold text-lg"
          >
            Finish Ride
          </Link>
          <p className="text-center mt-4 text-xs text-gray-500">
            Tap to <span className="font-bold text-gray-500">Finish Ride</span>, if you have completed the payment and dropped the passenger at their destination.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FinishRide