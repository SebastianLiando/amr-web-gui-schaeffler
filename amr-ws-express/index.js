const PORT = 5500;

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer();

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Up and running :)");
});

io.on("connection", (clientSocket) => {
  console.log(`User ${clientSocket.id} has been connected`);

  clientSocket.on("disconnect", () =>
    console.log(`User ${clientSocket.id} has been disconnected`)
  );
});

setInterval(() => {
  io.emit("test", Math.random() * 1000);
}, 2000);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
