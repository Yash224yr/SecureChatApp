"use client";

import React, { useState } from "react";
import "./Register.css";
import { REGISTER_API } from "@/api";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { IMAGES_PATH } from "@/constant/IMAGES_PATH";
import Image from "next/image";
import RightSection from "../components/rightSection/RightSection";
import FormTextInput from "@/components/CustomFormInput/FormTextInput";
import { ROUTESPATH } from "@/constant/ROUTES";
import { useRouter } from 'nextjs-toploader/app';
import FormCheckBox from "@/components/CustomCheckBox/FormCheckBox";


const Register = () => {
  const [loader, setLoader] = useState(false);

  const router = useRouter()

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

  const routeToLogin = ()=>{
    router.push(ROUTESPATH.login)
  }

  return (
    <div className="register-container">
      <div className="form-section">
        <h1>Sign up</h1>
        <p>Discover a better way of spending with Fianceo.</p>
        <button className="google-signin">Sign with Google</button>
        <div className="divider">Or</div>
        <form onSubmit={handleRegisterUser}>
          <FormTextInput name={"username"} placeholder="Type your name" />
          <FormTextInput name={"email"} placeholder="Enter your e-mail" />
          <FormTextInput name={"password"} placeholder="Password" />
          <FormCheckBox />
          <button type="submit" className="submit-btn">
            Sign up
          </button>
        </form>
        <p className="login-link">
          Not a member yet? <a href="/login">Create an account</a>
        </p>
      </div>

      <RightSection
        title={"Secure Chat"}
        text={"Already have and account"}
        btnText="Login"
        onClick={routeToLogin}
      />
    </div>
  );
};

export default Register;
