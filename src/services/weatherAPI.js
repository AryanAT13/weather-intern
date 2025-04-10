const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'd23f583daabd4ac99e2174844250804';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location) => {
  try {
    if (!location?.trim()) {
      throw new Error('Please enter a location');
    }

    console.log(`[WeatherAPI] Fetching data for: ${location}`);
    
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=yes&alerts=yes`
    );

    if (!response.ok) {
      const errorData = await response.json();
      const apiMessage = errorData.error?.message;
      
      const errorMap = {
        'q not found': 'Location not found. Try another city or postal code.',
        'API key': 'Service unavailable. Please try again later.',
        'limit exceeded': 'API quota reached'
      };
      
      const userMessage = Object.entries(errorMap).find(([key]) => 
        apiMessage?.includes(key)
      )?.[1] || apiMessage;

      throw new Error(userMessage || 'Failed to fetch weather data');
    }

    const data = await response.json();
    
    // Validation of expected fields can remain as is
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
      throw new Error('Received incomplete weather data');
    }

    return {
      current: data.current,
      forecast: data.forecast.forecastday,
      location: data.location
    };
  } catch (error) {
    console.error('[WeatherAPI] Failed:', error.message);
    throw error;
  }
};

