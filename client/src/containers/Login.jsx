import React, { useState } from 'react';

const Login = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleLoginClick = () => {
    window.open('/login', '_blank');
  };

  return (
    <div className="fixed top-0 left-0 mt-[-30px] p-4 py-2">
      <button
        className={`mt-8 rounded-full px-8 py-3 group relative 
          ${isHovered ? "bg-gradient-to-r from-ps to-pp" : "bg-transparent"}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleLoginClick}
      >
        <p
          className={`text-textlight ${
            isHovered
              ? "text-transparent text-texlight bg-clip-text bg-opacity-50 backdrop-blur-sm   hover:bg-opacity-70"
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
