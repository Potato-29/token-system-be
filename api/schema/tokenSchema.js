const { default: mongoose } = require("mongoose");
const {
  tokenStatuses,
  statusMessages,
} = require("../../constants/tokenStatus");

const tokenSchema = new mongoose.Schema({
  number: Number,
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  tokenType: { type: Object, required: true },
  status: { type: String, default: tokenStatuses.PENDING, required: true },
  statusMessage: {
    type: String,
    default: statusMessages.IN_QUEUE,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = { tokenSchema };
