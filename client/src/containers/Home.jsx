import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "../assets";
import { HeroTypeWritter, HomeSocialLinks } from "../components";
import { Socials } from "../utils/helper";
import Login from "./Login";


const Home = () => {
 

  return (
    <section id="home" className="relative flex items-center justify-center gap-12">
    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">

 
{/** content section */}
<div className="w-full h-full flex flex-col items-center lg:items-start justify-center gap-4">
<h2 className="text-3xl lg:text-4xl text-textlight">
  Hello, It's me
  <span className="block tracking-wider text-4xl lg:text-6xl mt-4 text-red-400">{" "}Nabin Hamal</span>
</h2>

{/** typewriter section */}
<h2 className="text-2xl lg:4xl text-textlight">And I'm {" "}
<HeroTypeWritter 
speed={100}
words={["an Computer Engineer..", "a Developer..","a Learner"]}/>

</h2>
<p className="text-base text-textlight mt-6 text-center lg:text-left ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus fuga voluptates aperiam alias reprehenderit, deleniti eos possimus provident? Necessitatibus nesciunt doloremque odio a saepe dignissimos, odit officia facilis sunt dicta.</p>

{/* social media links */}
<div className="flex items-center justify-center gap-16 mt-16">
  <AnimatePresence>
    {Socials && 
    Socials.map((item, index) => (
      <HomeSocialLinks key={index} data={item} index={index} />
    ))}
  </AnimatePresence>
</div>

{/** download cv */}
<a href="#"
style={{boxShadow : "inset 0px 0px 10px rgba(255,255,255,0.3)"}}
className="mt-12 border bg-black border-[rgba(214,68,68,0.3)]  rounded-xl px-8 py-3 active:95 group hover:border-ps">
<p className="text-texlight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ps group-hover:to-pp">Download CV</p>
</a>
</div>





{/** hero section */}
<div className="w-full h-full flex items-start justify-center lg:item-center">
  <motion.img 
  initial={{y:0}}
  animate={{y: [-10, 10, -10] }}
transtition={{
  repeat: Infinity,
  duration: 2,
   ease: "linear",
}}
  src={Hero} className="w-auto h-auto object-contain"
  />
  </div>

  <div className="fixed top-0 right-0 m-4">
   <Login/>
      </div>
</div >
  </section>
)};

export default Home;
