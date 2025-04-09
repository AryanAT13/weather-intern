import React, { useState } from 'react';

const LocationInput = ({ onSearch, onCurrentLocation }) => {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateInput = (value) => {
    // Allow city names, ZIP, or coordinates as long as the length is >= 2
    if (!value.trim()) {
      setValidationError('');
    } else if (value.trim().length < 2) {
      setValidationError('Location too short');
    } else {
      // Optionally, add more specific checks for coordinate or ZIP,
      // but for now, allow any input of at least 2 characters.
      setValidationError('');
    }
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
        Try: New York, 10001, 40.7128,-74.0060, or Eiffel Tower
      </div>
    </div>
  );
};

export default LocationInput;
