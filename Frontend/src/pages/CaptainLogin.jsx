import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-8 pt-4 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Fresh Wheels on Duty!{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as Captain
          </Link>
        </p>
      </div>
      <div>
        <Link to='/user-login' className="bg-amber-600 flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-sm">
          Login as User
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
