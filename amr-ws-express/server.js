// WebSocket port number
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// Import dummy data
const {
  getRobotHealthState,
  getOdometryData,
  tasksData,
  motorData,
  sensorData,
} = require("./dummy/data");

// File reading library (to read task diagram dummy image)
const fs = require("fs");

// ExpressJS framework
const express = require("express");
const app = express();

// Load broadcaster on root path
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/broadcaster.html");
});

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    // Allow any URL to access
    origin: "*",
    // Allow GET and POST 
    methods: ["GET", "POST"],
  },
});

 // The broadcaster's socket id
 let broadcasterId;

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

  /* ----------------- WebRTC Signaling ----------------- */

  // When the broadcaster is ready to send share screen
  clientSocket.on("broadcaster", (id) => {
    broadcasterId = id;
    console.log("Got broadcaster id:", broadcasterId);

    // Send signal to watchers that the broadcaster is ready
    io.emit("watcher");
  });

  // When the watcher sends an offer to the broadcaster
  clientSocket.on("client_offer", () => {
    console.log("Sending client offer event to", broadcasterId);
    const clientId = clientSocket.id;

    // Tell broadcaster that there is an offer from client
    clientSocket.to(broadcasterId).emit("client_offer", clientId);
  });

  // When sending an offer over
  clientSocket.on("offer", (clientId, desc) => {
    const senderId = clientSocket.id;

    // Send the offer to the appropriate receiver
    clientSocket.to(clientId).emit("offer", senderId, desc);
  });

  // When sending an answer over
  clientSocket.on("answer", (serverId, desc) => {
    const clientId = clientSocket.id;

    // Send the answer to the appropriate receiver
    clientSocket.to(serverId).emit("answer", clientId, desc);
  });

  // When sending ICE candidate over
  clientSocket.on("candidate", (receiverId, candidate) => {
    const senderId = clientSocket.id;

    // Send the ICE candidate to the appropriate receiver
    clientSocket.to(receiverId).emit("candidate", senderId, candidate);
  });

  // When the client disconnects from the WebSocket
  clientSocket.on("disconnect", () => {
    console.log(`User ${clientSocket.id} has been disconnected`);

    // Tell the broadcaster to disconnect this watcher
    clientSocket.to(broadcasterId).emit("disconnect_peer", clientSocket.id);
  });
});

// Fake update the health state and odometry every 2 seconds
setInterval(() => {
  // Emit robot health state
  io.emit("general_state", getRobotHealthState());

  // Emit odometry data
  io.emit("odometry", getOdometryData());
}, 2000);

// If server is up and running, print to the console
server.listen(PORT, HOST, () => {
  console.log("Server is running on port " + PORT);
});
