"use client";

import React, { useState } from "react";
import "./Register.css";
import { REGISTER_API } from "@/api";
import { useRouter } from "nextjs-toploader/app";
import FormCheckBox from "@/components/CustomCheckBox/FormCheckBox";
import { Form, Formik } from "formik";
import CustomButton from "@/components/CustomButton/CustomButton";
import * as Yup from "yup";
import FormikTextInput from "@/components/CustomFormInput/FormikTextInput";
import RightSection from "../components/rightSection/RightSection";
import { ROUTESPATH } from "@/constant/ROUTES";
import { SweetAlertToast } from "@/utils/sweetAlert";
import FormSection from "../components/FormSection/FormSection";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const Register = () => {
  const router = useRouter();

  const handleRegisterUser = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await REGISTER_API(values);
      console.log(response, "response");
      if (response && response.status) {
        SweetAlertToast.fire({
          icon: "success",
          title: response?.message,
        });
        router.push(ROUTESPATH.login);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const routeToLogin = () => {
    router.push(ROUTESPATH.login);
  };

  return (
    <div className="register-container">
      <FormSection
        title={"Sign up"}
      
      >
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegisterUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextInput
                name="username"
                placeholder="Type your username"
              />
              <FormikTextInput name="email" placeholder="Enter your e-mail" />
              <FormikTextInput
                name="password"
                placeholder="Password"
                type="password"
              />
              <FormCheckBox name="terms" label="Accept Terms and Conditions" />
              <CustomButton loader={isSubmitting} text="Sign Up" />
            </Form>
          )}
        </Formik>
      </FormSection>

      <RightSection
        title={"Secure Chat"}
        text={"Already have an account?"}
        btnText="Login"
        onClick={routeToLogin}
      />
    </div>
  );
};

export default Register;
