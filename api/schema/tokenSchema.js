const { default: mongoose } = require("mongoose");

const tokenSchema = new mongoose.Schema({
  number: Number,
  fullName: String,
  mobileNumber: String,
  tokenType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = { tokenSchema };
