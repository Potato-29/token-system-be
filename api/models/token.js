const { default: mongoose } = require("mongoose");
const { tokenSchema } = require("../schema/tokenSchema");

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token };
