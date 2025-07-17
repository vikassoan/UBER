import React from "react";

const LocationSearchPanel = (props) => {  
  const Location = [
    "42 Baker Street, London, UK NW1 6XE",
    "221B Baker Street, London, UK NW1 6XE",
    "10 Downing Street, London, UK SW1A 2AA",
    "Buckingham Palace, London, UK SW1A 1AA",
  ];
  return (
    <div className="px-4">
      {/* this is temp data */}
      {Location.map((elem, idx) => {
        return (
          <div key={idx} onClick={()=>{props.setVehiclePanel(true); props.setPanelOpen(false);}} className="flex items-center border-2 px-4 py-2 m-2 rounded-xl border-white active:border-black justify-start gap-4 my-4">
            <h4 className="bg-[#eeeeee] w-10 h-10 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill text-xl"></i>
            </h4>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
