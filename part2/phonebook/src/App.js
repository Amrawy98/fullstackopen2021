import React, { useState, useEffect } from "react";
import numberServices from "./services/numbers";
import PersonList from "./components/personList";
import PersonForm from "./components/personFrom";
import Notification from "./components/notification";

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
  const [message, setMessage] = useState(null);
  const [errorOrSuccess, setErrorOrSuccess] = useState(true);
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

  const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      numberServices
        .remove(person.id)
        .then((data) => setPersons(persons.filter((p) => p.id !== person.id)))
        .catch((error) => {
          showMessage(
            `Information of ${person.name} has already been removed from server`,
            false
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
  };

  const showMessage = (message, errorSuccess) => {
    setErrorOrSuccess(errorSuccess);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
          .then((data) => {
            setPersons(
              persons.map((note) => (note.id === data.id ? data : note))
            );
            showMessage(`Modified ${data.name}`, true);
          });
    } else {
      const newElement = {
        name: newName,
        number: newNumber,
      };
      numberServices.create(newElement).then((data) => {
        setPersons(persons.concat(data));
        showMessage(`Added ${data.name}`, true);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {
        <Notification
          errorSuccess={errorOrSuccess ? "success" : "error"}
          message={message}
        />
      }

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
      <PersonList
        persons={persons}
        searchPhrase={searchPhrase}
        deleteHandler={deleteNumber}
      />
    </div>
  );
};

export default App;
