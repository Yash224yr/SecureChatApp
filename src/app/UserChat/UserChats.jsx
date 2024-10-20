"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import "./UserChats.css";
import {
  FaPaperclip,
  FaLock,
  FaUser,
  FaLockOpen,
  FaArrowLeft,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { io } from "socket.io-client";
import { ROUTESPATH } from "@/constant/ROUTES";
import { useRouter } from "nextjs-toploader/app";
import ChatBox from "./components/ChatBox/ChatBox";
import { SocketContext } from "../SocketContext";

const UserChats = () => {
  const { isConnected, socket } = useContext(SocketContext);
  const { profileData } = useContext(SocketContext);
  const [connectedUser, setConnectedUsers] = useState([]);
  console.log(profileData, "profileDataprofileData");
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isPrivateChat, setIsPrivateChat] = useState(true);
  const [newMessageNotification, setNewMessageNotification] = useState([]);

  const router = useRouter();

  const handleGoBack = () => {
    router.push(ROUTESPATH.home);
  };

  useEffect(() => {
    socket.emit("onlineUser", profileData?.id);
    socket.on("updateOnlineUsers", (users) => {
      console.log(users, "users");
      setConnectedUsers(users);
    });
    return () => {
      socket.off("updateOnlineUsers");
    };
  }, [socket, profileData]);

  console.log(newMessageNotification, "newMessageNotification");

  useEffect(() => {
    if (!selectedFriend && friends.length > 0) {
      setSelectedFriend(friends[0]);
    }
  }, [friends]);

  useEffect(() => {
    if (!profileData?.id) return;
    socket?.emit("getAcceptedFriendList", profileData?.id);
    socket?.on("acceptedFriendList", (friends) => {
      console.log(friends, "friendsssss");
      setFriends(friends); // Update the state with the accepted friends
    });
    socket?.on("friendListError", (errorMessage) => {
      console.error(errorMessage);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, profileData]);

  console.log(newMessageNotification, friends, "djshsdf");

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
            friends?.map((item, index) => (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedFriend(item);
                }}
                className={item.email === selectedFriend?.email ? "active" : ""}
              >
                <span className="friend-email">{item.email}</span>
                {newMessageNotification?.includes(item.id) && (
                  <span className="new-message">
                    <FaEnvelopeOpenText className="message-icon" />
                    <span className="message-text">New Message</span>
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
      {/* <button onClick={handleSendRequest} >Send FriendRequest</button> */}
      <ChatBox
        selectedFriend={selectedFriend}
        profileData={profileData}
        connectedUser={connectedUser}
        setNewMessageNotification={setNewMessageNotification}
        newMessageNotification={newMessageNotification}
      />
    </div>
  );
};

export default UserChats;
