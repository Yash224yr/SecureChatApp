import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          FB
        </a>
        <a href="#" className="social-icon">
          TW
        </a>
        <a href="#" className="social-icon">
          IG
        </a>
      </div>
    </footer>
  );
};

export default Footer;
