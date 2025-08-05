import React, { createContext, use, useContext, useState } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// Custom hook to use the CaptainContext
// export const useCaptain = () => {
//     const context = useContext(CaptainDataContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// }

// Provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Example: update captain info
    const updateCaptain = (newCaptain) => {
        if (newCaptain) {
            console.log('Updating captain data:', newCaptain);
            setCaptain(newCaptain);
        } else {
            console.log('Clearing captain data');
            setCaptain(null);
        }
    };

    // Example: clear captain info
    const value = {
        captain,
        setCaptain: updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;