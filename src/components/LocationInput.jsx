import React, { useState } from 'react';

const LocationInput = ({ onSearch, onCurrentLocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateInput = (value) => {
    setValidationError(value.trim().length < 2 ? 'Minimum 2 characters' : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !validationError) {
      onSearch(inputValue.trim());
    } else {
      setValidationError('Please enter a valid location');
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
          disabled={!!validationError || !inputValue.trim()}
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
        Try: City: Miami, Pincode: 90210, Latitude: 28.4595, 77.0266.
      </div>
    </div>
  );
};

export default LocationInput;
