"use strict";

const config = require("./app/config.js");
const routes = require("./app/routes.js");
const auth = require("./app/auth.js");
const socketServer = require("./app/socket.js");
//const mail = require("./app/mail.js");
//mail().catch(console.error);

const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionStore = new session.MemoryStore();

app.use(cookieParser());
app.use("/", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

// ______ CONNECTIONS TO DB & PORT ________ //

const connections = async () => {
  const db = await mongoClient
    .connect(config.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((client) => client.db("test"))
    .catch((err) => console.log("Database error: " + err));
  console.log("Successful database connection to: " + db.s.namespace);

  auth(app, sessionStore, db);
  routes(app, db);
  socketServer(http, sessionStore, db);

  const port = config.PORT || 3001;
  const listener = http.listen(port, "localhost", () => {
    const { address, port } = listener.address();
    console.log(`Server is listening at http://${address}:${port}/`);
  });
};

connections().catch((err) => console.log("Connection error: " + err));
