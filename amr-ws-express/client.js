const io = require("socket.io-client");

const socket = io("ws://localhost:5500", {});
console.log("Connected to server");

const printObject = (object) => {
  let result = [];

  for (let key in object) {
    result.push(`${key}: ${object[key]}`);
  }

  return result.join(", ");
};

const printObjectArray = (array) => {
  let result = [];

  for (let e of array) {
    result.push(printObject(e));
  }

  return result.join("\n");
};

socket.on("general_state", (data) => {
  console.log("General: " + printObject(data));
});

socket.on("odometry", (data) => console.log("Odometry: " + printObject(data)));

socket.on("sensors", (arr) =>
  console.log("Sensors:\n " + printObjectArray(arr))
);

socket.on("motors", (arr) => console.log("Motors:\n " + printObjectArray(arr)));

socket.on("tasks", (arr) => console.log("Tasks:\n " + printObjectArray(arr)));
// Handle disconnection
socket.on("disconnect", (reason) => {
  console.log("Disconnected from the server: " + reason);
  socket.close();
});
