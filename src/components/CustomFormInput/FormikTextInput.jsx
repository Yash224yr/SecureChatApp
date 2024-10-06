import React from "react";
import { Field, ErrorMessage } from "formik";
import "./FormikTextInput.css";

const FormikTextInput = ({ name, placeholder }) => {
  return (
    <>
      <ErrorMessage name={name} component="span" className="error" />
      <Field
        className="customFormInput"
        name={name}
        placeholder={placeholder}
        type="text"
      />
    </>
  );
};

export default FormikTextInput;
