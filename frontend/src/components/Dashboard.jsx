import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // Retrieve the username on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Change 'username' to the correct key if needed
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);



  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1">
       <Navbar />

        {/* Sidebar */}
        <div className="w-full bg-yellow-300 px-2 flex justify-between">
          <a href="#" className="block font-bold text-black mb-4">
            Dashboard
          </a>
          <button
            className="bg-green-300 px-16 rounded text-right"
            onClick={() => navigate("/employee")}
          >
            Create Employee
          </button>
        </div>

        {/* Welcome Message */}
        <div className="flex items-center justify-center h-full p-8">
          <h1 className="text-2xl font-bold">Welcome Admin Panel</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
