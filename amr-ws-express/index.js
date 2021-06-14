const PORT = 5500;

const fs = require("fs");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer();

const { Server } = require("socket.io");
const {
  getRobotHealthState,
  getOdometryData,
  tasksData,
  motorData,
  sensorData,
} = require("./dummy/data");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// When a client connects to the server
io.on("connection", (clientSocket) => {
  console.log(`User ${clientSocket.id} has been connected`);

  // Simulate latency
  setTimeout(() => {
    // Send tasks
    clientSocket.emit("tasks", tasksData);

    // Send motors states
    clientSocket.emit("motors", motorData);

    // Send sensors states
    clientSocket.emit("sensors", sensorData);

    fs.readFile("dummy/smach_viewer.png", (err, data) => {
      io.emit("task_image", data);
    });
  }, 5000);

  clientSocket.on("disconnect", () =>
    console.log(`User ${clientSocket.id} has been disconnected`)
  );
});

// Fake update the health state and odometry every 2 seconds
setInterval(() => {
  // Emit robot health state
  io.emit("general_state", getRobotHealthState());

  // Emit odometry data
  io.emit("odometry", getOdometryData());
}, 2000);

// If server is up and running, print to the console
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
