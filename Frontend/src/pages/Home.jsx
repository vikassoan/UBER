import React, { useState, useRef, use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen, panelRef, panelCloseRef]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(confirmRidePanelRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(vehicleFoundRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
      transform: 'translateY(0)',
    })
    } else {
      gsap.to(waitingForDriverRef.current, {
      transform: 'translateY(100%)',
    })
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-20 absolute left-8 top-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <img
          className="w-full h-full object-cover"
          src="https://si.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt=""
        />
      </div>

      <div className="h-screen absolute flex flex-col justify-end top-0 w-full">
        <div className="h-[30%] bg-white p-4 relative">
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(!panelOpen)} className="absolute right-4 top-4 text-2xl opacity-0">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line flex flex-col justify-between items-center absolute h-17 w-1 top-[42%] left-9 rounded-full">
              <div className="dot h-2 w-2 bg-gray-700"></div>
              <div className="line h-12 w-1 bg-gray-700 rounded-full"></div>
              <div className="dot h-2 w-2 bg-gray-700 rounded"></div>
            </div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eeeeee] rounded px-10 py-2 mb-4 w-full text-lg placeholder:text-sm"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eeeeee] rounded px-10 py-2 mb-4 w-full text-lg placeholder:text-sm"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel  setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
            <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
            <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 px-4 py-10 bg-white translate-y-full">
            <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
