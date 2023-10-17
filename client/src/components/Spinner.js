import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLoader from './MainLoader';

const Spinner = ({ path = 'adminpanel' }) => {
  const [isLoading, setIsLoading] = useState(true); // Corrected the initial state value
  const navigate = useNavigate();
  const location = useLocation(); // Corrected the variable name

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 1000);

    navigate(`${path}`, {
      state: location.pathname,
    });

    return () => clearInterval(interval);
  }, [navigate, location, path]);

  return <>{isLoading ? <MainLoader /> : null}</>; // Render MainLoader only if isLoading is true
};

export default Spinner;
