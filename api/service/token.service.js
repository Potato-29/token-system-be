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
    const updateToken = await Token.findByIdAndUpdate(
      { _id: id },
      { status, statusMessage: message }
    ).exec();
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
