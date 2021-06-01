const PORT = 5500;

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer();

app.get("/", (req, res) => {
  res.send("Up and running :)");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
