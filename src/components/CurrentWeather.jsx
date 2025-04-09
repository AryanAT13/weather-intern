import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const CurrentWeather = ({ weather, location }) => {
  if (!weather) return null;

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
    </div>
  );
};

export default CurrentWeather;
