import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../utils/api';
import { UserDataContext } from "../context/UserContext";
import LoginSwitchButton from "../components/LoginSwitchButton";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserDataContext);

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
      const userData = {
        email: email.trim(),
        password: password
      };

      const response = await api.post("/users/login", userData);
      const data = response.data;
      
      if (data.token && data.user) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        
        // Clear form
        setEmail("");
        setPassword("");
        
        // Redirect to home
        navigate("/home");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
      setPassword(""); // Clear password on error
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 h-screen relative">
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
          <h3 className="text-lg font-medium mb-2">Welcome back</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sign in to access your account
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
          <LoginSwitchButton isUserLogin={true} />
          <button
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/user-signup" className="text-blue-600">
            Sign up here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[0.6rem] text-gray-400 text-center">
          We respect your privacy — your login info is safe, never shared, and used only to ensure a smooth ride experience.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
