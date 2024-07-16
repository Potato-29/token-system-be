const redis = require("redis");
let redisClient;
(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function cacheData(req, res, next) {
  console.log(req.url);
  const keyName = req.url;
  let results;
  try {
    const cacheResults = await redisClient.get(keyName);
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        msg: "success",
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}

module.exports = {
  cacheData,
  redisClient,
};
