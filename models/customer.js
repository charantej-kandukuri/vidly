const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  phone: { type: String, minlength: 5, maxlength: 50, required: true },
  isGold: { type: Boolean, default: true }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
