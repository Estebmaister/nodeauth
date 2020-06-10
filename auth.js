"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

module.exports = (app, db) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

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
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);
        return done(null, user);
      });
    })
  );
};
