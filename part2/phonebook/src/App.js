import React, { useState, useEffect } from "react";
import axios from "axios";
const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const Persons = ({ length, personList }) => (
  <div>{length === 0 ? "..." : personList}</div>
);

const Filter = ({ searchPhrase, handleChangeSearchPhrase }) => (
  <div>
    filter shown with{" "}
    <input value={searchPhrase} onChange={handleChangeSearchPhrase} />
  </div>
);

const PersonForm = ({
  addNumber,
  newName,
  handleChangeName,
  newNumber,
  handleChangeNumber,
}) => (
  <form onSubmit={addNumber}>
    <div>
      name: <input value={newName} onChange={handleChangeName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  let id = 5;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const getSearchResult = () =>
    persons.filter((person) => {
      const name1 = person.name.toLowerCase();
      const name2 = searchPhrase.trim().toLowerCase();
      console.log(name2, name1);
      return name1.includes(name2);
    });

  const checkPersonExists = () =>
    persons.find((person) => person.name === newName);

  const handleChangeSearchPhrase = ({ target }) =>
    setSearchPhrase(target.value);

  const handleChangeName = ({ target }) => {
    const value = target.value;
    setNewName(value);
  };

  const handleChangeNumber = ({ target }) => {
    const value = target.value;
    setNewNumber(value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    if (checkPersonExists()) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const newElement = {
      name: newName,
      number: newNumber,
      id: id,
    };
    id++;
    setPersons(persons.concat(newElement));
    setNewName("");
    setNewNumber("");
  };
  const filteredPersons = searchPhrase === "" ? persons : getSearchResult();
  const personList = filteredPersons.map((person) => (
    <Person key={person.id} person={person} />
  ));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchPhrase={searchPhrase}
        handleChangeSearchPhrase={handleChangeSearchPhrase}
      />
      <h2>add a new</h2>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons length={persons.length} personList={personList} />
    </div>
  );
};

export default App;
