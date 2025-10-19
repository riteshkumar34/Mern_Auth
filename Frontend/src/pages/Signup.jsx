import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (msg) => {
    toast.error(msg);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('All credentials are required');
    }

    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        handleError(result.message || 'Signup failed');
      } else {
        toast.success('Signup successful!');
        // Optional: redirect to login page
        // navigate('/login');
      }
    } catch (error) {
      handleError(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              autoFocus
              placeholder="Enter your name..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-all font-semibold"
          >
            Signup
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signup;
