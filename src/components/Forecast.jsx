// Forecast Component JSX Update
import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.length) return null;

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {forecast.map((day) => (
          <div key={day.date} className="forecast-day">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="forecast-icon">
              {getWeatherIcon(day.day.condition.code)}
            </div>
            <div className="forecast-temp">
              <span className="max-temp">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="min-temp">{Math.round(day.day.mintemp_c)}°</span>
            </div>
            <div className="forecast-condition">
              {day.day.condition.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;