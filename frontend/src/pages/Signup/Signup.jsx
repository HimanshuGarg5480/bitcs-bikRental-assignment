import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { setUser } from "../../redux/feature/user/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();


  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed"); 
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("jwt", data.user.token);
      const { id, email, role, username } = data.user;
      dispatch(setUser({ id, email, role, username }));
      navigate('/')
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}{" "}
        <p className="mt-4 text-center text-gray-300">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
