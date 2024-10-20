import React from "react";
import "./index.css";
import Link from "next/link";

const CustomTag = ({ title, onClick }) => {
  return (
    <p className="custom-link" onClick={onClick}>
      {title === "Sign Up"
        ? "Not registered? Sign Up"
        : "Already registered? Sign In"}
    </p>
  );
};

export default CustomTag;
