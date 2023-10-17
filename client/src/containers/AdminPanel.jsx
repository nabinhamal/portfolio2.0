import React from 'react';

import { useAuth } from '../utils/auth';
import Login from './Login';
import ParticlesContainer from './ParticlesContainer';


const AdminPanel = ({ onLogout }) => {
  const[auth,setAuth] = useAuth()
 
  return (
    <div className="p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center relative">
       
       <ParticlesContainer />
      
      <div className="flex items-center gap-4 lg:gap-32 mb-4 lg:mb-0">

        <pre>{JSON.stringify(auth,null,4)}</pre>
       
      </div>
     
      <Login/>
     
    </div>
  );
};

export default AdminPanel;
