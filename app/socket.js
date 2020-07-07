"use strict";

const config = require("./config.js");
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const log = console.log;

module.exports = (http, sessionStore, db) => {
  const io = require("socket.io")(http);
  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: "express.sid",
      secret: config.SESSION_SECRET,
      store: sessionStore,
    })
  );

  let currentUsers = 0;

  io.on("connection", (socket) => {
    ++currentUsers;
    log(chalk.blue`User ${socket.request.user.username} connected to socket`);

    io.emit("user", {
      name: socket.request.user.username,
      currentUsers,
      connected: true,
    });

    io.emit("user count", currentUsers);

    socket.on("chat message", (message) => {
      log(chalk.keyword("orange")("Message send it"));
      io.emit("chat message", { name: socket.request.user.username, message });
    });

    socket.on("disconnect", () => {
      log(
        chalk.blue`User ${socket.request.user.username} disconnected from socket`
      );
      --currentUsers;
      io.emit("user count", currentUsers);
      io.emit("user", {
        name: socket.request.user.username,
        currentUsers,
        connected: false,
      });
    });
  });
};
