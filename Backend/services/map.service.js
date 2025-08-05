const axios = require("axios");
const captainModel = require("../models/captain.model");

const apikey = process.env.GOOGLE_MAPS_API;

// Helper function to check if API key is valid
const checkApiKey = () => {
  if (!apikey || apikey === 'your_google_maps_api_key_here') {
    throw new Error("Google Maps API key is not configured. Please set GOOGLE_MAPS_API in your environment variables.");
  }
};

module.exports.getAddressCoordinate = async (address) => {
  checkApiKey();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  checkApiKey();
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error(`Distance matrix failed: ${response.data.status}`);
    }
  } catch (err) {
    console.error("Distance matrix error:", err);
    throw err;
  }
};

module.exports.getSuggestions = async (input) => {
  checkApiKey();
  if (!input || input.trim().length === 0) {
    throw new Error("Query is required for suggestions");
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input.trim()
  )}&components=country:in&types=geocode&key=${apikey}&sessiontoken=${Date.now()}`;
  // Add session token to optimize billing and restrict to India addresses with geocode type

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions.map((prediction) => ({
        description: prediction.description,
        place_id: prediction.place_id,
      }));
    } else if (response.data.status === "ZERO_RESULTS") {
      return [];
    } else {
      throw new Error(`Places API failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Places API error:", error);
    // Return empty array instead of throwing error for better UX
    return [];
  }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    console.log(`Looking for captains near lat: ${lat}, lng: ${lng}, radius: ${radius}km`);
    
    try {
        // First try to find captains with location data
        const captainsWithLocation = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [ [ lng, lat ], radius / 6371 ]
                }
            },
            status: 'active' // Only active captains
        });

        console.log(`Found ${captainsWithLocation.length} captains with location data`);

        // If no captains found with location, get all active captains as fallback
        if (captainsWithLocation.length === 0) {
            console.log('No captains found with location data, getting all active captains as fallback');
            const allActiveCaptains = await captainModel.find({ 
                status: 'active',
                socketId: { $exists: true, $ne: null } // Only captains with socket connection
            });
            console.log(`Found ${allActiveCaptains.length} active captains as fallback`);
            return allActiveCaptains;
        }

        return captainsWithLocation;
    } catch (error) {
        console.error('Error finding captains in radius:', error);
        
        // Fallback: get all active captains
        try {
            const fallbackCaptains = await captainModel.find({ 
                status: 'active',
                socketId: { $exists: true, $ne: null }
            });
            console.log(`Fallback: Found ${fallbackCaptains.length} active captains`);
            return fallbackCaptains;
        } catch (fallbackError) {
            console.error('Fallback error:', fallbackError);
            return [];
        }
    }
};
