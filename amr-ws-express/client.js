const io = require("socket.io-client");

const socket = io("ws://localhost:5500", {});
console.log("Connected to server");

socket.on("test", (data) => {
  console.log("Server:", data);
});
