import React from 'react';
import './Road.css';

const Road = ({ isGamePaused, children }) => {
    return (
        <div className={`road-container ${isGamePaused ? 'paused' : ''}`}>
            <div className="road"></div>
            <div className="road"></div>
            {children} 
        </div>
    );
};

export default Road;
