import { v4 as uuidv4 } from 'uuid';
import {
  FaDiagramProject,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaHouse,
  FaLinkedinIn,
  FaRenren,
  FaUser,
  
} from "react-icons/fa6";
import { Ai, Chatbot, Mern, Port, Res } from "../assets";
import {
  TbWorldWww
} from "react-icons/tb"



export const Socials = [

  {
    id: uuidv4(),
    Icon: FaFacebookF,
    uril: "https://www.facebook.com",
    color: "#1877F2",
  },
  {
    id: uuidv4(),
    Icon: FaLinkedinIn,
    uril: "https://linkedin.com/in/nabinhamal",
    color: "#0072b1",
  },
  {
    id: uuidv4(),
    Icon: FaGithub,
    uril: "https://github.com/nabinhamal",
    color: "#fff",
  },
  {
    id: uuidv4(),
    Icon: TbWorldWww,
    uril: "https://nabinhamalportfolio.netlify.app",
    color: "#ff0000",
  },
];

export const Menus = [
  {
    id: `home-${Date.now()}`,
    Icon: FaHouse,
    uri: "#home",
    name: "Home",
  },
  {
    id: `about-${Date.now()}`,
    Icon: FaUser,
    uri: "#about",
    name: "About",
  },
  {
    id: `skills-${Date.now()}`,
    Icon: FaRenren,
    uri: "#skills",
    name: "Skills",
  },
  {
    id: `projects-${Date.now()}`,
    Icon: FaDiagramProject,
    uri: "#projects",
    name: "Projects",
  },
  {
    id: `contact-${Date.now()}`,
    Icon: FaEnvelope,
    uri: "#contact",
    name: "Contact",
  },
];

export const ProjectsData = [
  {
    id: `food-${Date.now()}`,
    name: "Single Food Restaurant",
    imgSrc: Res,
    gitURL: "daurakokitchen.netlify.app",
  },
  {
    id: `codepen-${Date.now()}`,
    name: "Ai Summerizer",
    imgSrc: Ai,
    gitURL: "https://github.com/nabinhamal/Summarize",
  },
  {
    id: `openai-${Date.now()}`,
    name: "Portfolio Website",
    imgSrc: Port,
    gitURL: "https://nabinhamalportfolio.netlify.app",
  },
  {
    id: `chatapp-${Date.now()}`,
    name: "Chat Bot",
    imgSrc: Chatbot,
    gitURL: "https://github.com/nabinhamal/chatbot",
  },
  {
    id: `chatapp-${Date.now()}`,
    name: "Mern Portfolio",
    imgSrc: Mern,
    gitURL: "https://github.com/nabinhamal/portfolio2.0",
  }
];
