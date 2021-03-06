const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name's minimum length is 3."],
    unique: true,
  },
  number: {
    type: String,
    minlength: [8, "minimum length for the phone number is 8"],
    validate: {
      validator: function (v) {
        return /(^\d{8,}$|^\d{2}-\d{6,}$|^\d{3}-\d{5,}$)/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
