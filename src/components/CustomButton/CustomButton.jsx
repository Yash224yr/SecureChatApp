import React from "react";
import "./CustomButton.css";

const CustomButton = ({ loader, text }) => {
  return (
    <button
      type="submit"
      className={`submit-btn ${loader ? "loading" : ""}`}
      disabled={loader}
    >
      {!loader ? text : <span className="loader"></span>}
    </button>
  );
};

export default CustomButton;
