// components/LocationInput.jsx
import React, { useState, useEffect } from 'react';

const LocationInput = ({ onSearch, onCurrentLocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState('');

  // Human touch: Manual input validation
  const validateInput = (value) => {
    const validCoordinate = /^[-]?\d{1,3}(\.\d+)?,\s*[-]?\d{1,3}(\.\d+)?$/.test(value);
    const validZip = /^\d{5}(-\d{4})?$/.test(value);
    
    if (!value.trim()) {
      setValidationError('');
    } else if (validCoordinate || validZip) {
      setValidationError('');
    } else if (value.length < 2) {
      setValidationError('Location too short');
    } else {
      setValidationError('Valid formats: City, ZIP, or Lat,Long');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !validationError) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="location-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            validateInput(e.target.value);
          }}
          placeholder="Enter city, zip code, or coordinates"
          aria-label="Location input"
          className={validationError ? 'error-border' : ''}
        />
        <button 
          type="submit" 
          disabled={!!validationError}
          title={validationError ? 'Fix input errors first' : ''}
        >
          Search
        </button>
        <button 
          type="button" 
          onClick={onCurrentLocation}
          className="current-location-btn"
        >
          Use Current Location
        </button>
      </form>
      {validationError && (
        <div className="validation-error">{validationError}</div>
      )}
      <div className="input-hint">
        Try: New York, 10001, 40.7128,-74.0060, or Eiffel Tower
      </div>
    </div>
  );
};
export default LocationInput;