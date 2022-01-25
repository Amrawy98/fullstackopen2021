const express = require("express");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const getID = () => Math.floor(Math.random() * 9999);

const validatePerson = (person) => {
  let error = null;
  if (person.name) {
    // name exists either unique or not: no error or "duplicate name" error
    let unique = persons.find((p) => p.name === person.name) ? false : true;
    return unique ? error : "name must be unique";
  }
  // name does not exist: name is missing error
  return "name missing";
};

const validatePerson2 = (person) =>
  person.name
    ? persons.find((p) => p.name === person.name)
      ? "name must be unique"
      : null
    : "name missing";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("<h1>YEAH BOI</h1>");
});

app.get("/info", (req, res) => {
  return res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const data = req.body;
  const error = validatePerson2(data);
  if (error) {
    return res.status(400).json({
      error: error,
    });
  }
  const person = {
    id: getID(),
    name: data.name,
    number: data.number || "",
  };
  persons = persons.concat(person);
  return res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  return person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((p) => p.id !== person.id);
    return res.json(person);
  } else {
    return res.status(400).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ಠ_ಠ`);
});
