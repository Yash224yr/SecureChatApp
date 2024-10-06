import React from "react";
import "./CustomButton.css";

const CustomButton = ({ isSubmitting, children }) => {
  return (
    <button type="submit" className="submit-btn" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : children}
    </button>
  );
};

export default CustomButton;
