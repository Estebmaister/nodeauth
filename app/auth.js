"use strict";

const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const config = require("./config.js");
const chalk = require("chalk");
const log = console.log;

module.exports = (app, sessionStore, db) => {
  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      key: "express.sid",
      store: sessionStore,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    db.collection("users").findOne({ _id: new ObjectID(id) }, (err, doc) => {
      if (err) return done(err);
      done(null, doc);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      db.collection("users").findOne(
        { username: username.toLowerCase() },
        (err, user) => {
          log(chalk.yellow(`User ${username} attempted to log in`));
          if (err) return done(err);
          if (!user) return done(null, false);
          if (!bcrypt.compareSync(password, user.password))
            return done(null, false);
          return done(null, user);
        }
      );
    })
  );

  // Function to try insert a field that can be public or not
  const tryInsert = (profile, field, defaultValue) => {
    try {
      return profile[field][0].value;
    } catch (error) {
      return defaultValue;
    }
  };

  passport.use(
    new GitHubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        db.collection("users").findOneAndUpdate(
          { id: profile.id },
          {
            $setOnInsert: {
              id: profile.id,
              username: profile.username,
              name: profile.displayName || "Anonymous",
              photo: profile.photos[0].value || "",
              email: tryInsert(profile, "emails", "No public email"),
              provider: profile.provider || "",
              chat_messages: 0,
              created_on: new Date(),
            },
            $set: { last_login: new Date() },
            $inc: { login_count: 1 },
          },
          { upsert: true, returnOriginal: false }, //Insert object if not found, Return new object after modify
          (err, user) => {
            if (err) return done(err);
            log(chalk.yellow("Db gh-social-log op success"));
            return done(null, user.value);
          }
        );
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: config.FACEBOOK_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        db.collection("users").findOneAndUpdate(
          { id: profile.id },
          {
            $setOnInsert: {
              id: profile.id,
              username: profile.username,
              name: profile.displayName || "Anonymous",
              photo: tryInsert(profile, "photos", ""),
              email: tryInsert(profile, "emails", "No public email"),
              provider: profile.provider || "",
              chat_messages: 0,
              created_on: new Date(),
            },
            $set: { last_login: new Date() },
            $inc: { login_count: 1 },
          },
          { upsert: true, returnOriginal: false }, //Insert object if not found, Return new object after modify
          (err, user) => {
            if (err) return done(err);
            log(chalk.yellow("Db fb-social-log op success"));
            return done(null, user.value);
          }
        );
      }
    )
  );
};
