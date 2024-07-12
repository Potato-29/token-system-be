const tokenStatuses = {
  PENDING: "pending",
  SERVING: "serving",
  CLOSED: "closed",
  CANCELLED: "cancelled",
  ON_HOLD: "on hold",
  RESOLVED: "resolved",
};
const statusMessages = {
  IN_QUEUE: "You're in queue.",
  SERVING: "Your token is being served.",
  CLOSED: "Your token is closed.",
  CANCELLED: "Your token is cancelled",
  ON_HOLD: "Your token is on hold. Sorry for the inconvenience.",
  RESOLVED: "Your token is resolved.",
};

module.exports = {
  tokenStatuses,
  statusMessages,
};
