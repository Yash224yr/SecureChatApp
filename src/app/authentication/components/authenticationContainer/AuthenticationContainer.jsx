import React from 'react'
import "./AuthenticationContainer.css"

const AuthenticationContainer = ({ children }) => {
    return (
        <div className="authentication_container">{children}</div>
    )
}

export default AuthenticationContainer