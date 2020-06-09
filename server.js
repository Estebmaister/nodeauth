"use strict";

const fccTesting = require("./freeCodeCamp/fcctesting.js");
const app = require("./app.js");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Proof of concept for mail ------- ///
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function mail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Esteban Camargo 👻" <ecr.base@gmail.com>', // sender address
    to: "estebmaister@gmail.com, summit.exe@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// mail().catch(console.error);
// End proof of concept for mail --- ///

// const pug = require("pug");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));
// const bodyParser  = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

fccTesting(app); //For FCC testing purposes

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ______ CONNECTION TO THE PORT ________ //

const port = process.env.PORT || 3001;
const listener = app.listen(port, "localhost", () =>
  console.log(
    `Server is listening at http://${listener.address().address}:${
      listener.address().port
    }`
  )
);
