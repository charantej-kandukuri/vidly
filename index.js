const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

if (!config.get("jwtPrivateKey")) {
  console.error("FATEL ERROR jwtPrivateKey is not defined.");
  process.exit(1);
  // Here "0" indicates success anything but "0" means failure.
}

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB.."))
  .catch((err) => console.log("failed to connect to mongoDB.", err));

// ROUTES imports
const auth = require("./routes/auth");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");

app.use(express.json());
app.use(express.static("public"));
// ROUTES
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listing on port ${port}...`));
