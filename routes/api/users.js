const express = require('express');
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require("../../utilities");
const { getUserToken, requireAuth } = require("../../auth");
const { User } = require('../../db/models');

const router = express.Router();

const validateUsernameAndPassword = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

router.post(
  '/',
  check('username').exists({ checkFalsy: true }).withMessage('Please provide a username'),
  validateUsernameAndPassword,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.cookie('token', token);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

router.post(
  '/login',
  // validateUsernameAndPassword,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    console.log("🚀 ~ file: users.js ~ line 49 ~ req.body", req.body)
    const user = await User.findOne({
      where: { username },
    });
    
    if (!user || !user.validatePassword(password)) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    
    const token = getUserToken(user);
    res.cookie('token', token);
    res.json({ token, user: { id: user.id } });
  })
);


router.get(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const { id, username } = await User.findByPk(userId);
    res.json({ user: { id, username } });
  })
);


module.exports = router;
