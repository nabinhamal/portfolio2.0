import React from "react";
import { motion } from "framer-motion";
import { Leaf1, Leaf2 } from "../assets";
import { SkillCard } from "../components";

const Skills = () => {
  return(
  <section id="skills" className="flex items-center justify-center flex-col gap-12 my-12">
  {/* Title */}
  <div className="flex items-center justify-center py-20">
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 25 }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-center space-x-2"
      style={{ maxWidth: '100%' }}
    >
      <img src={Leaf1} className="w-6 h-auto object-contain" alt="" />
      <p className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary  text-xl font-serif tracking-widest uppercase" style={{ whiteSpace: 'nowrap' }}>Skills</p>
      <img src={Leaf2} className="w-6 h-auto object-contain" alt="" />
    </motion.div>
  </div>
    {/* Main content */}
    <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-3 w-full">
      {/* Content section */}
      <div className="flex px-8 flex-col gap-4 items-start justify-start">
        <h2 className="w-full flex items-center justify-center px=8">Educaton</h2>
        <p className="text-textlight text-base tracking-wide text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, quisquam placeat, rem velit necessitatibus incidunt voluptatum distinctio ducimus illo provident ipsam harum ipsa quibusdam iusto obcaecati modi natus corrupti voluptate.</p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, esse cupiditate fugit laborum qui error nisi veniam doloremque et iusto, tenetur dolore iure iste, ipsum accusamus voluptatem dolor exercitationem. Aperiam?
      </div>
      {/* Add your content here */}
       {/* Content section */}
       <div className="w-full flex flex-col items-center justify-center gap-3 px-8">
       <h2 className="w-full flex items-center justify-center px=8 gap-3 px-8">Skills</h2>
      <SkillCard skill={"HTML-5"} percentage={"80%"} color={"#9fffcb"} move={true}/>
      <SkillCard skill={"Tailwind CSS"} percentage={"60%"}  color={"#e63946"} />
      <SkillCard skill={"React js"}percentage={"70%"}  color={"#9381ff"}move={true}/>
      <SkillCard skill={"Node js"} percentage={"50%"} color={"#eb5e28"}/>
      <SkillCard skill={"MySQL"}percentage={"80%"}  color={"#ffa5ab"}move={true}/>
      <SkillCard skill={"Git"}percentage={"90%"}  color={"#344e41"}/>
      <SkillCard skill={"Strong Communication"} percentage={"92%"} color={"#008000"} move={true}/>

        
      </div>
      
    </div>
  </section>
)};

export default Skills;
