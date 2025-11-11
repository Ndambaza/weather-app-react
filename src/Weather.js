import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherData(props) {
  const [unit, setUnit] = useState("celsius");

  // Map weather descriptions to icon types
  function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    if (desc.includes("cloud")) return "CLOUDY";
    if (desc.includes("clear") || desc.includes("sunny")) return "CLEAR_DAY";
    if (desc.includes("rain")) return "RAIN";
    if (desc.includes("snow")) return "SNOW";
    if (desc.includes("wind")) return "WIND";
    if (desc.includes("fog") || desc.includes("mist")) return "FOG";
    return "CLOUDY";
  }

  const iconType = getWeatherIcon(props.description);
  let iconColor;
  if (props.theme === "night-theme") {
    iconColor = "white";
  } else {
    iconColor = "orange";
  }

  const getTemperature = (celsius) => {
    if (unit === "fahrenheit") {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const localTime = () => {
    const date = new Date();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const cityTime = new Date(utcTime + props.timezone * 1000);
    return cityTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    /* Weather Info */
    <div className="weather-app">
      <main>
        <div className="weather-app-data">
          <div>
            <h1 className="weather-app-city">{props.city}</h1>
            <p className="weather-app-details">
              <span className="time">{localTime()}</span>,
              <span className="description">{props.description}</span>
              <br />
              Humidity: <strong className="humidity">60%</strong>, Wind:{" "}
              <strong className="wind-speed">10 km/h</strong>
            </p>
          </div>

          <div className="weather-app-temperature-container">
            <div className="icon">
              <ReactAnimatedWeather
                icon={iconType}
                color={iconColor}
                size={64}
                animate={true}
              />
            </div>
            <div className="weather-app-temperature">
              <span className="temperature-value">
                {getTemperature(props.temperature)}
              </span>
              <span className="weather-app-unit">
                <button
                  type="button"
                  className={`celsius-temp ${
                    unit === "celsius" ? "active" : ""
                  }`}
                  onClick={() => setUnit("celsius")}
                >
                  °C
                </button>{" "}
                |{" "}
                <button
                  type="button"
                  className={`fahrenheit-temp ${
                    unit === "fahrenheit" ? "active" : ""
                  }`}
                  onClick={() => setUnit("fahrenheit")}
                >
                  °F
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="weather-forecast">
          {props.forecast && props.forecast.length > 0 ? (
            props.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="weather-forecast-date">
                  {formatDate(day.dt_txt)}
                </div>
                <div className="weather-forecast-icon">
                  <ReactAnimatedWeather
                    icon={getWeatherIcon(day.weather[0].main)}
                    color={iconColor}
                    size={40}
                    animate={true}
                  />
                </div>
                <div className="weather-forecast-temperatures">
                  <span className="weather-forecast-temperature">
                    {getTemperature(day.main.temp)}°
                    {unit === "celsius" ? "C" : "F"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>5-Day Forecast Here</p>
          )}
        </div>
      </main>
    </div>
  );
}
