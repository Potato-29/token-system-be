const {
  tokenStatuses,
  statusMessages,
} = require("../../constants/tokenStatus");
const { saveCache } = require("../helper/saveCache");
const {
  generateToken,
  getTokens,
  updateTokenStatus,
  getTokenInfo,
} = require("../service/token.service");

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
  getTokenById: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await getTokenInfo(id);
      if (response) {
        res.json({
          fromCache: false,
          msg: "success",
          data: response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            error: "Token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
      // await saveCache(req.url, response);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  pickToken: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await updateTokenStatus(
        id,
        tokenStatuses.SERVING,
        statusMessages.SERVING
      );
      if (response) {
        res.json({
          msg: "success",
          response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            msg: "token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  closeToken: async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await updateTokenStatus(
        id,
        tokenStatuses.CLOSED,
        statusMessages.CLOSED
      );
      if (response) {
        res.json({
          msg: "success",
          response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            msg: "token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  cancelToken: async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await updateTokenStatus(
        id,
        tokenStatuses.CANCELLED,
        statusMessages.CANCELLED
      );
      if (response) {
        res.json({
          msg: "success",
          response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            msg: "token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  holdToken: async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await updateTokenStatus(
        id,
        tokenStatuses.ON_HOLD,
        statusMessages.ON_HOLD
      );
      if (response) {
        res.json({
          msg: "success",
          response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            msg: "token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  resolveToken: async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await updateTokenStatus(
        id,
        tokenStatuses.RESOLVED,
        statusMessages.RESOLVED
      );
      if (response) {
        res.json({
          msg: "success",
          response,
        });
      } else {
        if (response === null) {
          res.status(400).json({
            msg: "token not found!",
          });
        } else {
          res.status(400).json({
            error: "Something went wrong!",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};
