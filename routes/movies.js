const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");

  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Invalid genre!");

  const movie = new Movie({
    title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock,
    dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

module.exports = router;
