const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error('Missing API key configuration. Please define REACT_APP_WEATHER_API_KEY in your .env file.');
}

const BASE_URL = 'https://api.weatherapi.com/v1';

// Unified error messages that match ErrorDisplay's expectations
const ERROR_MESSAGES = {
  LOCATION: {
    invalidInput: 'Please enter a location',
    notFound: 'location not found'
  },
  API: {
    quota: 'api quota reached',
    unavailable: 'service unavailable',
    invalidResponse: 'invalid weather data received'
  },
  NETWORK: {
    failure: 'failed to fetch weather data'
  }
};

export const getWeatherData = async (location) => {
  try {
    // Validate input
    if (!location?.trim()) {
      throw new Error(ERROR_MESSAGES.LOCATION.invalidInput);
    }

    console.log(`[WeatherAPI] Fetching data for: ${location}`);
    
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=yes`
    );

    if (!response.ok) {
      const errorData = await response.json();
      const apiMessage = errorData.error?.message || '';
      
      // Map API errors to user-friendly messages
      const errorMapping = {
        'q not found': ERROR_MESSAGES.LOCATION.notFound,
        'API key': ERROR_MESSAGES.API.unavailable,
        'limit exceeded': ERROR_MESSAGES.API.quota
      };

      // Find the most specific error message
      const matchedError = Object.entries(errorMapping).find(([key]) => 
        apiMessage.toLowerCase().includes(key)
      );

      throw new Error(matchedError?.[1] || apiMessage || ERROR_MESSAGES.NETWORK.failure);
    }

    const data = await response.json();
    
    // Validate response structure
    const requiredFields = [
      'current.temp_c',
      'current.condition.text',
      'forecast.forecastday'
    ];
    
    const isValid = requiredFields.every(field => {
      const keys = field.split('.');
      return keys.reduce((obj, key) => obj?.[key], data) !== undefined;
    });

    if (!isValid) {
      console.error('Invalid API response structure:', data);
      throw new Error(ERROR_MESSAGES.API.invalidResponse);
    }

    return {
      current: data.current,
      forecast: data.forecast.forecastday,
      location: data.location
    };
  } catch (error) {
    console.error('[WeatherAPI] Critical failure:', {
      error: error.message,
      location,
      timestamp: new Date().toISOString()
    });
  
    // Ensure error message is preserved
    const finalErrorMessage = error.message || ERROR_MESSAGES.NETWORK.failure;
    throw new Error(finalErrorMessage);
  }
};