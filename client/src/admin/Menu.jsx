import React, { useState } from "react";
import { FaHome, FaComment } from "react-icons/fa";

const Header = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed bottom-0 right-0 lg:top-0 w-full h-auto lg:h-screen lg:w-32 flex justify-center items-end lg:items-center pb-8 lg:pb-0 z-50">
      <div className="px-4 py-3 lg:py-12 rounded-full border border-[rgb(188,173,173)] flex flex-row lg:flex-col items-center justify-center gap-12 duration-200 backdrop-blur-md">
        {/* Home Icon */}
        <a
          href="#"
          className="w-12 h-12 flex rounded-full items-center justify-center group cursor-pointer"
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className={`border p-2 rounded-full ${
              hovered === "home" ? "bg-gradient-to-br from-primary to-secondary" : ""
            }`}
          >
            <FaHome className={`text-textlight text-xl ${hovered === "home" ? "text-white" : ""}`} />
          </div>
          {hovered === "home" && (
            <div className="hidden lg:block absolute bg-white rounded-md px-6 py-2 -left-[140px] after:absolute after:-right-1 after:top-3 after:w-3 after:h-3 after:bg-white after:rotate-45" style={{ boxShadow : "inset 0px 0px 10px rgba(0,0,0,0.4)" }}>
              <p className="text-bgPrimary">Admin Panel</p>
            </div>
          )}
        </a>

        {/* Messages Icon */}
        <a
          href="#message"
          className="w-12 h-12 flex rounded-full items-center justify-center group cursor-pointer"
          onMouseEnter={() => setHovered("messages")}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className={`border p-2 rounded-full ${
              hovered === "messages" ? "bg-gradient-to-br from-primary to-secondary" : ""
            }`}
          >
            <FaComment className={`text-textlight text-xl ${hovered === "messages" ? "text-white" : ""}`} />
          </div>
          {hovered === "messages" && (
            <div className="hidden lg:block absolute bg-white rounded-md px-6 py-2 -left-[140px] after:absolute after:-right-1 after:top-3 after:w-3 after:h-3 after:bg-white after:rotate-45" style={{ boxShadow : "inset 0px 0px 10px rgba(0,0,0,0.4)" }}>
              <p className="text-bgPrimary">Messages</p>
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

export default Header;
