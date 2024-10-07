"use client";

import { SECURE_CHAT_COOKIE } from "@/constant/ENV";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "nextjs-toploader/app";
import { AUTH_ROUTES, ROUTESPATH } from "@/constant/ROUTES";
import { usePathname } from "next/navigation";

const ProtectedPage = ({ children }) => {
  const [cookies] = useCookies([SECURE_CHAT_COOKIE]);
  const router = useRouter();
  const location = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const cookieToken = cookies[SECURE_CHAT_COOKIE];

    if (cookieToken) {
      if (location === ROUTESPATH.login || location === ROUTESPATH.register) {
        router.push(ROUTESPATH.home);
      }
    } else if (AUTH_ROUTES.includes(location)) {
      router.push(ROUTESPATH.login);
    }
    setIsReady(true);
    setLoader(false);
  }, [cookies, location, router]);

  if (loader || !isReady) {
    return <p>Loadingg .....</p>;
  }
  // Render children if no redirect is required
  return (isReady && children) || null;
};

export default ProtectedPage;
