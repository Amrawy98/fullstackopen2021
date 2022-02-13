const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");
const { response } = require("express");

/*let persons = [
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
*/
const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

morgan.token("body", function (req, res) {
  const ret = JSON.stringify(req.body);
  return ret === "{}" ? " " : ret;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  return res.send("<h1>YEAH BOI</h1>");
});

app.get("/info", (req, res) => {
  Person.count().then((result) => {
    return res.send(`<p>Phonebook has info for ${result} people</p>
    <p>${new Date()}</p>`);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    console.log(result);
    return res.json(result);
  });
});

app.post("/api/persons", (req, res) => {
  const data = req.body;

  const person = new Person({
    name: data.name,
    number: data.number || "",
  });
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
  });
  return res.json(person);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number || "",
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ಠ_ಠ`);
});
