// models/logo.model.js
const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  url: { type: String, required: true },
});

module.exports = mongoose.model("Logo", logoSchema);
