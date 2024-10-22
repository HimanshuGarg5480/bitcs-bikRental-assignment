import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { setUser } from '../../redux/feature/user/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // Combined state for email and password
  const [error, setError] = useState(''); // Added state for error message
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update the specific field in the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submission
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use formData for the request body
      });

      if (!response.ok) {
        throw new Error('Login failed'); // This will be caught in the catch block
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem('jwt', data.user.token); 
      const {id,email,role,username} = data.user;
      dispatch(setUser({id,email,role,username})); // Dispatch action to set user data in Redux store
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed. Please check your credentials and try again.'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email:</label>
          <input 
            type="email" 
            name="email" // Added name attribute
            value={formData.email} // Access email from formData
            onChange={handleChange} // Use handleChange for input
            required 
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Password:</label>
          <input 
            type="password" 
            name="password" // Added name attribute
            value={formData.password} // Access password from formData
            onChange={handleChange} // Use handleChange for input
            required 
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">Login</button>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
