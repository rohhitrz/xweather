import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Weather.module.css"

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "b259b100e6dc4974a46210057240109";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeatherData(null);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Failed to fetch weather data");
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather">
      <h1>Weather Application</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature:{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity:{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition:{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed:{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
