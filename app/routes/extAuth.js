"use strict";

const passport = require("passport");
const authRouter = require("express").Router();

authRouter.get("/github", passport.authenticate("github"));
authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // req.session.user_id = req.user.id;
    res.redirect("/profile");
  }
);

authRouter.get("/facebook", passport.authenticate("facebook"));
authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

module.exports = authRouter;
