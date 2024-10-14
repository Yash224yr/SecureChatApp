"use client"

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function LandingPage() {
  const [socket, setSocket] = useState(null);
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [response, setResponse] = useState('');

  

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
