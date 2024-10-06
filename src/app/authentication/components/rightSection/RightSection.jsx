import React from 'react'
import "./style.css"

const RightSection = ({title ,text , btnText , onClick}) => {
  return (
    <div className="image-section">
    <div className="image-content">
      <h2>{title}</h2>
      <div className="report-box">
        <p>{text}</p>
        <button onClick={onClick} >{btnText}</button>
      </div>
    </div>
  </div>
  )
}

export default RightSection