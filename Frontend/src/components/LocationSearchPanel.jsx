import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        const locationText = suggestion.description || suggestion;
        if (activeField === 'pickup') {
            setPickup(locationText);
        } else if (activeField === 'destination') {
            setDestination(locationText);
        }
    }

    return (
        <div className="max-h-[300px] overflow-y-auto">
            {suggestions && suggestions.length > 0 ? (
                suggestions.map((elem, idx) => (
                    <div 
                        key={`${elem.place_id || idx}`}
                        onClick={() => handleSuggestionClick(elem)} 
                        className='flex gap-4 border-2 p-3 border-gray-50 hover:border-black hover:bg-gray-50 transition-all cursor-pointer rounded-xl items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium truncate'>{elem.description || elem}</h4>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">
                    {suggestions ? "No locations found" : "Type to search locations"}
                </div>
            )}
        </div>
    )
}

export default LocationSearchPanel