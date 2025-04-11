// src/App.js
import React, { useState, useEffect } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSkeleton from './components/LoadingSkeleton';
import cloudImage from './assets/cloud.jpg';
import { getWeatherData } from './services/weatherAPI';
import './App.css';
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  useEffect(() => {
    const savedLocation = localStorage.getItem('lastWeatherLocation');
    if (savedLocation) {
      fetchWeather(savedLocation);
    }
  }, []);

  const fetchWeather = async (loc) => {
    try {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecastData(null);
      const data = await getWeatherData(loc);
      setWeatherData({
        current: data.current,
        location: data.location
      });
      setForecastData(data.forecast);
      setLastSearched(loc);
      localStorage.setItem('lastWeatherLocation', loc);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

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

  const retryFetch = () => {
    if (lastSearched) {
      fetchWeather(lastSearched);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={cloudImage} alt="Weather Icon" className="header-icon" />
        <h1>Weather Forecast</h1>
        <p className="app-subtitle">Get real-time weather updates</p>
      </header>

      <LocationInput
        onSearch={fetchWeather}
        onCurrentLocation={getCurrentLocation}
      />

      {/* Show a welcome panel if there is no data, error, or loading in progress */}
      {!weatherData && !error && !loading && (
        <div className="welcome-panel">
          <h2>Welcome to my Weather App!</h2>
          <p>Type any location in the search box to get real-time weather updates.</p>
          <p>Or click "Use Current Location" to detect your local weather.</p>
        </div>
      )}

      {loading && <LoadingSkeleton />}
      {error && <ErrorDisplay error={error} onRetry={retryFetch} />}

      {weatherData && forecastData && (
        <WeatherDisplay
          weather={weatherData.current}
          forecast={forecastData}
          location={weatherData.location}
        />
      )}

      <footer className="app-footer">
        <div className="footer-left">
          <div className="developer-info">
            <p>Created by: <strong>Aryan Amit Tiwari</strong></p>
          </div>
          <div className="pm-accelerator-info">
            <p><strong>PM Accelerator Program:</strong> The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role.
            , our program has helped over hundreds of students fulfill their career aspirations.</p>
          </div>
        </div>
        <div className="last-updated">
          <p>Last Updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
