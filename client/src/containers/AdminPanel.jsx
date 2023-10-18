import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import Login from './Login';

import { About, Menu, Project, Skill } from "../admin";
import {Message} from "../admin"; // Import the Message component

const AdminPanel = ({ onLogout }) => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="flex">

      <div className="flex flex-col items-center justify-center w-full overflow-y-auto">
        <div id="adminpanel" className=" p-2 rounded-lg shadow-md fixed top-0">
          <h1 className="text-l font-bold mb-1">User Details</h1>
          <div className="text-sm font-mono">
            Email: {auth?.user?.email} | User ID: {auth?.user?.userId} | Role: {auth?.user?.role}
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

        <Message /> {/* Include the Message component here */}
        <Menu/>

      </div>
    </div>
  );
};

export default AdminPanel;
