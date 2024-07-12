const { redisClient } = require("../middleware/redis");

const saveCache = async (keyName, data) => {
  await redisClient.set(keyName, JSON.stringify(data), {
    EX: 180,
    NX: true,
  });
};

module.exports = {
  saveCache,
};
