"use strict";

require("dotenv").config();

const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const GITHUB_CLIENT_ID =
  process.env.LOCAL_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET =
  process.env.LOCAL_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.LOCAL_URL || process.env.PROJECT_URL;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

module.exports = {
  SESSION_SECRET,
  MONGO_URI,
  PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
};
