"use strict";

const express = require("express");
const app = express();
app.set("view engine", "pug");
// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  res.render("pug", { title: "Hello", message: "Please login" });
});

app.route("/profile").get((req, res) => {
  res.render(process.cwd() + "/views/pug/profile", {
    title: "Hello",
    message: "Please login",
  });
});

module.exports = app;
