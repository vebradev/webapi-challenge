const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Live!");
});

module.exports = server;
