"use client";

import React, { useState, useEffect, useRef } from "react";
import "./UserChats.css";
import { FaPaperclip, FaLock, FaUser, FaLockOpen } from "react-icons/fa";
import { io } from "socket.io-client";

const UserChats = () => {
    const [friends] = useState(["Alice", "Bob", "Charlie", "David"]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedFriend, setSelectedFriend] = useState(friends[0]);
    const [isPrivateChat, setIsPrivateChat] = useState(true);
    const endOfMessagesRef = useRef(null);
    const socket = useRef(null); // Use a ref to store the socket instance

    useEffect(() => {
        // Initialize socket connection
        socket.current = io('http://localhost:3000'); // Replace with your actual server URL

        // Listen for previous chats once on mount
        socket.current.emit("previousChats", {
            email: "yashTest@gmail.com",
            partnerId: "66ee3b6a-2b93-45f6-8fbd-cc1d5f9d3cee"
        });

        // Set up event listeners for socket events
        socket.current.on("previousChats", (data) => {
            setMessages(data.chats); // Assume data.chats is the correct format
        });

        socket.current.on('message_success', (data) => {
            console.log('Message sent successfully: ', data);
            setMessages((prevMessages) => [...prevMessages, data.newMessage]); // Update state with the new message
        });

        socket.current.on('message_error', (error) => {
            console.error('Error sending message: ', error);
        });

        return () => {
            socket.current.disconnect(); // Clean up on unmount
            socket.current.off("previousChats"); // Clean up socket listeners
        };
    }, []); // Only run on mount

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Scroll to the bottom when messages change

    const handleSendMessage = (e) => {
        e.preventDefault();

        const email = "yashTest@gmail.com"; // Replace with actual email logic
        if (!email || !input.trim()) {
            alert('Email and message content are required');
            return;
        }

        // Emit the sendMessage event with data via Socket.IO
        socket.current.emit('sendMessage', { email, messageContent: input.trim() });
        setInput(""); // Clear input after sending
    };

    // Function to toggle private chat mode
    const togglePrivateChat = () => {
        setIsPrivateChat((prev) => !prev);
    };

    return (
        <div className="user-chats">
            <div className="sidebar">
                <h2>Friends</h2>
                <ul className="friend-list">
                    {friends.map((friend) => (
                        <li
                            key={friend}
                            onClick={() => setSelectedFriend(friend)}
                            className={friend === selectedFriend ? "active" : ""}
                        >
                            {friend}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-section">
                <div className="chat-header">
                    <h2>{selectedFriend}</h2>
                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.from === "me" ? "sent" : "received"} ${isPrivateChat && index < messages.length - 1 ? "blurred" : ""}`}
                        >
                            <div className="message-text">{message.text}</div>
                            <div className="message-time">{message.time}</div>
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
                    <button type="submit" className="send-button">Send</button>
                </form>
                <div className="feature-buttons">
                    <button className="feature-btn"><FaPaperclip /></button>
                    <button className={`feature-btn ${isPrivateChat ? "active" : ""}`} onClick={togglePrivateChat}>
                        {isPrivateChat ? <FaLock /> : <FaLockOpen />}
                    </button>
                    <button className="feature-btn"><FaUser /></button>
                </div>
            </div>
        </div>
    );
};

export default UserChats;
