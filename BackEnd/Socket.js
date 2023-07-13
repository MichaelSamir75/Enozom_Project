
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`players Connected: ${socket.id}`);

   //notifies the server of the newly joined player

  socket.on("join", (data) => {
    users.join(data);
    io.sockets.emit("join", data);
  });

   // informs a new player who has just joined the game about the players who have already joined the game

  socket.on("joined", () => {
    socket.emit("joined", users);
  });

  socket.on("throwDice", (data) => {
    users[data.id].Position = data.Position;
    const turn = data.num != 6 ? (data.id + 1) % users.length : data.id;
    io.sockets.emit("throwDice", data, turn);
  });
});

server.listen(3000, () => {
  console.log("SERVER RUNNING");
});
