import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {AnimatePresence, motion} from "framer-motion"
const HomeSocialLinks = ({ data, index }) => {
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      key={data.id}
      href={data.uril} 
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, index: 0.1 }}
      translation={{ delay: index * 0.1 }}
      className="w-12 h-12 rounded-full bg-gradient-to-br bg-bgPrimary from-ps to-pp relative p-[2px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div className="absolute inset-0 blur-md bg-gradient-to-br bg-bgPrimary from-primary to-secondary -z-10"></motion.div>
        )}
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <data.Icon className={`text-texlight`} />
        </div>
      </AnimatePresence>
    </motion.a>
  );
};

export default HomeSocialLinks;

