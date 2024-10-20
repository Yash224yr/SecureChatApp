"use client"

import React from 'react';
import './landingPage.css';
import { useRouter } from "nextjs-toploader/app";
import Link from 'next/link';
import { IoMdLogOut } from "react-icons/io";
import { useCookies } from 'react-cookie';
import { SECURE_CHAT_COOKIE } from '@/constant/ENV';
import { ROUTESPATH } from '@/constant/ROUTES';
import GlobalSearchFriends from '@/components/globalSearchFriends';

const LandingPage = () => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([SECURE_CHAT_COOKIE]);

  const handleLogOut = () => {
    removeCookie(SECURE_CHAT_COOKIE)
    router.push(ROUTESPATH.login)
  }

  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="logo">ChatApp</h1>
        <nav className="nav">
          <ul>
          <GlobalSearchFriends />
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            <li>
              <Link href="#logout" className="logout-button" onClick={handleLogOut}>
                <IoMdLogOut style={{ marginRight: '8px' }} />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay">
            <div className="hero-text">
              <h2>Chat Anytime, Anywhere</h2>
              <p>Stay connected with friends and family effortlessly.</p>
              <button className="cta-button" onClick={() => router.push("/UserChat")} >Get Started</button>
            </div>
            <div className="hero-image">
              <img src="https://via.placeholder.com/600x400.png?text=Chat+App" alt="Chat App" />
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <h2>Features</h2>
          <div className="feature-container">
            <div className="feature-item">
              <img src="https://via.placeholder.com/100/007bff/ffffff?text=Msg" alt="Real-time messaging" />
              <h3>Real-time Messaging</h3>
              <p>Instant communication with no delays.</p>
            </div>
            <div className="feature-item">
              <img src="https://via.placeholder.com/100/007bff/ffffff?text=Group" alt="Group Chats" />
              <h3>Group Chats</h3>
              <p>Connect with multiple friends in one place.</p>
            </div>
            <div className="feature-item">
              <img src="https://via.placeholder.com/100/007bff/ffffff?text=Emoji" alt="Fun Emojis" />
              <h3>Fun Emojis</h3>
              <p>Express yourself with a variety of emojis.</p>
            </div>
            <div className="feature-item">
              <img src="https://via.placeholder.com/100/007bff/ffffff?text=Secure" alt="Secure" />
              <h3>Secure & Private</h3>
              <p>Your privacy is our priority.</p>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <h2>About Us</h2>
          <p>We are dedicated to providing a seamless chatting experience. Join us and make every conversation count!</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        <div className="social-media">
          <a href="#" className="social-icon">FB</a>
          <a href="#" className="social-icon">TW</a>
          <a href="#" className="social-icon">IG</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
