const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password.");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
