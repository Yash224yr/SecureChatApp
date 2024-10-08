"use client"

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function LandingPage() {
  const [socket, setSocket] = useState(null);
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [response, setResponse] = useState('');

  // Initialize Socket.IO connection when component mounts
  useEffect(() => {
    const socketInstance = io('http://localhost:3000'); // Replace with your actual server URL
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Handle the message sending
  const sendMessage = () => {
    if (!email || !messageContent) {
      alert('Email and message content are required');
      return;
    }
    console.log(email, messageContent)
    // Emit the sendMessage event with data via Socket.IO
    socket.emit('sendMessage', { email, messageContent });

    // Listen for success and error responses
    socket.on('message_success', (data) => {
      setResponse('Message sent successfully: ' + JSON.stringify(data));
    });

    socket.on('message_error', (error) => {
      setResponse('Error sending message: ' + JSON.stringify(error));
    });
  };


  socket?.on('receiveMessage', (data) => {
    console.log('New message received:', data, "receivedMessage");
  });
  console.log(response, "responsseeee")

  return (
    <div>
      <h1>Send a Message</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
      </div>
      <button onClick={sendMessage}>Send Message</button>
      <div>{response}</div>
    </div>
  );
}
