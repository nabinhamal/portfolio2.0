import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf1, Leaf2 } from "../assets";
import { SkillCard } from "../components";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FaGraduationCap, FaSchool, FaCalendarAlt } from 'react-icons/fa'; 

const Skills = () => {
  const [eduAbout, setEduAbout] = useState([]);
  const [skillAbout, setSkillAbout] = useState([]);

  // Get all about
  const getData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/qualification/get-all`);
      if (data?.success) {
        setEduAbout(data?.records[0].education);
        setSkillAbout(data?.records[0].skills);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="skills" className="flex items-center justify-center flex-col gap-12 my-12">
      {/* Title */}
      <div className="flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 25 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-2"
          style={{ maxWidth: '100%' }}
        >
          <img src={Leaf1} className="w-6 h-auto object-contain" alt="" />
          <p className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary text-xl font-serif tracking-widest uppercase" style={{ whiteSpace: 'nowrap' }}>Skills</p>
          <img src={Leaf2} className=" w-6 h-auto object-contain" alt="" />
        </motion.div>
      </div>
      {/* Main content */}
      <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-3 w-full">
        {/* Content section */}
        <div className="flex px-8 flex-col gap-4 items-start justify-start">
          <h2 className="w-full flex items-center justify-center px=8 text-3xl">Education</h2>
          {eduAbout?.map((qualification, index) => (
  <div key={index} className="border border-black p-4 mb-4 rounded" style={{ height: 'fit-content' }}>
    <div className="flex items-center mb-2">
      <div className="bg-black rounded-full p-2 mr-4">
        <FaGraduationCap className="text-white text-xl" /> {/* Icon for Degree */}
      </div>
      <p className="text-textlight font-bold">{qualification.degree}</p>
    </div>
    <div className="flex items-center mb-2">
      <div className="bg-black rounded-full p-2 mr-4">
        <FaSchool className="text-white text-xl" /> {/* Icon for School */}
      </div>
      <p className="text-textlight font-bold">{qualification.school}</p>
    </div>
    <div className="flex items-center mb-2">
      <div className="bg-black rounded-full p-2 mr-4">
        <FaCalendarAlt className="text-white text-xl" /> {/* Icon for Year */}
      </div>
      <p className="text-textlight font-bold">{qualification.year}</p>
    </div>
  </div>
))}







            
        </div>
        {/* Add your content here */}
        {/* Content section */}
        <div className="flex px-8 flex-col gap-4 items-start justify-start">
          <h2 className="w-full flex items-center justify-center px=8 text-3xl">Skills</h2>
          {skillAbout?.map((ski,index)=>(

            <div key={index}  className="transition-transform transform hover:scale-105 w-full  px-2">
               <SkillCard skill={ski.skill} percentage={ski.pre} color={ski.color} move={true} />

            </div>
          ))
            
          }
         
        </div>
      </div>
    </section>
  );
};

export default Skills;
