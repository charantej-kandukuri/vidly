const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, "Mininum length should be 4 charectors.."],
    maxlength: 20,
    unique: [true]
  }
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });

  try {
    genre = await genre.save();
    if (!genre) return res.status(400).send("Record not saved..!");
    res.send(genre);
  } catch (ex) {
    console.log(ex.message);
    for (field in ex.errors) res.status(400).send(ex.errors[field].message);
  }
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the given Id was not found!");

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  let genre = await Genre.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name
      }
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given Id was not found!");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove({ _id: req.params.id });
  if (!genre)
    return res.status(404).send("The genre with the given Id was not found!");

  res.send(genre);
});

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(genre);
};

module.exports = router;
