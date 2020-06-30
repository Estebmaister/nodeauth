"use strict";

require("dotenv").config();

const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

module.exports = {
  SESSION_SECRET,
  MONGO_URI,
  PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
};
