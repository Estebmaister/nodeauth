"use strict";

const socketServer = require("./app/socket.js");
const config = require("./app/config.js");
const routes = require("./app/routes");
const auth = require("./app/auth.js");
//const mail = require("./app/mail.js");
//mail().catch(console.error);

const express = require("express");
const helmet = require("helmet");
const app = express();
let protocol, prot;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sessionStore = new session.MemoryStore();
const mongoClient = require("mongodb").MongoClient;
const httpsLocalhost = require("https-localhost")();

const chalk = require("chalk");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");
const os = require("os");

const cpuCount = os.cpus().length;
const error = chalk.bold.red;
const log = console.log;
log(cpuCount, "CPU's running");

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: process.cwd() + "/log",
});
// log only 4xx and 5xx responses to console
app.use(morgan("dev", { skip: (req, res) => res.statusCode <= 400 }));
// log all requests to access.log
app.use(morgan("combined", { stream: accessLogStream }));

app.use(require("feature-policy")({ features: { vibrate: ["'self'"] } }));
app.use(
  helmet({
    referrerPolicy: { policy: "same-origin" },
    hidePoweredBy: { setTo: "PHP 4.2.0" },
    frameguard: {
      // configure
      action: "deny",
    },
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "https://avatars2.githubusercontent.com/"],
        fontSrc: ["'self'"],
      },
    },
    dnsPrefetchControl: false, // disable
  })
);
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
    .catch((err) => log(error(`Database error: ${err}`)));
  log(chalk`Successful database connection to: {blue ${db.s.namespace}}`);

  if (config.PRODUCTION === "LOCAL") {
    const certs = await httpsLocalhost.getCerts();
    protocol = require("https").createServer(certs, app);
    prot = "https";
  } else {
    protocol = require("http").Server(app);
    prot = "http";
  }

  auth(app, sessionStore, db);
  routes(app, db);
  socketServer(protocol, sessionStore, db);

  const port = config.PORT || 3001;
  const address = config.ADDRESS || "localhost";
  const listener = protocol.listen(port, address, () => {
    const { address, port } = listener.address();
    log(chalk`Server is listening at {green ${prot}://${address}:${port}/}`);
  });
};

connections().catch((err) => log(error(`Connection error: ${err}`)));
