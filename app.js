const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const tokenRouter = require("./api/router/token.router");
const { db } = require("./config/db"); // this import is necessary to connect with mongodb
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  },
});
const cors = require("cors");
const {
  handleDisconnect,
  emitQueueLength,
} = require("./api/helper/socketServices");
const { getWaitingCount } = require("./api/service/token.service");

// initiate redis client directly
app.get("/", async (req, res) => {
  res.send("<h1>Hello world</h1>");
});
app.use(express.json());
app.use(cors());

// All api routes
app.use("/token", tokenRouter);

// intialize the socket connection
io.on("connection", async (socket) => {
  if (socket.connected) {
    socket.on("disconnect", handleDisconnect);
    emitQueueLength(io);
    setInterval(async () => {
      emitQueueLength(io);
    }, 120000);
  }
});
io.on("error", async () => {
  io.emit("error", {
    msg: "socket io failed to connect",
  });
});
let port = process.env.PORT;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
