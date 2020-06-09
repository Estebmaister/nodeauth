"use strict";

const fccTesting = require("./freeCodeCamp/fcctesting.js");
const app = require("./app.js");
// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));

fccTesting(app); //For FCC testing purposes

// ______ CONNECTION TO THE PORT ________ //

const port = process.env.PORT || 3000;
const listener = app.listen(port, "localhost", () =>
  console.log(
    `Form_task app is listening at http://${listener.address().address}:${
      listener.address().port
    }`
  )
);
