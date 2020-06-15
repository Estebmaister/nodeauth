"use strict";

const express = require("express");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const mongoClient = require("mongodb").MongoClient;
const routes = require("./routes.js");
const auth = require("./auth.js");
const config = require("./config.js");

const app = express();
fccTesting(app); //For FCC testing purposes

const mail = require("./mail.js");
//mail().catch(console.error);

app.use("/", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));
// const bodyParser  = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// ______ CONNECTIONS TO DB & PORT ________ //

const connections = async () => {
  let db = await mongoClient
    .connect(config.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((client) => client.db("test"))
    .catch((err) => console.log("Database error: " + err));
  console.log("Successful database connection to: " + db.s.namespace);

  auth(app, db);
  routes(app, db);

  const port = config.PORT || 3001;
  const listener = app.listen(port, "localhost", () =>
    console.log(
      `Server is listening at http://${listener.address().address}:${
        listener.address().port
      }`
    )
  );
};
connections();
