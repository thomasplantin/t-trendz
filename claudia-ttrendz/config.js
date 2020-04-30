const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  GOOGLE_DB_HOST: process.env.GOOGLE_DB_IP,
  GOOGLE_DB_USER: process.env.GOOGLE_DB_USER,
  GOOGLE_DB_PASS: process.env.GOOGLE_DB_PASS,
  GOOGLE_DB_NAME: process.env.GOOGLE_DB_NAME
};