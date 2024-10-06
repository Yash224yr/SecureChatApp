import React from "react";
import "./FormInput.css"

const FormTextInput = ({ onChange, value, name, placeholder }) => {
  return (
    <input
    className="customFormInput"
      type="text"
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default FormTextInput;
