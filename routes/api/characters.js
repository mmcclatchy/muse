const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { sortTraits, normalize } = require('../../utilities');
const { Character, Trait } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characters = Character.findAll();
    res.json(normalize(characters));
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const character = await Character.create(req.body);
    res.status(201).json(normalize(character))
  })
);

module.exports = router;
