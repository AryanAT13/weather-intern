// src/services/weatherAPI.js
const API_KEY = 'YOUR_API_KEY'; // In real app, use environment variables
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location) => {
  try {
    // First validate the location input
    if (!location || typeof location !== 'string') {
      throw new Error('Please enter a valid location');
    }

    // Fetch current weather and forecast in one call
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }

    const data = await response.json();
    
    // Validate API response structure
    if (!data.current || !data.forecast || !data.location) {
      throw new Error('Invalid weather data received');
    }

    return {
      current: data.current,
      forecast: data.forecast.forecastday,
      location: data.location
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    throw new Error(error.message || 'Unable to retrieve weather data');
  }
};