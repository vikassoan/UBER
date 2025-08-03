import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to='/home' className="fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-semibold ri-home-line"></i>
        </Link>
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://si.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Sarthak</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center">
            <div className="flex w-full items-center border-b-1">
              <i className="text-2xl font-semibold ri-square-line"></i>
              <div className="p-4">
                <h4 className="text-xl font-semibold">562/A1</h4>
                <p className="text-sm text-gray-500">Kankariya Talab, Bhopal</p>
              </div>
            </div>

            <div className="flex w-full items-center">
              <i className="text-2xl font-semibold ri-bank-card-line"></i>
              <div className="p-4">
                <h4 className="text-xl font-semibold">₹193.20</h4>
                <p className="text-sm text-gray-500">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-green-600 text-white w-full py-2 rounded mt-4 font-semibold text-lg">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
