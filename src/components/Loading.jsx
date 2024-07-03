import React from 'react';
import '../styles/style.css';

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-card">
                <div className="spinner"></div>
                <p style={{ color: 'black' }}>Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
