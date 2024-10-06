"use client";

import React, { useState } from "react";
import "./Register.css";
import { REGISTER_API } from "@/api";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { IMAGES_PATH } from "@/constant/IMAGES_PATH";
import Image from "next/image";

const Register = () => {
  const [loader, setLoader] = useState(false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await REGISTER_API();
      // Handle the response as needed
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <h1>Sign up</h1>
        <p>Discover a better way of spending with Fianceo.</p>
        <button className="google-signin">Sign with Google</button>
        <div className="divider">Or</div>
        <form onSubmit={handleRegisterUser}>
          <input type="text" placeholder="Type your name" />
          <input type="email" placeholder="Enter your e-mail" />
          <input type="password" placeholder="Password" />
          <div className="checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree with Terms and Privacy</label>
          </div>
          <button type="submit" className="submit-btn">
            Sign up
          </button>
        </form>
        <p className="login-link">
          Not a member yet? <a href="/login">Create an account</a>
        </p>
      </div>

      <div className="image-section">
        <div className="image-content">
          <h2>Secure Chat</h2>
          <div className="report-box">
            <p>Already have an account</p>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
