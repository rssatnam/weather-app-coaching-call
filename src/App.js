import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";
import moment from "moment";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);

  const [image, setimage] = useState(
    "https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
  );

  const [magicNumbers, setMagicNumbers] = useState([12, 24, 50, 34, 99, 23]);
  const [totalOfMagicNumbers, setTotalOfMagicNumbers] = useState(0);

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  useEffect(() => {
    setTotalOfMagicNumbers(
      magicNumbers.reduce((total, magicNumber) => total + magicNumber, 0)
    );
  }, [magicNumbers]);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();

    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: inputRef.current.value || "Barabanki, Uttar Pradesh", // Barabanki, Uttar Pradesh
        units: "imperial",
      },
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "9ppLReQccZJo9qpOZT562YAioMnZ5r4D",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log("FEATCHED THE WEATHER");
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    determineBackgroundImage();
  }, [weatherInfo]);

  const determineBackgroundImage = () => {
    if (weatherInfo?.main.temp < 10) {
      setimage(
        "https://images.unsplash.com/photo-1519944159858-806d435dc86b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
      );
    }

    if (weatherInfo?.main.temp >= 10) {
      setimage(
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
      );
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${image})` }}>
      <div className="app__container">
        <h1>Our Weather App</h1>
        <div className="app__info app__left">
          <h3>Your magic numbers: {magicNumbers.join(", ")}</h3>
          <h4>The total of the magic numbers: {totalOfMagicNumbers}</h4>

          <form>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type the city you want to search for"
            />
            <button onClick={fetchWeatherInfo} type="submit">
              Show me the weather
            </button>
          </form>
        </div>

        <div className="app__info app__right">
          <h2>{weatherInfo?.name}</h2>
          <h2>{weatherInfo?.main.temp} Degrees Celsius</h2>
          <h3>
            {weatherInfo &&
              `Sunrise: ${moment
                .unix(weatherInfo?.sys?.sunrise)
                .format("LLLL")}`}
            {/* {new Date(
          parseInt(weatherInfo?.sys?.sunrise * 1000)
        ).toLocaleDateString()} */}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
