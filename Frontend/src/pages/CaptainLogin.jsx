import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../utils/api';
import { CaptainDataContext } from "../context/CaptainContext";
import LoginSwitchButton from "../components/LoginSwitchButton";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const captainData = {
        email: email.trim().toLowerCase(),
        password: password,
      };
      
      console.log('Attempting captain login:', captainData.email);
      
      const response = await api.post("/captains/login", captainData);
      
      if (response.status === 200) {
        const data = response.data;
        console.log('Captain login successful:', data.captain._id);
        
        if (data.captain && data.token) {
          setCaptain(data.captain);
          localStorage.setItem("token", data.token);
          navigate("/captain-home");
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      setPassword(""); // Clear password on error
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Captain</h1>
            <p className="text-gray-600">Sign in to access your driver account</p>
          </div>
          
          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have a driver account?{" "}
            <Link to="/captain-signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up here
            </Link>
          </p>
          
          {/* Switch Button */}
          <div className="mt-8">
            <LoginSwitchButton isUserLogin={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
