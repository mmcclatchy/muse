const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { sortTraits, normalize } = require('../../utilities');
const { Character, CharacterTrait, Trait, TraitType } = require('../../db/models');

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
    const { firstName, lastName, imageUrl, bio } = req.body;

    const character = await Character.create({
      firstName: firstName.name,
      lastName: lastName.name,
      imageUrl,
      bio,
    });
    
    const characterTraits = [
      { characterId: character.id, traitId: req.body.physical.id },
      { characterId: character.id, traitId: req.body.strengths.id },
      { characterId: character.id, traitId: req.body.weaknesses.id },
      { characterId: character.id, traitId: req.body.motivations.id },
      { characterId: character.id, traitId: req.body.secrets.id },
    ]

    await CharacterTrait.bulkCreate(characterTraits, {
      // ignoreDuplicates: true
    });

    const eagerCharacter = await Character.findOne({
      where: { id: character.id },
      attributes: ['id', 'firstName', 'lastName', 'imageUrl', 'bio'],
      include: [
        {
          model: Trait,
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json(eagerCharacter.cleanedForRedux());
  })
);

module.exports = router;
