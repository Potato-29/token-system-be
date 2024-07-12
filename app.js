const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const tokenRouter = require("./api/router/token.router");
const { db } = require("./config/db");
const io = new Server(server);
const redis = require("redis");

// initiate redis client directly
app.get("/", async (req, res) => {
  res.json({
    data: "Hello user",
  });
});
app.use(express.json());

// All api routes
app.use("/token", tokenRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

let port = process.env.PORT;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
