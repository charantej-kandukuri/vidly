const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { genreSchema } = require("./genre");

// SCHEMA
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    max: 255,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  },
});

// MODEL
const Movie = mongoose.model("Movie", movieSchema);

// VALIDATION
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255),
    genreId: Joi.objectId().required(),
    //numberInStock: Joi.number().min(0).required(),
    //dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
