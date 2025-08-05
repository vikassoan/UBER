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
    if (ridePopUpPanelRef.current) {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: 'translateY(0)',
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: 'translateY(100%)',
          duration: 0.3,
          ease: 'power2.in'
        })
      }
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanelRef.current) {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: 'translateY(0)',
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: 'translateY(100%)',
          duration: 0.3,
          ease: 'power2.in'
        })
      }
    }
  }, [confirmRidePopUpPanel]);

  useEffect(() => {
    if (captain && captain._id) {
      console.log('Captain joining socket:', captain._id);
      socket.emit('join', { userType: 'captain', userId: captain._id });

      socket.on('new-ride-request', (ride) => {
        console.log('New ride request received:', ride);
        setCurrentRide(ride);
        setRidePopUpPanel(true);
        setConfirmRidePopUpPanel(false);
        
        // Show notification sound or alert
        if (Notification.permission === 'granted') {
          new Notification('New Ride Request', {
            body: `Ride from ${ride.pickup} to ${ride.destination}`,
            icon: '/favicon.ico'
          });
        }
      });

      socket.on('ride-cancelled', () => {
        console.log('Ride cancelled');
        setCurrentRide(null);
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(false);
      });

      // Debug: Listen for any socket events
      socket.onAny((eventName, ...args) => {
        console.log('Socket event received:', eventName, args);
      });
    }

    return () => {
      socket.off('new-ride-request');
      socket.off('ride-cancelled');
      socket.offAny();
    };
  }, [captain, socket]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('Ride popup panel state:', ridePopUpPanel);
    console.log('Current ride:', currentRide);
    console.log('Captain data:', captain);
  }, [ridePopUpPanel, currentRide, captain]);

  if (!captain) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading captain data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 p-6 flex items-center justify-between bg-white shadow-sm">
        <img
          className="w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        <Link
          to="/captain-login"
          className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        >
          <i className="text-xl text-gray-600 ri-logout-box-r-fill"></i>
        </Link>
      </div>
      
      {/* Map Background */}
      <div className="h-3/5 mt-20">
        <img
          className="w-full h-full object-cover"
          src="https://si.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt="Map"
        />
      </div>
      
      {/* Captain Details */}
      <div className="h-2/5 p-6 bg-white rounded-t-3xl shadow-2xl">
        <CaptainDetail />
      </div>
      
      {/* Ride Popup */}
      <div 
        ref={ridePopUpPanelRef} 
        className="fixed w-full z-30 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl"
      >
        <RidePopUp 
          ride={currentRide}
          setRidePopUpPanel={setRidePopUpPanel} 
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        />
      </div>

      {/* Confirm Ride Popup */}
      <div 
        ref={confirmRidePopUpPanelRef} 
        className="fixed w-full h-screen z-30 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl"
      >
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
