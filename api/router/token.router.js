const {
  createToken,
  getTokenList,
  pickToken,
  closeToken,
  cancelToken,
  holdToken,
  getTokenById,
  resolveToken,
} = require("../controller/token.controller");
const { cacheData } = require("../middleware/redis");

const router = require("express").Router();

router.post("/generate", createToken);
router.get("/get-all", cacheData, getTokenList);
router.get("/pick/:id", pickToken);
router.get("/close/:id", closeToken);
router.get("/cancel/:id", cancelToken);
router.get("/hold/:id", holdToken);
router.get("/resolve/:id", resolveToken);
router.get("/status/:id", getTokenById);

module.exports = router;
