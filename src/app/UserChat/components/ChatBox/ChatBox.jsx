import { SocketContext } from "@/app/SocketContext";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FaPaperclip, FaLock, FaLockOpen, FaUser } from "react-icons/fa";
import { io } from "socket.io-client";

const ChatBox = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const endOfMessagesRef = useRef(null);

  const { isConnected, socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("messageSentSuccess", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageSentSuccess");
    };
  }, [socket]);

  const handleNewMessage = (data) => {
    const { senderId, recipientId } = data;
    const { myId, partnerId } = selectedFriend;

    if (recipientId === myId) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  };

  useEffect(() => {
    const fetchPreviousChats = () => {
      socket?.emit("fetchOldMessages", {
        recipientId: selectedFriend.partnerId,
        senderId: selectedFriend.myId,
      });
    };

    const handlePreviousChats = (data) => {
      setMessages(data || []);
    };

    fetchPreviousChats();
    socket?.on("oldMessages", handlePreviousChats);

    return () => {
      socket?.off("oldMessages", handlePreviousChats);
    };
  }, [selectedFriend, socket]);

  useEffect(() => {
    socket?.on("receiveMessage", handleNewMessage);

    return () => {
      socket?.off("receiveMessage", handleNewMessage);
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (input.trim()) {
      const newMessage = {
        senderId: selectedFriend.myId,
        recipientId: selectedFriend.partnerId,
        message: input,
        timestamp: new Date().toISOString(), // Add timestamp
      };
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  useEffect(() => {
    console.log(messages, "messagesmessages");
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const togglePrivateChat = () => {
    setIsPrivateChat(!isPrivateChat);
  };

  return (
    <div className="chat-section">
      <div className="chat-header">
        <h2>{selectedFriend?.name}</h2>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.status === "Sent" ? "sent" : "received"
            } ${isPrivateChat && index < messages.length - 1 ? "blurred" : ""}`}
          >
            <div className="message-text">{message.message}</div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="input-field"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <div className="feature-buttons">
        <button className="feature-btn">
          <FaPaperclip />
        </button>
        <button
          className={`feature-btn ${isPrivateChat ? "active" : ""}`}
          onClick={togglePrivateChat}
        >
          {isPrivateChat ? <FaLock /> : <FaLockOpen />}
        </button>
        <button className="feature-btn">
          <FaUser />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
