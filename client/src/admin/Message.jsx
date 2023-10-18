import React, { useState, useEffect } from 'react';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Assuming `fetchMessages` is a function that fetches messages from your API
    fetchMessages().then((data) => setMessages(data));
  }, []);

  // Assuming this function fetches messages from your API
  const fetchMessages = async () => {
    const response = await fetch('');
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h2>Messages</h2>
      {messages.map((message, index) => (
        <div key={index} className="card">
          <h3>{message.fname} {message.lname}</h3>
          <p>Email: {message.email}</p>
          <p>Message: {message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
