// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(username)
     console.log(password)
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-machine.vercel.app/api/login', { username, password });
     
     
      document.cookie = `token=${response.data.token}; path=/;`;
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <>
    Logo
    <h2 className="text-xl font-bold  text-gray-700 bg-yellow-200">Login Page</h2>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-400 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
