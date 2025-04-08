// src/App.js
import React, { useState } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { getWeatherData } from './services/weatherAPI'; // Make sure this exists
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  // Function to fetch weather data
  const fetchWeather = async (loc) => {
    try {
      setLoading(true);
      setError(null);
      
      // We'll implement this service later
      const data = await getWeatherData(loc);
      setWeatherData({
        current: data.current,
        location: data.location
      });
      setForecastData(data.forecast);
      setLocation(loc);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location if they allow it
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (err) => {
          setError('Location access denied. Please enter a location manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <LocationInput 
        onSearch={fetchWeather} 
        onCurrentLocation={getCurrentLocation}
      />
      
      {loading && <div className="loading">Loading...</div>}
      
      {error && <ErrorDisplay error={error} />}
      
      {weatherData && forecastData && (
      <WeatherDisplay 
      weather={weatherData.current} 
      forecast={forecastData}
      location={weatherData.location}
      />
    )}
    </div>
  );
}

export default App;
