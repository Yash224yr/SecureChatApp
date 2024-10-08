"use client";

import { SECURE_CHAT_COOKIE } from "@/constant/ENV";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "nextjs-toploader/app";
import { AUTH_ROUTES, ROUTESPATH } from "@/constant/ROUTES";
import { usePathname } from "next/navigation";
import { socket } from "@/utils/SocketIO/socketIo";

const ProtectedPage = ({ children }) => {
  const [cookies] = useCookies([SECURE_CHAT_COOKIE]);
  const router = useRouter();
  const location = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");


  useEffect(() => {
    const cookieToken = cookies[SECURE_CHAT_COOKIE];
    if (cookieToken) {
      if (location === ROUTESPATH.login || location === ROUTESPATH.register) {
        router.push(ROUTESPATH.home);
      }
    } else if (AUTH_ROUTES.includes(location)) {
      router.push(ROUTESPATH.login);
    }
    setTimeout(() => {
      setIsReady(true);
      setLoader(false);
    }, 300);
  }, [cookies, location, router]);



  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Connected...............")
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (loader || !isReady) {
    return <p>Loadingg .....</p>;
  }
  // Render children if no redirect is required
  return  (
    <div>
    <p>Status: {isConnected ? "connected" : "disconnected"}</p>
    <p>Transport: {transport}</p>
    {isReady && children || null}
  </div>
    
  )
};

export default ProtectedPage;
