"use strict";

const express = require("express");
const app = express();
const routes = require("./routes.js");
const auth = require("./auth.js");
const config = require("./config.js");
require("dotenv").config();

const fccTesting = require("./freeCodeCamp/fcctesting.js");
fccTesting(app); //For FCC testing purposes

// const mail = require("./mail.js");
// mail().catch(console.error);

// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));
// const bodyParser  = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const mongoClient = require("mongodb").MongoClient;
const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// _____ PASSPORT FUNCTIONS _________ //
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// ______ ROUTES CONFIGURATION ________ //

// ______ CONNECTIONS TO DB & PORT ________ //

const connections = async () => {
  let db = await mongoClient
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((client) => client.db("test"))
    .catch((err) => console.log("Database error: " + err));
  console.log("Successful database connection to: " + db.s.namespace);

  auth(app, db);
  routes(app, db);

  const port = process.env.PORT || 3001;
  const listener = app.listen(port, "localhost", () =>
    console.log(
      `Server is listening at http://${listener.address().address}:${
        listener.address().port
      }`
    )
  );
};
connections();

// mongo.connect(
//   process.env.MONGO_URI,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   (err, db) => {
//     if (err) return console.log("Database error: " + err);
//     console.log("Successful database connection");

//     passport.serializeUser((user, done) => {
//       done(null, user._id);
//     });

//     passport.deserializeUser((id, done) => {
//       db.collection("users").findOne({ _id: new ObjectID(id) }, (err, doc) => {
//         if (err) return done(err);
//         done(null, doc);
//       });
//     });

//     passport.use(
//       new LocalStrategy(function (username, password, done) {
//         db.collection("users").findOne({ username: username }, function (
//           err,
//           user
//         ) {
//           console.log("User " + username + " attempted to log in.");
//           if (err) return done(err);
//           if (!user) return done(null, false);
//           if (password !== user.password) return done(null, false);
//           return done(null, user);
//         });
//       })
//     );

//     const port = process.env.PORT || 3001;
//     const listener = app.listen(port, "localhost", () =>
//       console.log(
//         `Server is listening at http://${listener.address().address}:${
//           listener.address().port
//         }`
//       )
//     );
//   }
// );
