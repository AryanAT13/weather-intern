import React from 'react';

const ErrorDisplay = ({ error, onRetry }) => {
  // Define all possible error types and their user-friendly messages
  const ERROR_CONFIG = {
    // Location-related errors
    'location not found': {
      title: 'LOCATION NOT FOUND',
      message: 'We couldn\'t find that location.',
      tip: 'Try checking spelling or using coordinates (e.g., "40.7128,-74.0060")'
    },
    'please enter a location': {
      title: 'MISSING LOCATION',
      message: 'No location provided.',
      tip: 'Please enter a city, postal code, or coordinates'
    },
    
    // API-related errors
    'api quota reached': {
      title: 'SERVICE BUSY',
      message: 'Too many requests.',
      tip: 'Please wait an hour or try again later'
    },
    'service unavailable': {
      title: 'SERVICE UNAVAILABLE',
      message: 'Weather service is down.',
      tip: 'We\'re working on it - try again soon'
    },
    'invalid api key': {
      title: 'SERVICE ERROR',
      message: 'Configuration issue detected.',
      tip: 'Our team has been notified'
    },
    
    // Network errors
    'failed to fetch': {
      title: 'NETWORK ISSUE',
      message: 'Couldn\'t connect to weather service.',
      tip: 'Check your internet connection'
    },
    
    // Default fallback
    'default': {
      title: 'UNEXPECTED ERROR',
      message: 'Something went wrong.',
      tip: 'Please try again or contact support'
    }
  };

  const getErrorDisplay = () => {
    if (!error) return ERROR_CONFIG.default;
    
    const errorStr = error.toString().toLowerCase();
    
    // Check for specific error patterns
    for (const [key, config] of Object.entries(ERROR_CONFIG)) {
      if (errorStr.includes(key)) {
        return config;
      }
    }
    
    return ERROR_CONFIG.default;
  };

  const { title, message, tip } = getErrorDisplay();

  return (
    <div className="error-display">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <p className="error-tip">{tip}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="retry-button"
            aria-label="Retry loading weather data"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;