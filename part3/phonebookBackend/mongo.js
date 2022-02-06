const mongoose = require("mongoose");

const dbName = "phonebook";
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://amrawy_FSO:${password}@cluster0.e1wyz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(url);

  Person.find().then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else {
  if (process.argv.length < 5) {
    console.log(
      "Please provide the password, name and number as an argument: node mongo.js <password> <name> <number>"
    );
    process.exit(1);
  }

  const password = process.argv[2];
  const name = process.argv[3];
  const number = process.argv[4];

  const url = `mongodb+srv://amrawy_FSO:${password}@cluster0.e1wyz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose.connect(url);

  const person = new Person({ name: name, number: number });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
