"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
<<<<<<< HEAD
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    // Initialize socket connection
    socket.current = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
=======
  const [profileData , setProfileData] = useState(null)
  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:3000", {
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b
      transports: ["websocket", "polling"], // Use WebSocket with fallback to polling
    });

    // Handle successful connection
    socket.current.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    // Handle disconnection
    socket.current.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    // Clean up socket connection on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
<<<<<<< HEAD
    <SocketContext.Provider
      value={{
        socket: socket.current,
        isConnected,
        profileData,
        setProfileData,
      }}
    >
=======
    <SocketContext.Provider value={{ socket: socket.current, isConnected  , profileData , setProfileData}}>
>>>>>>> 6cbbdffb4c1e0c6a46197d970f480d60483ebd8b
      {children}
    </SocketContext.Provider>
  );
};
