const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
  levelNumber: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
  levelPrice: { type: Number },
  levelSubject: [],
  levelClass: [],
});

const subjectSchema = mongoose.Schema({
  subjectName: {
    type: String,
    enum: [
      "English",
      "Frensh",
      "Arabic",
      "Physical Education",
      "Math",
      "Science",
      "I.T (Information Technology)",
      "Islamic Education",
      "Art",
      "Geography",
      "Chemistry",
      "Physics",
      "Social Education",
      "History",
      "Music",
    ],
  },
  NumberOfHours: { type: Number },
});
