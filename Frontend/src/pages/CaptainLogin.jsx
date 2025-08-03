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

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const captainData = {
        email: email,
        password: password,
      };
      const response = await api.post("/captains/login", captainData);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 pt-4 h-screen relative">
      <div className="mb-20">
        <img
          className="w-20 mb-7"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Welcome back, Captain</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sign in to access your driver account
          </p>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <button
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          Don't have a driver account?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Sign up here
          </Link>
        </p>
      </div>
      <LoginSwitchButton isUserLogin={false} />
      </div>
  );
};

export default CaptainLogin;
