import React from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
//import { AnimatedWeatherIcon } from "animated-weather-icon";

export default function Weather(props) {
  function handleResponse(response) {
    alert(
      `The weather in ${response.data.name} is ${response.data.main.temp}°C`
    );
  }
  let apiKey = `24d6cb2a7c0d27fcc186996bccf9c722`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(handleResponse);
  return (
    <div>
      <TailSpin
        height="80"
        width="80"
        color="#8d4da9ff"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
}
