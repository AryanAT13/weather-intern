import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const CurrentWeather = ({ weather, location }) => {
  const getWeatherAdvisory = (weather) => {
    const advisories = [];
  
    if (weather.temp_c > 35) {
      advisories.push('⚠️ Heat Warning: Stay hydrated!');
    }
    if (weather.wind_kph > 30) {
      advisories.push('💨 Wind Advisory: Secure outdoor items');
    }
    if (weather.humidity > 80) {
      advisories.push('💧 High Humidity: Stay cool and hydrated');
    }
    if (weather.pressure_mb < 1000) {
      advisories.push('🌪️ Low Pressure: Possible rain or stormy weather');
    }
    if (weather.uv > 8) {
      advisories.push('🌞 UV Alert: Wear sunscreen & sunglasses');
    }
  
    return advisories.length > 0 ? advisories.join(' | ') : null;
  };
  

  if (!weather) return null;

  const advisoryMessage = getWeatherAdvisory(weather);

  return (
    <div className="current-weather">
      <h2>
        {location.name}, {location.region || location.country}
      </h2>
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(weather.condition.code, weather.is_day)}
          <span>{weather.condition.text}</span>
        </div>
        <div className="weather-temp">
          <span className="temp">{Math.round(weather.temp_c)}°C</span>
          <span className="feels-like">
            Feels like: {Math.round(weather.feelslike_c)}°C
          </span>
        </div>
      </div>
      <div className="weather-details">
        <div>
          <span>Humidity:</span>
          <span>{weather.humidity}%</span>
        </div>
        <div>
          <span>Wind:</span>
          <span>{weather.wind_kph} km/h {weather.wind_dir}</span>
        </div>
        <div>
          <span>Pressure:</span>
          <span>{weather.pressure_mb} mb</span>
        </div>
        <div>
          <span>UV Index:</span>
          <span>{weather.uv}</span>
        </div>
      </div>

      {/* ✅ Weather advisory section */}
      {advisoryMessage && (
        <div className="weather-advisory">
          {advisoryMessage}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
