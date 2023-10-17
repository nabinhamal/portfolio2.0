import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import ParticlesContainer from './ParticlesContainer';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner'; // Import the Spinner component

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, {email, password});
      if(res && res.data.success) {
        toast.success(res.data && res.data.message) ;
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate("/adminpanel");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParticlesContainer />
      <div className="z-10 bg-white p-6 shadow-sm rounded-lg max-w-md w-full">
        <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In 
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email 
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder='Enter email'
                required
                className="block py-1.5 w-full rounded-md border border-gray-300 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
                required
                className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Toaster />
      {isLoading && <Spinner />}
    </div>
  );
}

export default LoginPage;
