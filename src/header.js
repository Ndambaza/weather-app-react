import React, { useState } from "react";

function Header(props) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!city.trim()) {
      alert("Please enter a city");
      return;
    }
    props.onSearch(city);
    setCity("");
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        value={city}
        className="search-form-input"
        onChange={updateCity}
      />
      <button type="submit" className="search-form-button">
        Search
      </button>
    </form>
  );
}

export default Header;
