import React, { useState, useEffect } from "react";
import Header from "./header";
import WeatherData from "./Weather";
import "./App.css";
import "./index.css";
import Footer from "./footer";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState("day-theme");
  const [weather, setWeather] = useState({
    city: "London",
    temperature: 12,
    description: "Cloudy",
    timezone: 0,
  });

  const [forecast, setForecast] = useState([]); //Add forecast state

  useEffect(() => {
    document.body.classList.remove("day-theme", "night-theme");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof weather.timezone !== "number") return;

    const updateThemeBasedOnTime = () => {
      // timezone from OpenWeatherMap
      const utcHour = new Date().getUTCHours();
      const cityHour = (utcHour + weather.timezone / 3600 + 24) % 24;
      // night if 18:00 <= hour or hour < 6:00
      if (cityHour >= 18 || cityHour < 6) {
        setTheme("night-theme");
      } else {
        setTheme("day-theme");
      }
    };

    updateThemeBasedOnTime();
    const id = setInterval(updateThemeBasedOnTime, 60_000); // keep in sync
    return () => clearInterval(id);
  }, [weather.timezone]);

  //Fetch initial forecast data for default city
  useEffect(() => {
    const apiKey = `24d6cb2a7c0d27fcc186996bccf9c722`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${apiKey}&units=metric`;

    axios
      .get(forecastUrl)
      .then((response) => {
        // Get one forecast per day (every 8 entries = 24 hours)
        const dailyForecasts = response.data.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5);
        setForecast(dailyForecasts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSearch(newCity) {
    const apiKey = `24d6cb2a7c0d27fcc186996bccf9c722`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        const { name, main, weather, timezone } = response.data;
        setWeather({
          city: name,
          temperature: Math.round(main.temp),
          description: weather[0].main,
          timezone: timezone,
        });
      })
      .catch((error) => {
        alert("City not found");
        console.error(error);
      });

    axios
      .get(forecastUrl)
      .then((response) => {
        const dailyForecasts = response.data.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5);
        setForecast(dailyForecasts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className={`weather-app ${theme}`}>
      <Header onSearch={handleSearch} />
      <WeatherData
        city={weather.city}
        temperature={weather.temperature}
        description={weather.description}
        timezone={weather.timezone}
        theme={theme}
        forecast={forecast}
      />
      <Footer />
    </div>
  );
}

export default App;
