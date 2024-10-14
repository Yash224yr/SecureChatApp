import React from 'react';
import './index.css';

const ShowOnlineStatus = ({ isConnected }) => {
    return (
        <div className="status-container">
            <div className={`status-dot ${isConnected ? 'online' : 'offline'}`}></div>
            <span className="status-text">{isConnected ? "Connected" : "Offline"}</span>
        </div>
    );
};

export default ShowOnlineStatus;
