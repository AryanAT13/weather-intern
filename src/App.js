import React, { useState, useEffect } from 'react';
import LocationInput from './components/LocationInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getWeatherData } from './services/weatherAPI';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  // Load last searched location from localStorage on first render
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
      
      // Save searched location locally
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

  // Retry last search when needed
  const retryFetch = () => {
    if (lastSearched) {
      fetchWeather(lastSearched);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Forecast</h1>
        <p className="app-subtitle">Get real-time weather updates</p>
      </header>

      <LocationInput 
        onSearch={fetchWeather} 
        onCurrentLocation={getCurrentLocation}
      />
      
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
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
}

export default App;
