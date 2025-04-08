// components/WeatherDisplay.jsx
import React from 'react';

import CurrentWeather from './CurrentWeather';
import { getWeatherIcon } from '../utils/weatherIcons';


const WeatherDisplay = ({ weather, forecast, location }) => {
    if (!weather || !forecast) return null;
  
    return (
      <div className="weather-display">
        <CurrentWeather weather={weather} location={location} />
        
        <div className="forecast-section">
          <h2>5-Day Forecast</h2>
          <div className="forecast-scroller">
            {forecast.map((day, index) => (
              <ForecastDay 
                key={day.date_epoch || index}
                day={day}
                isToday={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default WeatherDisplay;
  
  const ForecastDay = ({ day, isToday }) => {
    // Human touch: Add date formatting with ordinal suffix
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('en-US', options);
    };
  
    return (
      <div className={`forecast-day ${isToday ? 'today' : ''}`}>
        <div className="forecast-header">
          <div className="forecast-date">
            {isToday ? 'Today' : formatDate(day.date)}
          </div>
          <div className="forecast-icon">
            {getWeatherIcon(day.day.condition.code)}
          </div>
        </div>
        <div className="forecast-temps">
          <span className="max-temp">
            {Math.round(day.day.maxtemp_c)}°
          </span>
          <span className="min-temp">
            {Math.round(day.day.mintemp_c)}°
          </span>
        </div>
        <div className="forecast-details">
          <div className="precipitation">
            ☔ {day.day.daily_chance_of_rain}%
          </div>
          <div className="wind">
            🍃 {day.day.maxwind_kph}km/h
          </div>
        </div>
      </div>
    );
  };