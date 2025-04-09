// src/utils/weatherIcons.js
export const getWeatherIcon = (code, isDay = 1) => {
    // Simplified version - in a real app you'd have more conditions
    const iconMap = {
      1000: isDay ? '☀️' : '🌙', // Sunny/Clear
      1003: isDay ? '🌤️' : '🌤️', // Partly cloudy
      1006: '☁️', // Cloudy
      1009: '🌫️', // Overcast
      1030: '😶‍🌫️', // Mist
      1063: '🌦️', // Patchy rain
      1066: '🌨️', // Patchy snowsnow
      1069: '🌨️', // Patchy sleet
      1072: '🌧️', // Patchy freezing drizzle
      1087: '🌩️', // Thundery outbreaks
      1114: '❄️', // Blowing snow
      1117: '❄️', // Blizzard
      1135: '😶‍🌫️', // Fog
      1147: '🌫️', // Freezing fog
      1150: '🌧️', // Patchy light drizzle
      1153: '🌧️', // Light drizzle
      1168: '🌧️', // Freezing drizzle
      1171: '🌧️', // Heavy freezing drizzle
      1180: '🌦️', // Patchy light rain
      1183: '🌧️', // Light rain
      1186: '🌧️', // Moderate rain
      1189: '🌧️', // Heavy rain
      1192: '🌧️', // Light freezing rain
      1195: '🌧️', // Heavy freezing rain
      1198: '🌧️', // Light sleet
      1201: '🌧️', // Moderate or heavy sleet
      1204: '🌨️', // Light snow
      1207: '🌨️', // Moderate or heavy snow
      1210: '🌨️', // Patchy light snow
      1213: '🌨️', // Light snow
      1216: '🌨️', // Moderate snow
      1219: '🌨️', // Heavy snow
      1222: '🌨️', // Ice pellets
      1225: '🌨️', // Light ice pellets
      1237: '❄️', // Ice pellets
      1240: '🌦️', // Light rain shower
      1243: '🌧️', // Moderate or heavy rain shower
      1246: '🌧️', // Torrential rain shower
      1249: '🌨️', // Light sleet showers
      1252: '🌨️', // Moderate or heavy sleet showers
      1255: '🌨️', // Light snow showers
      1258: '🌨️', // Moderate or heavy snow showers
      1261: '❄️', // Light showers of ice pellets
      1264: '❄️', // Moderate or heavy showers of ice pellets
      1273: '⛈️', // Patchy light rain with thunder
      1276: '⛈️', // Moderate or heavy rain with thunder
      1279: '⛈️', // Patchy light snow with thunder
      1282: '⛈️', // Moderate or heavy snow with thunder
    };
  
    return iconMap[code] || '🌈';
  };