const io = require("../../app");
const { db } = require("../../config/db");
const { tokenStatuses } = require("../../constants/tokenStatus");
const { Token } = require("../models/token");

module.exports = {
  generateToken: async (body) => {
    let oldTokenNumber = await Token.findOne({}).sort({ createdAt: -1 }).exec();
    let newTokenNumber = oldTokenNumber ? oldTokenNumber.number + 1 : 1;
    const newToken = new Token({
      number: newTokenNumber,
      ...body,
    });

    const createdToken = await newToken.save();
    return createdToken;
  },

  getTokenInfo: async (id) => {
    const token = Token.findById(id).exec();
    return token;
  },

  getTokens: async (body) => {
    const allTokens = await Token.find({}).exec();
    return allTokens;
  },

  updateTokenStatus: async (id, status, message) => {
    const { status: currentStatus } = await Token.findById(id);
    let updateToken;
    if (
      currentStatus === tokenStatuses.PENDING &&
      (status === tokenStatuses.RESOLVED ||
        status === tokenStatuses.ON_HOLD ||
        status === tokenStatuses.CLOSED)
    ) {
      return "Token is not picked yet";
    }

    if (
      currentStatus === tokenStatuses.SERVING &&
      status === tokenStatuses.PENDING
    ) {
      return "Token is currently serving.";
    }

    if (currentStatus === tokenStatuses.CLOSED) {
      return "Token is already closed.";
    }

    if (currentStatus === tokenStatuses.CANCELLED) {
      return "Token is already cancelled";
    }

    if (
      currentStatus === tokenStatuses.ON_HOLD &&
      status === tokenStatuses.PENDING
    ) {
      return "Token is on hold";
    }

    if (currentStatus === tokenStatuses.RESOLVED) {
      return "Token is already resolved";
    }

    updateToken = await Token.findByIdAndUpdate(
      { _id: id },
      { status, statusMessage: message }
    ).exec();
    // const collection = db.collection("tokens");
    // const changeStream = collection.watch();
    // changeStream.on("change", (change) => {
    //   if (change.operationType === "update") {
    //     const updatedFields = change.updateDescription.updatedFields;
    //     // Emit the updated token status to the frontend via socket
    //     io.emit("tokenStatusChanged", updatedFields);
    //     console.log("done");
    //   }
    // });

    if (updateToken) {
      const updatedToken = await Token.findById(id).exec();
      return updatedToken;
    }
    if (updateToken === null) {
      return null;
    }
  },
  getWaitingCount: async () => {
    const allTokens = await Token.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .exec();
    const queueLength = allTokens?.length - 1;
    return queueLength;
  },
};
