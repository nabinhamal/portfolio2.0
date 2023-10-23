import React, { useEffect ,useState} from 'react'
import { About, Contact, Header, Home, Login, ParticlesContainer, Projects, Skills } from '../containers'
import { AnimatePresence } from 'framer-motion'
import { HomeSocialLinks } from '../components'
import { Socials } from '../utils/helper'
import{MdEmail ,MdPhone} from "react-icons/md"
import axios from "axios"
import { toast } from 'react-hot-toast';


const App = () => {
  const[Email,setEmail] = useState([])

 const getData = async()=>{
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/user`);
    if (data?.success) {
      if (Array.isArray(data.user)) {
        const emails = data.user.map(user => user.email);
        setEmail(emails);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong ");
  }
};
    
    useEffect(() => {
    getData();
    },[]);

  return (
    <div className='w-full xl:w-[1600px] py-32 px-4 lg:px-12 pr-4 lg:pr-32'>
        {/** particles container */}
        <ParticlesContainer/>
 {/** login */}
 <Login/>
      {/** Header */}
      <Header/>
      {/** Home */}
      <Home/>

      {/** About */}
<About/>
{/** Skills */}
<Skills/>
      {/** projects */}
      <Projects/>

<Contact/>

{/**footer */}
<div className="w-full flex flex-col items-center justify-start mt-32 mb-8">
  <p className='text-3xl tracking-wide text-textlight'></p>
<div className='flex items-center justify-center gap-16 mt-16'>

<AnimatePresence>
    {Socials && 
    Socials.map((item, index) => (
      <HomeSocialLinks key={index} data={item} index={index} />
    ))}
  </AnimatePresence>
</div>
<div className='w-full flex items-center justify-center gap-3 mt-32'>
  <div className="flex items-center gap-4">
    <MdEmail className="text-black text-2xl" />
    

    {Email?.map((em,index) => (
    <p key={index} className="text-textlight text-center">{em.emails}</p>
  ))}
  </div>

  <div className="flex items-center gap-4">
    <MdPhone className="text-black text-2xl" />
    <p className="text-textlight text-center">000000 0 000</p>
  </div>
</div>

</div>
    </div>
  )
}

export default App