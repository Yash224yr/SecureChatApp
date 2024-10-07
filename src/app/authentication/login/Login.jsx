"use client";

import React from "react";
import "./index.css"; // You can keep the same styles if they fit
import { useRouter } from "nextjs-toploader/app";
import { Formik, Form, ErrorMessage } from "formik";
import CustomButton from "@/components/CustomButton/CustomButton";
import * as Yup from "yup";
import FormikTextInput from "@/components/CustomFormInput/FormikTextInput";
import RightSection from "../components/rightSection/RightSection";
import { ROUTESPATH } from "@/constant/ROUTES";
import { SweetAlertToast } from "@/utils/sweetAlert";
import FormSection from "../components/FormSection/FormSection";
import { LOGIN_API } from "@/api";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const handleLoginUser = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const response = await LOGIN_API(values);
      if (response && response.status) {
        SweetAlertToast.fire({
          icon: "success",
          title: response?.message,
        });
        router.push(ROUTESPATH.dashboard); // Redirect to the dashboard or another route on successful login
      } else {
        setErrors({ common: response?.message });
      }
    } catch (error) {
      console.error(error);
      setErrors({ common: "An error occurred. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const routeToRegister = () => {
    router.push(ROUTESPATH.register); // Navigate to the registration page
  };

  return (
    <div className="login-container">
      <FormSection title={"Log in"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLoginUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage
                name="common"
                component="div"
                className="error-message"
              />
              <FormikTextInput name="email" placeholder="Enter your e-mail" />
              <FormikTextInput
                name="password"
                placeholder="Password"
                type="password"
              />
              <CustomButton isSubmitting={isSubmitting} text="Log In" />
            </Form>
          )}
        </Formik>
      </FormSection>

      <RightSection
        title={"Secure Chat"}
        text={"Don't have an account?"}
        btnText="Sign Up"
        onClick={routeToRegister}
      />
    </div>
  );
};

export default Login;
