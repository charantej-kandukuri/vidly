const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

// SCHEMA
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true,
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

// MODEL
const Rental = mongoose.model("Rental", rentalSchema);

// VALIDITY
function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
