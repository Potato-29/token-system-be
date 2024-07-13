const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const tokenRouter = require("./api/router/token.router");
const { db } = require("./config/db"); // this import is necessary to connect with mongodb
const io = new Server(server);
const redis = require("redis");
const cors = require("cors");

// initiate redis client directly
app.get("/", async (req, res) => {
  res.json({
    data: "Hello user",
  });
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://43.204.215.234/", "http://localhost:3000"],
  })
);

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
