"use client";

import React, { useState, useEffect, useRef } from "react";
import "./UserChats.css";
import {
  FaPaperclip,
  FaLock,
  FaUser,
  FaLockOpen,
  FaArrowLeft,
} from "react-icons/fa";
import { io } from "socket.io-client";
import { ROUTESPATH } from "@/constant/ROUTES";
import { useRouter } from "nextjs-toploader/app";
import ChatBox from "./components/ChatBox/ChatBox";

const UserChats = () => {
  const [friends] = useState([
    {
      name: "Yash",
      partnerId: "c45675aa-6840-4e5e-ac80-d1f5b83278d5",
      myId: "d8836266-f0e8-43da-852a-69a8727d16a0",
      email: "yash224.yr@gmail.com",
    },
    {
      name: "Test",
      myId: "c45675aa-6840-4e5e-ac80-d1f5b83278d5",
      partnerId: "d8836266-f0e8-43da-852a-69a8727d16a0",
      email: "yashTest@gmail.com",
    },
  ]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [isPrivateChat, setIsPrivateChat] = useState(true);

  const router = useRouter();
  const handleGoBack = () => {
    router.push(ROUTESPATH.home);
  };

  return (
    <div className="user-chats">
      <div className="sidebar">
        <button className="go-back-btn" onClick={handleGoBack}>
          <FaArrowLeft className="icon" />
          Go Back
        </button>
        <h2>Friends</h2>
        <ul className="friend-list">
          {friends &&
            Array.isArray(friends) &&
            friends.map((item, index) => (
              <li
                key={item.partnerId}
                onClick={() => {
                  setSelectedFriend(item);
                }}
                className={item.name === selectedFriend.name ? "active" : ""}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
      <ChatBox selectedFriend={selectedFriend} />
    </div>
  );
};

export default UserChats;
