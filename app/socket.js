"use strict";

const config = require("./config.js");
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");

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
    console.log(
      "User " + socket.request.user.username + " connected to socket"
    );

    io.emit("user", {
      name: socket.request.user.username,
      currentUsers,
      connected: true,
    });

    io.emit("user count", currentUsers);

    socket.on("disconnect", () => {
      console.log(
        "User " + socket.request.user.username + " disconnected from socket"
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
