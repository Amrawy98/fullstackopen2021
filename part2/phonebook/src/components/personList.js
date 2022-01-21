const Person = ({ person, deletePersonHandler }) => (
  <div>
    {person.name} {person.number}{" "}
    {<button onClick={deletePersonHandler}>delete</button>}
  </div>
);

const PersonList = ({ persons, searchPhrase, deleteHandler }) => {
  const getSearchResult = () =>
    persons.filter((person) => {
      const name1 = person.name.toLowerCase();
      const name2 = searchPhrase.trim().toLowerCase();
      console.log(name2, name1);
      return name1.includes(name2);
    });

  const filteredPersons = searchPhrase === "" ? persons : getSearchResult();
  return (
    <div>
      {filteredPersons.length === 0
        ? "..."
        : filteredPersons.map((person) => (
            <Person
              key={person.id}
              person={person}
              deletePersonHandler={() => deleteHandler(person)}
            />
          ))}
    </div>
  );
};

export default PersonList;
