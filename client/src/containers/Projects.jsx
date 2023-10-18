import React ,{useState,useEffect}from "react";
import { motion , AnimatePresence } from "framer-motion";
import { Leaf1, Leaf2, about } from "../assets";
import { ProjectsData } from './../utils/helper';
import { FaGithub } from "react-icons/fa6";
import axios from "axios";
import { toast } from 'react-hot-toast';
const Projects = () => {
  const [projects, setProjects] = useState([]);

  // Get all about
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/project/get-project`);
        console.log(data);
        setProjects(data?.projects[0]?.pname || []); // Ensure pname is an array or default to empty array
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);





  return (
    <section id="projects" className="flex items-center justify-center flex-col gap-12 my-12">
      {/* Title */}
      <div className="flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 25 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-2"
          style={{ maxWidth: '100%' }}
        >
          <img src={Leaf1} className="w-6 h-auto object-contain" alt="" />
          <p className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>Projects</p>
          <img src={Leaf2} className="w-6 h-auto object-contain" alt="" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <AnimatePresence>
          {ProjectsData && ProjectsData?.map((project,index) => (
            <ProjectCard key={index} project={project}/>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="overflow-hidden cursor-pointer relative rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img 
        whileHover={{ scale: 1.1 }}
        className="w-full h-full object-contain rounded-lg"
        src={`${process.env.REACT_APP_API}/project/get-project/imgSrc`}  
        alt={project.ptitle}  
      />
      {isHovered && (
        <motion.div className="absolute inset-0 backdrop-blur-md bg-[rgba(0,0,0,0.6)] flex items-center justify-center flex-col gap-2">
          <p className="text-xl text-primary">{project.ptitle}</p>
          <a href={project.gitUrl} className="">
            <FaGithub className="text-3xl text-white items-center justify-center hover:text-primary"/>
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Projects;
