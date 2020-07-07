"use strict";

const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const chalk = require("chalk");
const log = console.log;

module.exports = (app, db) => {
  // Import and mount the authRouter
  const authRouter = require("./extAuth.js");
  app.use("/auth", authRouter);

  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  };

  app.route("/").get((req, res) => {
    res.render("pug", {
      showLogin: true,
      showRegistration: true,
      message: "Switch",
      lastLogin: req.query.log || false,
      lastRegister: req.query.reg || false,
    });
  });

  app.route("/forgot").get((req, res) => res.render("pug/forgot", {}));

  app.route("/reset").post((req, res) => {
    res.render("pug/reset", { username: req.body.username });
  });

  app
    .route("/login")
    .post(
      passport.authenticate("local", { failureRedirect: "/?log=true" }),
      (req, res) => {
        log(chalk.yellow("local-log successful"));
        db.collection("users").findOneAndUpdate(
          { username: req.user.username },
          { $set: { last_login: new Date() }, $inc: { login_count: 1 } },
          { upsert: true, new: true }
        );
        res.redirect("/profile");
      }
    );

  app.route("/profile").get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/views/pug/profile", {
      user: req.user,
    });
  });

  app.route("/pickANumber").get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/views/pug/pickANumber", {
      user: req.user,
    });
  });

  app.route("/survey").get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/views/pug/survey", {
      user: req.user,
    });
  });

  app.route("/afterForm").post(ensureAuthenticated, (req, res) => {
    res.json(req.body);
  });

  app.route("/register").post(
    (req, res, next) => {
      db.collection("users").findOne(
        { username: req.body.username.toLowerCase() },
        (err, user) => {
          if (err) next(err);
          if (user) return res.redirect("/?reg=true");
          const hash = bcrypt.hashSync(req.body.password, saltRounds);
          db.collection("users").insertOne(
            {
              username: req.body.username.toLowerCase(),
              name: req.body.name || "Anonymous",
              email: req.body.email,
              password: hash,
              created_on: new Date(),
              chat_messages: 0,
              photo: "",
              provider: "registerForm",
              login_count: 1,
              last_login: new Date(),
            },
            (err, user) => {
              if (err) {
                log(chalk.red(`Db error inserting user: ${err}`));
                return res.redirect("/");
              }
              next(null, user);
            }
          );
        }
      );
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res) => res.redirect("/profile")
  );

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.use((req, res, next) => {
    res.status(404).render(process.cwd() + "/views/pug/404");
  });
};
