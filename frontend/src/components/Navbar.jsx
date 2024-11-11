import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage or any other storage if set during login
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear any stored authentication data, e.g., token
    localStorage.removeItem('authToken');
    localStorage.removeItem('username'); // Clear the username if stored in localStorage
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <>
    <div className="font-bold text-lg">Logo</div>
    <div className="bg-blue-100 p-1 flex justify-between items-center">
      {/* Left Section - Logo */}
    
      
      {/* Center Section - Links */}
      <div className="flex gap-8 mx-auto">
        <a href="/dashboard" className="text-black hover:text-blue-700">
          Home
        </a>
        <a href="/employeelist" className="text-black hover:text-blue-700">
          Employee List
        </a>
      </div>

      {/* Right Section - Username and Logout */}
      <div className="flex items-center gap-4">
        <span className="text-black font-medium">sai</span>
        <button onClick={handleLogout} className="text-black hover:text-blue-700 px-4">
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Navbar;
