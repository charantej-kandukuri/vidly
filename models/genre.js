const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

// SCHEMA
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, "Mininum length should be 4 charectors.."],
    maxlength: 20,
    unique: [true],
  },
});

// MODEL
const Genre = mongoose.model("Genre", genreSchema);

// VALIDATION
const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
