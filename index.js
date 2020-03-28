const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongoDB.."))
  .catch(err => console.log("failed to connect to mongoDB.", err));

// ROUTES imports
const home = require("./routes/home");
const genres = require("./routes/genres");

app.use(express.json());
app.use(express.static("public"));
// ROUTES
app.use("/", home);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listing on port ${port}...`));
