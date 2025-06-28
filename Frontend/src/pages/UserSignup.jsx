import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate('/home');
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-8 h-screen flex flex-col justify-between">
      <div>
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
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
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
          <button
            className="bg-[#111] text-white font-semibold rounded px-4 py-2 mb-4 w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/user-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[0.6rem] text-gray-400 text-center">
          We respect your privacy — your signup info is safe, never shared, and used only to ensure a smooth ride experience.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
