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
<<<<<<< HEAD
  const { isConnected, socket } = useContext(SocketContext);
  const { profileData } = useContext(SocketContext);
  const [connectedUser, setConnectedUsers] = useState([]);
  console.log(profileData, "profileDataprofileData");
=======

  const { isConnected, socket } = useContext(SocketContext);
  const { profileData } = useContext(SocketContext)
  const [connectedUser, setConnectedUsers] = useState([])
  console.log(profileData, "profileDataprofileData")
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isPrivateChat, setIsPrivateChat] = useState(true);
<<<<<<< HEAD
  const [newMessageNotification, setNewMessageNotification] = useState([]);
=======
  const [newMessageNotification, setNewMessageNotification] = useState([])
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b

  const router = useRouter();

  const handleGoBack = () => {
    router.push(ROUTESPATH.home);
  };

<<<<<<< HEAD
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
=======


  useEffect(() => {
    socket.emit('onlineUser', profileData?.id);
    socket.on('updateOnlineUsers', (users) => {
      console.log(users, "users")
      setConnectedUsers(users);
    });
    return () => {
      socket.off('updateOnlineUsers');
    };
  }, [socket, profileData]);

  console.log(newMessageNotification, "newMessageNotification")

  useEffect(() => {
    if (!selectedFriend && friends.length > 0) {
      setSelectedFriend(friends[0])
    }
  }, [friends])

  useEffect(() => {
    socket?.emit("getAcceptedFriendList", profileData?.id);
    socket?.on("acceptedFriendList", (friends) => {
      console.log(friends, "friendsssss")
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b
      setFriends(friends); // Update the state with the accepted friends
    });
    socket?.on("friendListError", (errorMessage) => {
      console.error(errorMessage);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, profileData]);

<<<<<<< HEAD
  console.log(newMessageNotification, friends, "djshsdf");
=======
  const handleSendRequest = () => {
    // if (selectedFriend.partnerId) {
      socket.emit("sendFriendRequest", { userId:"2a6bf2be-da08-4c07-99ee-9976ad50bfcd", friendId: "4906dbbe-b19d-4ef6-95cd-7894212025db"});
    // } else {
      // alert("Please enter a friend ID.");
    // }
  };

  console.log(newMessageNotification, friends, "djshsdf")
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b

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
<<<<<<< HEAD
      {/* <button onClick={handleSendRequest} >Send FriendRequest</button> */}
      <ChatBox
        selectedFriend={selectedFriend}
        profileData={profileData}
        connectedUser={connectedUser}
        setNewMessageNotification={setNewMessageNotification}
        newMessageNotification={newMessageNotification}
      />
=======
      <button onClick={handleSendRequest} >Send FriendRequest</button>
      <ChatBox selectedFriend={selectedFriend} profileData={profileData} connectedUser={connectedUser} setNewMessageNotification={setNewMessageNotification} newMessageNotification={newMessageNotification} />
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b
    </div>
  );
};

export default UserChats;
