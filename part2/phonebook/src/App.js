import React, { useState, useEffect } from "react";
import numberServices from "./services/numbers";
import Persons from "./components/persons";
import PersonForm from "./components/personFrom";

const Filter = ({ searchPhrase, handleChangeSearchPhrase }) => (
  <div>
    filter shown with{" "}
    <input value={searchPhrase} onChange={handleChangeSearchPhrase} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    numberServices.getAll().then((data) => setPersons(data));
  }, []);

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
    if (newName.length === 0) return;
    const exists = checkPersonExists();
    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      )
        numberServices
          .update(exists.id, { ...exists, number: newNumber })
          .then((data) =>
            setPersons(
              persons.map((note) => (note.id === data.id ? data : note))
            )
          );
    } else {
      const newElement = {
        name: newName,
        number: newNumber,
      };
      numberServices
        .create(newElement)
        .then((data) => setPersons(persons.concat(data)));
    }
    setNewName("");
    setNewNumber("");
  };

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
      <Persons
        persons={persons}
        setPersons={setPersons}
        remove={numberServices.remove}
        searchPhrase={searchPhrase}
      />
    </div>
  );
};

export default App;
