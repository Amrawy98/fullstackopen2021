import { useEffect, useState } from "react";

import axios from "axios";

const Country = ({ country }) => {
  const langs = country.languages;
  const [lat, lng] = country.capitalInfo.latlng;
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        setWeather({
          temp: data.main.temp,
          windSpeed: data.wind.speed,
          windDirection: data.wind.deg,
        });
      });
  }, [lat, lng]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(langs).map((lang) => (
          <li key={lang}>{langs[lang]}</li>
        ))}
      </ul>
      <img src={country.flags["png"]} alt={Country.name.common + " flag"} />
      <h2>Weather in {country.capital[0]}</h2>
      <div>Temperature {weather.temp} Celsius</div>
      <div>
        Wind {weather.windSpeed} m/s Direction {weather.windDirection} degrees
      </div>
    </div>
  );
};

export default Country;
