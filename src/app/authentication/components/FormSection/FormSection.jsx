import React from "react";
import "./index.css";

const FormSection = ({children , title}) => {
  return (
    <div className="form-section">
      <h1>{title}</h1>
      <button className="google-signin">Sign with Google</button>
      <div className="divider">Or</div>


    {children}

      
    </div>
  );
};

export default FormSection;
