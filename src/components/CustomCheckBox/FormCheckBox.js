import React from "react";
import "./FormCheckBox.css"

const FormCheckBox = () => {
  return (
    <div className="customCheckbox" id="">
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">I agree with Terms and Privacy</label>
    </div>
  );
};

export default FormCheckBox;
