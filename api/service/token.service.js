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
  getTokens: async (body) => {
    const allTokens = await Token.find({}).exec();
    return allTokens;
  },
};
