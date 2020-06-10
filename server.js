"use strict";

const express = require("express");
const app = express();

const fccTesting = require("./freeCodeCamp/fcctesting.js");
fccTesting(app); //For FCC testing purposes

require("dotenv").config();

// const mail = require("./mail.js");
// mail().catch(console.error);

// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));
// const bodyParser  = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const ObjectID = require("mongodb").ObjectID;
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
const LocalStrategy = require("passport-local");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

// ______ ROUTES CONFIGURATION ________ //
app.set("view engine", "pug");
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  res.render("pug", {
    title: "Hello",
    message: "Please login",
    showLogin: true,
    showRegistration: true,
  });
});

app
  .route("/login")
  .post(passport.authenticate("local", { failureRedirect: "/" }), (req, res) =>
    res.redirect("/profile")
  );

app.route("/profile").get(ensureAuthenticated, (req, res) => {
  res.render(process.cwd() + "/views/pug/profile", {
    username: req.user.username,
  });
});

app.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

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

  passport.deserializeUser((id, done) => {
    db.collection("users").findOne({ _id: new ObjectID(id) }, (err, doc) => {
      if (err) return done(err);
      done(null, doc);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      db.collection("users").findOne({ username: username }, (err, user) => {
        console.log("User " + username + " attempted to log in.");
        if (err) return done(err);
        if (!user) return done(null, false);
        if (password !== user.password) return done(null, false);
        return done(null, user);
      });
    })
  );

  app.route("/register").post(
    (req, res, next) => {
      db.collection("users").findOne(
        { username: req.body.username },
        (err, user) => {
          if (err) next(err);
          if (user) return res.redirect("/");
          db.collection("users").insertOne(
            {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
            },
            (err, doc) => {
              if (err) {
                console.log("Error inserting user in db");
                return res.redirect("/");
              }
              next(null, user);
            }
          );
        }
      );
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
      res.redirect("/profile");
    }
  );

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });

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
