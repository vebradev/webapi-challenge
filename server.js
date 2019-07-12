const express = require("express");
const cors = require("cors");
const server = express();

const projectsRouter = require("./routers/projectsRouter");
const actionsRouter = require("./routers/actionsRouter");

server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("Live!");
});

function logger(req, res, next) {
  const log = {
    method: req.method,
    url: req.url,
    time: new Date()
  };
  console.log(log);
  next();
}

module.exports = server;
