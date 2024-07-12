const { saveCache } = require("../helper/saveCache");
const { generateToken, getTokens } = require("../service/token.service");

module.exports = {
  createToken: async (req, res, next) => {
    try {
      const response = await generateToken(req.body);
      if (response) {
        res.json({
          msg: "success",
          data: response,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getTokenList: async (req, res, next) => {
    const keyName = req.url;
    try {
      const response = await getTokens();
      if (response) {
        res.json({
          fromCache: false,
          msg: "success",
          data: response,
        });
        await saveCache(keyName, response);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    }
  },
};
