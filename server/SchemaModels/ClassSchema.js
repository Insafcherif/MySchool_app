const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  className: { type: String, required: true },
  Salle: {
    type: String,
    required: true,
  },
  Level : {
    type: String, required: true 
  },
  ListOfStudent: [], 
  ListOfSubject : [],
  ListOfProf:[],
  Session : []
 });
module.exports = mongoose.model("student", studSchema);
