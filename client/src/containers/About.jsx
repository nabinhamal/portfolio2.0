import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { Leaf1, Leaf2, about } from "../assets";
import axios from "axios"
import { toast } from 'react-hot-toast';



const About = () => {
  const [aboutDetail,setAboutDetail] = useState([])
  

//get all about 
const getAbout = async() =>{
try {
  const {data} = await axios.get(`${process.env.REACT_APP_API}/detail/get-detail`);
if (data?.success){
  setAboutDetail(data?.details) ;
  
}
}catch(error){
  console.log(error)
  toast.error("Somethimg went wrong in getting details")
}
}

useEffect(() => {
getAbout();
},[]);


  return (
    <section id="about" className="flex items-center justify-center flex-col gap-12 my-12">
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
        <p className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>About me</p>
        <img src={Leaf2} className="w-6 h-auto object-contain" alt="" />
      </motion.div>
    </div>
      {/* Main content */}
      <div className="grid mt-12 grid-cols-1 lg:grid-cols-2 gap-4 w-full">

        {/* Image section */}
        <div className="w-full flex items-center justify-center px-8">
          <div className="w-full lg:w-96 p-[2px] rounded-md bg-gradient-to-br from bg-primary to-secondary relative" style={{ width: '500px', height: '500px' }}>
              
         
              <img src={`${process.env.REACT_APP_API}/detail/get-photo-detail/profileabout`} style={{ width: '500px', height: '500px' }} alt="Profile About" />
            
            <div className="absolute w-full h-full -top-3 -left-2 bg-gradient-to-br from bg-primary to-secondary rounded-md bluer-[5px] -z-10"></div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex px-8 flex-col gap-4 items-start justify-start">
        {aboutDetail?.map((detail, index) => (
    <p key={index} className="text-textlight text-base tracking-wide text-justify">
      {detail.about}
      </p>
      ))}
        </div>
        {/* Add your content here */}
        
      </div>
    </section>
  );
};

export default About;
