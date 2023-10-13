import React from 'react';
import { AboutMe } from '../admin';

const AdminPanel = ({ onLogout }) => {
  const handleLogoutClick = () => {
    // Assuming a successful logout action here
    onLogout();
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center relative">
      <div className="flex items-center gap-4 lg:gap-32 mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4 lg:mb-0 lg:mr-4">Welcome to the Admin Panel</h1>
        <button 
          onClick={handleLogoutClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <AboutMe />
      <button 
        onClick={handleLogoutClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4 lg:hidden"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
