import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import api from '../utils/api';

const CaptainSignup = () => {
  const navigate = useNavigate();
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!firstname || !lastname || !email || !password || !vehicleColor || !vehiclePlate || !vehicleCapacity || !vehicleType) {
      setError("All fields are required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Validate vehicle plate format
    const plateRegex = /^[A-Z0-9]{1,10}$/;
    if (!plateRegex.test(vehiclePlate.toUpperCase())) {
      setError("Please enter a valid vehicle plate number (1-10 alphanumeric characters)");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const captainData = {
        fullname: {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
        },
        email: email.trim().toLowerCase(),
        password: password,
        vehicle: {
          color: vehicleColor.trim(),
          plate: vehiclePlate.trim().toUpperCase(),
          capacity: parseInt(vehicleCapacity),
          type: vehicleType,
        },
      };

      const response = await api.post("/captains/register", captainData);

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-steering-line text-white text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join as a Captain</h1>
            <p className="text-gray-600">Start earning by connecting with passengers</p>
          </div>
          
          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <input
                className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <input
                className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  type="text"
                  placeholder="Vehicle color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  type="text"
                  placeholder="Plate number"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
                <input
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  type="number"
                  min="1"
                  placeholder="Capacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select
                  className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="">Vehicle type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full bg-black text-white font-semibold py-4 rounded-2xl text-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Captain Account'}
            </button>
          </form>
          
          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center pb-6">
        <p className="text-xs text-gray-400">
          Sign up as a driver to connect with passengers and start your journey
          with ease and safety.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
