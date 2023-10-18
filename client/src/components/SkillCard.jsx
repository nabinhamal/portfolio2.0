import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ skill, percentage, color, move }) => {
  return (
    <div className="border border-black rounded-md px-8 py-3 cursor-pointer group w-full flex items-center justify-between relative gap-2"
      style={{
        boxShadow: "inset 0 0 10px rgba(255,255,255,0.3)",
        marginLeft: move ? -30 : 20,
      }}
    >
      {/* Name section */}
      <div className="flex-1 flex-col items-center justify-start flex gap-2">
        <p className="text-base text-black">{skill}</p>
        <div className="w-full h-1 rounded-md overflow-hidden bg-[hsl(0,89%,33%)] relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: percentage }}
            transition={{ duration: 1.5 }}
            className="h-full absolute top-0 left-0"
            style={{ background: color }}
          />
        </div>
      </div>

      {/* Percentage section */}
      <div className="w-16 h-12 rounded-full relative overflow-hidden flex items-center justify-center border border-black">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: percentage }}
          transition={{ duration: 1.5 }}
          style={{ background: color }}
          className="w-full absolute bottom-0 left-0 flex items-center justify-center"
        >
          <p className="text-textlight z-10 font-sans font-bold tracking-wider">
            {percentage}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillCard;
