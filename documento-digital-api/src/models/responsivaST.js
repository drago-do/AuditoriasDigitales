const mongoose = require("mongoose");

const responsivaSchema = new mongoose.Schema({
  serviceTag: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  numeroResponsiva: {
    type: String,
    required: true,
    unique: true,
  },
});

const Responsiva = mongoose.model("Responsiva", responsivaSchema);

module.exports = Responsiva;
