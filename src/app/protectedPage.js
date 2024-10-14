"use client";

import { SECURE_CHAT_COOKIE } from "@/constant/ENV";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "nextjs-toploader/app";
import { AUTH_ROUTES, ROUTESPATH } from "@/constant/ROUTES";
import { usePathname } from "next/navigation";
import ShowOnlineStatus from "@/components/showOnlineStatus";
import { SocketContext } from "./SocketContext";

const ProtectedPage = ({ children }) => {
  const [cookies] = useCookies([SECURE_CHAT_COOKIE]);
  const router = useRouter();
  const location = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [loader, setLoader] = useState(true);

  const {isConnected } = useContext(SocketContext)





  useEffect(() => {
    const checkForSession = async () => {
      const cookieToken = cookies[SECURE_CHAT_COOKIE];
      console.log(cookieToken ,  location.startsWith("/authentication"))
      if (cookieToken && location.startsWith("/authentication")) {
        return router.push(ROUTESPATH.home);
      }
      else if (!cookieToken && AUTH_ROUTES.includes(location)) {
        return router.push(ROUTESPATH.login);
      }
      setTimeout(() => {
        setIsReady(true);
        setLoader(false);
      }, 300);
    }

    checkForSession()

  }, [cookies, location, router]);





  if (loader || !isReady) {
    return <p>Loadingg .....</p>;
  }
  // Render children if no redirect is required
  return (
    <>
    <ShowOnlineStatus isConnected={isConnected} />
    {isReady && children || null}
    </>
  )
};

export default ProtectedPage;
