"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons for the menu button
import "./index.css";
import GlobalSearchFriends from "../globalSearchFriends";
import { useCookies } from "react-cookie";
import { SECURE_CHAT_COOKIE } from "@/constant/ENV";
import { useRouter } from "nextjs-toploader/app";
import { ROUTESPATH } from "@/constant/ROUTES";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies([SECURE_CHAT_COOKIE]);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility

  const handleLogOut = () => {
    removeCookie(SECURE_CHAT_COOKIE);
    router.push(ROUTESPATH.login);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const authCookieCheck = cookies[SECURE_CHAT_COOKIE];

  console.log(authCookieCheck , "authCookieCheckauthCookieCheck")

  return (
    <header className="header">
      <h1 className="logo">ChatApp</h1>
      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        <ul>
          <GlobalSearchFriends />
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
          {authCookieCheck ? (
            <li>
              <Link
                href="#logout"
                className="logout-button"
                onClick={()=> router.push(ROUTESPATH.login)}
              >
                <IoMdLogOut style={{ marginRight: "8px" }} />
                Logout

              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="#logout"
                className="logout-button"
                onClick={handleLogOut}
              >
                <IoMdLogIn style={{ marginRight: "8px" }} />
                LogIn
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* Menu button for mobile */}
      <button className="menu-button" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Header;
