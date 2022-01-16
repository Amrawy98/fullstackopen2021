import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Components/country";

const Search = ({ searchPhrase, handleChangeSearchPhrase }) => (
  <div>
    find countries{" "}
    <input value={searchPhrase} onChange={handleChangeSearchPhrase} />
  </div>
);

const Countries = ({ countries, setShowCountry }) =>
  countries.map((country) => (
    <div key={country.name.common}>
      {" "}
      {country.name.common}{" "}
      <button
        onClick={() => {
          setShowCountry({ show: true, country: country });
        }}
      >
        show
      </button>
    </div>
  ));

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [showCountry, setShowCountry] = useState({ country: {}, show: false });
  const manyMatches = "Too Many Matches, specify another filter";

  const getSearchResult = () => {
    if (searchPhrase.length === 0) return [];
    return countries.filter((country) => {
      const name1 = country.name.common.toLowerCase();
      const name2 = searchPhrase.trim().toLowerCase();
      return name1.includes(name2);
    });
  };

  const handleChangeSearchPhrase = ({ target }) => {
    setSearchPhrase(target.value);
    setShowCountry({ country: {}, show: false });
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const filtered = getSearchResult();

  return (
    <div>
      <Search
        searchPhrase={searchPhrase}
        handleChangeSearchPhrase={handleChangeSearchPhrase}
      />
      {filtered.length > 10 ? (
        manyMatches
      ) : filtered.length === 1 ? (
        <Country country={filtered[0]} />
      ) : showCountry.show ? (
        <Country country={showCountry.country} />
      ) : (
        <Countries countries={filtered} setShowCountry={setShowCountry} />
      )}
    </div>
  );
};

export default App;
