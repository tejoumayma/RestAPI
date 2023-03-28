const express = require("express");
const path = require("path");
const User = require("./config/model/user");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err.message));

app.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    console.error("error", err.message);
  }
});

app.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const user = await User.create({ name, email, phone });
    res.status(201).send(user);
  } catch (err) {
    console.error("error", err.message);
  }
});
app.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (err) {
    console.error("error", err.message);
  }
});
app.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send("user not found");
    }
    res.send(user);
  } catch (err) {
    console.error("error", err.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
