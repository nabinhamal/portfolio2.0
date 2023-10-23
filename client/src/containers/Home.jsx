import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroTypeWritter, HomeSocialLinks } from "../components";
import { Socials } from "../utils/helper";
import Login from "./Login";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Home = () => {
  const [aboutHome, setAboutHome] = useState([]);
  const [uname, setUname] = useState([]);
  const [expri, setExpri] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  const getHomeData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/detail/get-detail`);
      if (data?.success) {
        setAboutHome(data?.details);
        setUname(data?.details);
        setExpri(data?.details);
        setDownloadUrl(data?.details);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting category");
    }
  }

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center gap-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">

        {/** content section */}
        <div className="w-full h-full flex flex-col items-center lg:items-start justify-center gap-4">
          <h2 className="text-3xl lg:text-4xl text-textlight">
            Hello, It's me
            {uname?.map((detail, index) => (
              <span key={index} className="block tracking-wider text-4xl lg:text-6xl mt-4 text-red-400">{" "}{detail.username}</span>
            ))}
          </h2>

          {/** typewriter section */}
          <h2 className="text-2xl lg:4xl text-textlight">And I'm {" "}
            { expri?.map((detail, index) => (
              <HeroTypeWritter 
                speed={100}
                key={index}
                words={detail?.exp}
              />
            ))}
          </h2>

          {aboutHome?.map((detail, index) => (
            <p key={index} className="text-base text-textlight mt-6 text-center lg:text-left ">{detail.abouthome}</p>
          ))}

          {/** social media links */}
          <div className="flex items-center justify-center gap-16 mt-16">
            <AnimatePresence>
              {Socials && 
                Socials.map((item) => (
                  <HomeSocialLinks key={item.id} data={item}  />
                ))}
            </AnimatePresence>
          </div>

          {/** download cv */}
          <a href={`${process.env.REACT_APP_API}/detail/get-photo-detail/cv`}
            style={{boxShadow : "inset 0px 0px 10px rgba(255,255,255,0.3)"}}
            className="mt-12 border bg-black border-[rgba(214,68,68,0.3)] rounded-xl px-8 py-3 active:95 group hover:border-ps" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <p className="text-texlight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ps group-hover:to-pp">Download CV</p>
          </a>

        </div>

        {/** hero section */}
        <div className="w-full h-full flex items-start justify-center lg:item-center">
          <motion.img 
            initial={{y:0}}
            animate={{y: [-10, 10, -10] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            src={`${process.env.REACT_APP_API}/detail/get-photo-detail/profilehome`} style={{ width: '500px', height: '500px' }}
          />
        </div>

        <div className="fixed top-0 right-0 m-4">
          <Login/>
        </div>
      </div>
    </section>
  );
};

export default Home;
