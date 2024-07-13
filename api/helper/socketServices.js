const { getWaitingCount } = require("../service/token.service");

const handleDisconnect = () => {
  console.log("socket disconnected");
  return;
};
const handleConnect = () => {
  console.log("socket connected");
};
const handleError = (io) => {
  io.emit("error", {
    msg: "Socket io error!",
  });
};

const emitQueueLength = async (io) => {
  let queueLength = await getWaitingCount();
  io.emit("queue", {
    queueLength,
  });
};

module.exports = {
  handleError,
  handleDisconnect,
  handleConnect,
  emitQueueLength,
};
