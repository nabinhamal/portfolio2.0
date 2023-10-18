import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf1, Leaf2 } from "../assets";
import { Toaster, toast } from 'react-hot-toast'; // Import toast from react-hot-toast

import axios from "axios";
const Contact = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const SendMessage = async () => {
    if (!data.email || data.email.trim() === "") {
      toast.error('Email is required');
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/contact/create-contact`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
      });
      console.log(response);
      if (response.status === 201) {
        toast.success('Message sent successfully');
        setData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        toast.error('Failed to send message');
      }
      
      
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again later.');
    }
  };
  
  return (
    <section
      id="contact"
      className="flex items-center justify-center flex-col gap-12 my-12"
    >
      <AnimatePresence>
        {/* Removed alert component */}
      </AnimatePresence>

      {/* Title */}
      <div className="flex w-full items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 25 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-2"
        >
          <img src={Leaf1} className="w-6 h-auto object-contain" alt="" />
          <p
            className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase text-xl font-serif tracking-widest"
            style={{ whiteSpace: "nowrap" }}
          >
            Contact Me
          </p>
          <img src={Leaf2} className="w-6 h-auto object-contain" alt="" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <div className="w-full lg:w-[600px] px-2 flex flex-col items-center justify-start gap-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              name="firstName"
              value={data.firstName}
              onChange={handleTextChange}
              type="text"
              placeholder="First Name"
              className="text-textlight px-4 py-3 rounded-md border border-[rgba(18,18,18,0.3)] bg-transparent focus:bg-white outline-none"
            />
            <input
              name="lastName"
              value={data.lastName}
              onChange={handleTextChange}
              type="text"
              placeholder="Last Name"
              className="px-4 py-3 rounded-md border border-[rgba(18,18,18,0.3)] bg-transparent focus:bg-white outline-none"
            />
          </div>
          {/* Main content */}
          <input
            name="email"
            value={data.email}
            onChange={handleTextChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-[rgba(18,18,18,0.3)] bg-transparent focus:bg-white outline-none gap-4"
          />

          <textarea
            name="message"
            value={data.message}
            onChange={handleTextChange}
            cols="30"
            rows="10"
            placeholder="Message here"
            className="w-full px-4 py-3 rounded-md border border-[rgba(18,18,18,0.3)] bg-transparent focus:bg-white outline-none gap-4"
          ></textarea>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={SendMessage}
              className="px-12 py-3 bg-gradient-to-br from-bgPrimary to-secondary rounded-md w-full lg:w-auto hover:bg-gradient-to-br hover:from-white hover:to-white hover:border hover:border-primary hover:text-textlight"
            >
              send
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Contact;
