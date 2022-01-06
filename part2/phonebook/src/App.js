import React, { useState } from "react";

const Person = ({ name }) => <div>{name}</div>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChangeName = ({ target }) => {
    const value = target.value;
    setNewName(value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    const newElement = {
      name: newName,
    };
    setPersons(persons.concat(newElement));
    setNewName("");
  };
  const personList = persons.map((person) => (
    <Person key={person.name} name={person.name} />
  ));
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0 ? "..." : personList}
    </div>
  );
};

export default App;
