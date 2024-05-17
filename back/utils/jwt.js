require('dotenv').config();

const jwt = require('jsonwebtoken');

const generateAccessToken = (email) => {
  return jwt.sign({email: email}, process.env.APP_SECRET, { expiresIn: 60 * 60 });
}

module.exports = generateAccessToken;