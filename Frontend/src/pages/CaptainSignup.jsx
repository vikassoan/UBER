import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {

  const navigate = useNavigate();
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstname("");
    setLastname("");
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
          <h3 className="text-lg font-medium mb-2">
            What's our captain's name?
          </h3>
          <div className="flex gap-4 mb-4">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's our captain's email?
          </h3>
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

          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-sm"
              required
              type="text"
              placeholder="Plate Number"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-sm"
              required
              type="number"
              min="1"
              placeholder="Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-sm"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[0.6rem] text-gray-400 text-center">
          Sign up as a driver to connect with passengers and start your journey
          with ease and safety.{" "}
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
