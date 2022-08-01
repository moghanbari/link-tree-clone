require('dotenv').config();

const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @route   POST api/user
 * @desc    Create/Register a user
 * @access  Public
 */
router.post(
  '/',
  async (request, response) => {
    const { name, email, password } = request.body;

    try {
      // See if user exists
      const user = await User.findOne({ email });
      if (user) response.status(401).json({ msg: 'User already existed' });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Salt creation went wrong!');

      const hashedPassword = await bcrypt.hash(password, salt);
      if (!hashedPassword) throw Error("Couldn't hash the password");

      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
      const savedUser = await newUser.save();
      if (!savedUser) throw Error('Something went wrong saving the user');

      const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
        expiresIn: 360000
      });

      response.json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (error) {
      response.status(400).json({ errors: [{ msg: error.message }] });
    }
  }
);

/**
 * @route   PUT api/user
 * @desc    Update user info except password
 * @access  Private
 */
router.put('/', [auth, check('name', 'Name is required').not().isEmpty()], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) res.status(404).json({ msg: 'User not found' });

    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name
      },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/user/password
 * @desc    Update a user password
 * @access  Private
 */
router.put(
  '/password',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) res.status(404).json({ msg: 'User not found' });

      const { password } = req.body;

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Salt creation went wrong!');

      const hashedPassword = await bcrypt.hash(password, salt);
      if (!hashedPassword) throw Error("Couldn't hash the password");

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          password: hashedPassword
        },
        { new: true }
      ).select('-password');

      res.json(updatedUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   POST user/login
 * @desc    Authenticate user & returns token as well as user info
 * @access  Public
 */
 router.post(
  '/login',
  async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });
      if (!user) throw Error('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');

      response.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      response.status(401).json({ errors: [{ msg: error.message }] });
    }
  }
);

/**
 * @route   GET /user
 * @desc    get a user into by userId, jwt must be provided in header
 * @access  Private
 */
 router.get('/', auth, async (request, response) => {
  try {
    const { id } = request.user;
    const user = await User.findById(id).select('-password');
    response.json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server error');
  }
});

module.exports = router;
