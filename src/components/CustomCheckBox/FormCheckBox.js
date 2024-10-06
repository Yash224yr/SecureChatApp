import React from "react";
import { Field, ErrorMessage } from "formik";
import "./FormCheckBox.css";

const FormCheckBox = ({ name, label }) => {
  return (
    <div className="customCheckbox">
      {/* Using Field to bind with Formik */}
      <Field type="checkbox" id={name} name={name} />
      <label htmlFor={name}>{label}</label>
      {/* Error message for validation */}
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormCheckBox;
