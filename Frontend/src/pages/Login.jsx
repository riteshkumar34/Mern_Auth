import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (msg) => {
    toast.error(msg);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Both email and password are required');
    }

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      console.log(result);

      if (!result.success) {
        handleError(result.message || 'Login failed');
      } else {
        // Show toast
        toast.success('Login successful!');

        // Save token & user info
        localStorage.setItem('token', result.jwtToken);
        localStorage.setItem('name', result.name);
        localStorage.setItem('email', result.email);

        // Redirect to /home after short delay
        setTimeout(() => navigate('/home'), 300); // 300ms delay so toast shows
      }
    } catch (error) {
      handleError(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              autoFocus
              placeholder="Enter your email..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-all font-semibold"
          >
            Login
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
