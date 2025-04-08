// components/ErrorDisplay.jsx
import React from 'react';

const ERROR_TIPS = {
    'q not found': 'Try checking spelling or use coordinates',
    'API key': 'Service temporarily unavailable',
    'limit exceeded': 'API quota reached - try again in an hour'
  };

const ErrorDisplay = ({ error }) => {
    const getActionableError = () => {
      const errors = {
        'q not found': 'location invalid',
        'API key': 'service unavailable',
        'limit exceeded': 'try again later'
      };
  
      const match = Object.entries(errors).find(([key]) => 
        error.toLowerCase().includes(key)
      );
  
      return match ? (
        <>
          <p>{match[1].toUpperCase()}!</p>
          <p>{ERROR_TIPS[match[0]]}</p>
        </>
      ) : (
        <p>Unexpected error occurred. Please try again.</p>
      );
    };
  
    return (
      <div className="error-display">
        <div className="error-icon">⚠️</div>
        <div className="error-content">
          {getActionableError()}
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      </div>
    );
  };
  export default ErrorDisplay;