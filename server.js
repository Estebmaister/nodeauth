"use strict";

const config = require("./app/config.js");
const routes = require("./app/routes.js");
const auth = require("./app/auth.js");
const socketServer = require("./app/socket.js");
//const mail = require("./app/mail.js");
//mail().catch(console.error);

const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const httpsLocalhost = require("https-localhost")();
const app = require("express")();
let protocol, prot;
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

  if (process.env.PRODUCTION === "LOCAL") {
    const https = require("https");
    const certs = await httpsLocalhost.getCerts();
    protocol = https.createServer(certs, app);
    prot = "https";
  } else {
    protocol = require("http").Server(app);
    prot = "http";
  }
  auth(app, sessionStore, db);
  routes(app, db);
  socketServer(protocol, sessionStore, db);

  const port = config.PORT || 3001;
  const listener = protocol.listen(port, "localhost", () => {
    const { address, port } = listener.address();
    console.log(`Server is listening at ${prot}://${address}:${port}/`);
  });
};

connections().catch((err) => console.log("Connection error: " + err));
