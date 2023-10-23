import React from 'react';

import { useAuth } from '../utils/auth';
import Login from './Login';

import { About, Menu, Project, Skill } from "../admin";
import {Message} from "../admin"; // Import the Message component
import LoginPage from './LoginPage';

const AdminPanel = ({ onLogout}) => {
  const [auth, setAuth] = useAuth();


  if (!auth || !auth.user) {
    // If user is not logged in, render the Login component
    return <LoginPage/>;
  }
  return (
    <div className="flex">

      <div className="flex flex-col items-center justify-center w-full overflow-y-auto">
        <div id="adminpanel" className=" p-2 rounded-lg shadow-md fixed top-0">
          <h1 className="text-l font-bold mb-1">User Details</h1>
          <div className="text-sm font-mono">
            Email: {auth?.user?.email} | User ID: {auth?.user?.userId} 
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-screen-xl mt-16">
          <div className="lg:w-1/3">
            <About />
          </div>

          <div className="lg:w-1/3">
            <Project />
          </div>

          <div className="lg:w-1/3">
            <Skill />
          </div>
        </div>

        <div className="mt-8 lg:w-1/3"></div>

        <Login />

         {/* Include the Message component here */}
        <Menu/>

      </div>
    </div>
  );
};

export default AdminPanel;
