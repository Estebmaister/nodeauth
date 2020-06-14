"use strict";

const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = (app, db) => {
  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  };

  app.route("/").get((req, res) => {
    res.render("pug", {
      title: "Welcome",
      message: "Please",
      showLogin: true,
      showRegistration: true,
      lastLogin: false,
      lastRegister: false,
    });
  });

  app.get("/forgot", (req, res) => res.render("pug/forgot", {}));

  app.post("/reset", (req, res) =>
    res.render("pug/reset", { username: req.body.username })
  );

  app
    .route("/login")
    .post(
      passport.authenticate("local", { failureRedirect: "/" }),
      (req, res) => res.redirect("/profile")
    );

  app.route("/profile").get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/views/pug/profile", {
      username: req.user.username,
    });
  });

  app.route("/register").post(
    (req, res, next) => {
      db.collection("users").findOne(
        { username: req.body.username.toLowerCase() },
        (err, user) => {
          if (err) next(err);
          if (user) return res.redirect("/");
          const hash = bcrypt.hashSync(req.body.password, saltRounds);
          db.collection("users").insertOne(
            {
              username: req.body.username.toLowerCase(),
              email: req.body.email,
              password: hash,
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

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
