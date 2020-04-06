const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone
  });
  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    console.error(err);
    res.status(500).send("Internal server error..!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    console.log("Customer :", customer);
    res.send(customer);
  } catch (err) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!customer)
    res.status(404).send("The customer with the given ID was not found..!");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
  } catch (err) {
    res.status(404).send("The customer with the given ID was not found..!");
  }
});
module.exports = router;
