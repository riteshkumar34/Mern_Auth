import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');

    if (!token) {
      // Not logged in, redirect to login page
      toast.info('Please login first');
      navigate('/login');
    } else {
      setName(userName);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {name}!</h1>
        <p className="text-gray-600 mb-6">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-all font-semibold"
        >
          Logout
        </button>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Home;
