import React from 'react';
import { useAuth } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    if (auth.user && location.pathname === '/adminpanel') {
      console.log('Logging out...');
      setAuth({ user: null, token: '' });
      localStorage.removeItem('auth');
      navigate('/login');
    } else if (auth.user) {
      // Automatically log out if user is logged in but not on the admin panel
      console.log('Logging out...');
      setAuth({ user: null, token: '' });
      localStorage.removeItem('auth');
      navigate('/login');
    } else {
      window.open('/login', '_blank');
    }
  };

  if (auth.user) {
    if (location.pathname === '/adminpanel') {
      return (
        <div className="fixed top-0 left-0 mt-[-30px] p-4 py-2">
          <button
            className={`mt-8 rounded-full px-8 py-3 group relative 
              ${isHovered ? "bg-gradient-to-r from-ps to-pp" : "bg-transparent"}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleButtonClick}
          >
            <p
              className={`text-textlight ${
                isHovered
                  ? " text-texlight bg-clip-text bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70"
                  : "opacity-0"
              }`}
            >
              Logout
            </p>
          </button>
        </div>
      );
    } else {
      // Automatically log out if user is logged in but not on the admin panel
      console.log('Logging out...');
      setAuth({ user: null, token: '' });
      localStorage.removeItem('auth');
      navigate('/');
      return null;
    }
  }

  return (
    <div className="fixed top-0 left-0 mt-[-30px] p-4 py-2">
      <button
        className={`mt-8 rounded-full px-8 py-3 group relative 
          ${isHovered ? "bg-gradient-to-r from-ps to-pp" : "bg-transparent"}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleButtonClick}
      >
        <p
          className={`text-textlight ${
            isHovered
              ? " text-texlight bg-clip-text bg-opacity-50 backdrop-blur-sm hover:bg-opacity-70"
              : "opacity-0"
          }`}
        >
          Login
        </p>
      </button>
      
    </div>
  );
}

export default Login;
