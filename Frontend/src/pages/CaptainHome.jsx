import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetail from "../components/CaptainDetail";
import RidePopUp from "../components/RidePopUp";
import ConformRidePopUp from "../components/ConfirmRidePopUp";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [confirmRidePopUpPanel]);

  useEffect(() => {
    if (captain && captain._id) {
      socket.emit('join', { userType: 'captain', userId: captain._id });

      socket.on('new-ride-request', (ride) => {
        setCurrentRide(ride);
        setRidePopUpPanel(true);
      });

      socket.on('ride-cancelled', () => {
        setCurrentRide(null);
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(false);
      });
    }

    return () => {
      socket.off('new-ride-request');
      socket.off('ride-cancelled');
    };
  }, [captain, socket]);

  return (
    <div className="h-screen">
      <div className="fixed p-8 top-0 flex items-center justify-between w-full">
        <img
          className="w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-fill"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="https://si.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetail />
      </div>
      <div ref={ridePopUpPanelRef} className="fixed w-full z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
        <RidePopUp 
          ride={currentRide}
          setRidePopUpPanel={setRidePopUpPanel} 
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        />
      </div>

      <div ref={confirmRidePopUpPanelRef} className="fixed w-full h-screen z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
        <ConformRidePopUp 
          ride={currentRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
          setRidePopUpPanel={setRidePopUpPanel} 
        />
      </div>
    </div>
  );
};

export default CaptainHome;
