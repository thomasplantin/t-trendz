const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  GOOGLE_DB_HOST: process.env.GOOGLE_DB_IP,
  GOOGLE_DB_USER: process.env.GOOGLE_DB_USER,
  GOOGLE_DB_PASS: process.env.GOOGLE_DB_PASS,
  GOOGLE_DB_NAME: process.env.GOOGLE_DB_NAME,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};