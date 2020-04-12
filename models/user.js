const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

// SCHEMA
const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
  isAdmin: Boolean,
});

// INFORMATION EXPERT PRICIPLE
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// MODEL
const User = mongoose.model("User", userSchema);

// VALIDATE
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
