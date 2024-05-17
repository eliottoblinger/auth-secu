const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const generateAccessToken = require("../utils/jwt");
const router = express.Router();

const registerRouter = router.post('/register', async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(400).send('User already exists. Please sign in.');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: password
    });
    await user.save();

    const token = generateAccessToken(req.body.email);

    return res.status(201).json(token);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = registerRouter;