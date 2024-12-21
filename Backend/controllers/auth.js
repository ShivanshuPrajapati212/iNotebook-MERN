const { validationResult } = require("express-validator");
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



const JWT_SECRET = '$2a$10$3ak50/nvoDamWCLiDRfmGO5hQG0R0VhPeLAGbmVlCfuort.fHM1P2';

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user: user.id
    }

    const authtoken = jwt.sign(data, JWT_SECRET);


    return res
      .status(200)
      .json({ success: true, authtoken});
  } catch(e) {
    return res.status(400).json({ success: false, error: e });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, authtoken});
  } catch(e) {
    return res.status(400).json({ success: false, error:e  });
  }
};

const fetchAllUsers = async (req, res) => {
  const users = await User.find()
  return res.status(200).json(users);
};

module.exports = { signUp, fetchAllUsers, login };
