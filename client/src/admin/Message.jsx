import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf1, Leaf2, about } from "../assets";
const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/contact/contacts`);
      setMessages(response.data.contacts); // Assuming the data is inside the `contacts` key
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Deleting message with ID: ${id}`);
    try {
      await axios.delete(`${process.env.REACT_APP_API}/contact/contacts/${id}`);
      setMessages(messages.filter(message => message._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };
  
  return (
    <section className="flex items-center justify-center flex-col gap-12 my-12">
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
          {/* Adjust your title content here */}
          <img src={Leaf1} className="w-6 h-auto object-contain" alt="" />
          <p className="text-textlight bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>Messages</p>
          <img src={Leaf2} className="w-6 h-auto object-contain" alt="" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      <AnimatePresence>
          {Array.isArray(messages) && messages.map((message, index) => (
            <MessageCard key={index} message={message} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const MessageCard = ({ message, onDelete }) => {
  return (
    <motion.div className="overflow-hidden cursor-pointer relative rounded-md p-4 bg-white border border-gray-300">
      <div className="card-content">
        <h3 className="text-xl font-bold mb-2">{message.firstName} {message.lastName}</h3>
        <p className="text-gray-700 mb-2">Email: {message.email}</p>
        <p className="text-gray-700 mb-4">Message: {message.message}</p>
        <button onClick={() => onDelete(message._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </motion.div>
  );
};


export default MessageList;
