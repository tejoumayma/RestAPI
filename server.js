const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err.message));

app.get("/", (req, res) => {
  res.json({ message: "get all contact" });
});
app.post("/", (req, res) => {});
app.put("/", (req, res) => {});
app.delete("/", (req, res) => {});

app.listen(port, () => console.log(`Server is running on port ${port}`));
