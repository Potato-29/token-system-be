const { createToken, getTokenList } = require("../controller/token.controller");
const { cacheData } = require("../middleware/redis");

const router = require("express").Router();

router.post("/generate", createToken);
router.get("/get-all", cacheData, getTokenList);

module.exports = router;
