const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const generateAccessToken = require("../utils/jwt");
const router = express.Router()

const loginRouter = router.post('/login', async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send('User doesn\'t exists. Please sign up.');
  }

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err){
      return res.status(500).send('Error while comparing passwords.');
    }
    if (result) {
      const token = generateAccessToken(user.email);

      return res.status(201).json(token);
    } else {
      return res.status(400).send('Password is incorrect.');
    }
  });
});

module.exports = loginRouter;